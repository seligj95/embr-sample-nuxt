export default defineEventHandler(() => {
  return {
    probe: process.env.EMBR_SAMPLE_ENV_PROBE,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
  };
});
