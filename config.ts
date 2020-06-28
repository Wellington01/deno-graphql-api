import "https://deno.land/x/dotenv/load.ts";

const DB_HOST = Deno.env.get("MONGO_URL") || "mongodb://localhost:27017";
const DB_NAME = Deno.env.get("DATABASE_NAME") || "denoapi";

export { DB_HOST, DB_NAME };
