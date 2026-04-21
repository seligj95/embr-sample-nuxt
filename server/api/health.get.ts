// Embr pings this endpoint as a liveness probe (see embr.yaml healthCheck).
// Keep it dependency-free — no DB call, no cache call — so the probe only
// fails when the Node process itself is unhealthy. For readiness semantics
// (DB reachable, cache reachable, etc.), add a separate /api/ready route and
// point healthCheck.path at that instead.
export default defineEventHandler(() => {
  return {
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  };
});
