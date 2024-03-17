import lambdaRateLimiter from "lambda-rate-limiter";

export const isDev = process.env.NODE_ENV === "development";

export const rateLimit = lambdaRateLimiter({
  interval: isDev ? 60 * 5 * 1000 : 60 * 1000, // 1 minute for user, 5 minutes for development
}).check;
