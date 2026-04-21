export default defineEventHandler((event) => {
  setResponseHeader(
    event,
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300",
  );
  return {
    timestamp: new Date().toISOString(),
    epochMs: Date.now(),
  };
});
