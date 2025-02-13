import getIp from './getIp.js';

const trackers = {}; // {ip-address : {count: number, expiresAt: number}}

function rateLimitByIp(req, limit, interval) {
  const ip = getIp(req);

  if (!ip) throw new Error('Ip address not found');

  const tracker = trackers[ip] || { count: 0, expiresAt: 0 };

  if (!trackers[ip]) trackers[ip] = tracker;

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + interval;
  }

  tracker.count++;

  if (tracker.count > limit)
    throw new Error(
      `Rate limit exceeded. Please try again in ${
        interval / 1000 / 60
      } minutes.`
    );
}

export { rateLimitByIp };
