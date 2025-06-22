import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/routes";
import errorHandler from "./middlewares/errorHandler";
import productRoutes from "./routes/productRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const production_api = process.env.PROD_SERVER_API as string;

app.use(
    cors({
        origin: ["http://localhost:5173", production_api],
        credentials: true,
    })
);
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Error Handler
app.use(errorHandler);

export default app;
