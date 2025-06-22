import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://another-example.com"],
        credentials: true,
    })
);
app.use(bodyParser.json());

// Routes
app.use("/api/", authRoutes);

// Error Handler
app.use(errorHandler);

export default app;
