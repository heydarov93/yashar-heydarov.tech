export default function getIp(req) {
  // Get the client's IP address
  const forwardedIps = req.headers['x-forwarded-for']; //  when app is behind a proxy(s)
  const ip = forwardedIps?.split(',')?.[0] || req.socket.remoteAddress; // for direct connections (no proxy)

  return ip || null;
}
