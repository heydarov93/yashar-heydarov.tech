import getIp from './getIp.js';
import HttpError from './HttpError.js';

const trackers = {}; // {ip-address : {count: number, expiresAt: number}}

function rateLimitByIp(req, limit, interval) {
  try {
    // Get the client's IP address
    const ip = getIp(req);

    if (!ip) throw new HttpError('Ip address not found', 400);

    // Get the tracker for the IP address or create a new one if it doesn't exist
    const tracker = trackers[ip] || { count: 0, expiresAt: 0 };

    // If the IP address doesn't exist in the trackers object, add the new tracker
    if (!trackers[ip]) trackers[ip] = tracker;

    // Reset the tracker if the interval has expired
    if (tracker.expiresAt < Date.now()) {
      tracker.count = 0;
      tracker.expiresAt = Date.now() + interval;
    }

    // Increment the request count for the IP address
    tracker.count++;

    // Throw a 429 Too Many Requests error if the rate limit is exceeded
    if (tracker.count > limit) {
      let minutesLeft = Math.ceil((tracker.expiresAt - Date.now()) / 1000 / 60);

      throw new HttpError(
        `Rate limit exceeded. Please try again in ${minutesLeft} minutes.`,
        429
      );
    }
  } catch (err) {
    // If the error is not an instance of HttpError, wrap it in a 500 Internal Server Error
    if (!(err instanceof HttpError))
      throw new HttpError('Internal Server Error', 500);

    // Re-throw the error
    throw err;
  }
}

export { rateLimitByIp };
