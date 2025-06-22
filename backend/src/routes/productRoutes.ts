import { Router, RequestHandler } from "express";
import { createProduct, getAllProducts, getProductsByFarmer } from "../controllers/productController";

const router = Router();

router.get("/", getAllProducts);
router.post("/create", createProduct);
router.get("/farmer/:farmerId", getProductsByFarmer);

export default router;
