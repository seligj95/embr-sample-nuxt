export default defineEventHandler((event) => {
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "no-store");
  setResponseHeader(event, "X-Accel-Buffering", "no");

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for (let i = 1; i <= 5; i++) {
        const chunk = `chunk ${i} @ ${new Date().toISOString()}\n`;
        controller.enqueue(encoder.encode(chunk));
        if (i < 5) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      controller.close();
    },
  });

  return sendStream(event, stream);
});
