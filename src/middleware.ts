import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
};
