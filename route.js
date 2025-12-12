export const runtime = "edge";

export function GET(req) {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue("data: " + JSON.stringify({ message: "Server OK" }) + "\n\n");
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    }
  );
}
