import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/routes";
import errorHandler from "./middlewares/errorHandler";
import productRoutes from "./routes/productRoutes";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://"],
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
