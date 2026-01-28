import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4"; // you have express4, fine
import { typeDefs } from "./graphQL/typeDefs";
import { resolvers } from "./graphQL/resolvers";

const NODE_ENV = process.env.NODE_ENV ?? "development";
const PORT = Number(process.env.PORT ?? 4000);
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/doctor_appointment_demo";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";
const GRAPHQL_PATH = process.env.GRAPHQL_PATH ?? "/graphql";

async function connectMongo() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10_000,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // stop the server if DB connection fails
  }
}


async function startServer() {
  await connectMongo();

  const app = express();

  // CORS
  app.use(
    cors({
      origin: FRONTEND_ORIGIN,
      credentials: false,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json({ limit: "1mb" }));

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: NODE_ENV !== "production",
    formatError: (formattedError) => formattedError,
  });

  await apolloServer.start();

  // Apollo middleware
  app.use(
    GRAPHQL_PATH,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return {
          authHeader: req.headers.authorization ?? "",
        };
      },
    }) // CORS and JSON already handled
  );

  app.listen(PORT, () => {
    console.log(`🚀 Express ready at http://localhost:${PORT}`);
    console.log(`🚀 Graphql ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("[backend] failed to start:", err);
  process.exit(1);
});
