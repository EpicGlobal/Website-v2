import { createLeadCaptureHandler } from "./gateway.ts";

const handler = createLeadCaptureHandler({
  env: (name) => Deno.env.get(name),
  fetch,
});

Deno.serve(handler);
