import { Router, Request, Response } from "express";
import { getAllProducts } from "../services/product.service";
import { successResponse, errorResponse } from "../core/utils/common-use.util";
const router = Router();

// Get all products
router.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res
      .status(200)
      .json(successResponse("Products retrieved successfully", products));
  } catch (error) {
    res
      .status(400)
      .json(
        errorResponse([
          (error as string) || "Something went wrong getting products",
        ])
      );
  }
});

// Get product by ID
router.get("/:id", async (_req: Request, res: Response) => {
  // TODO: Implement get product by ID
});

// Create new product
router.post("/", async (_req: Request, res: Response) => {
  // TODO: Implement create product
});

// Update product
router.put("/:id", async (_req: Request, res: Response) => {
  // TODO: Implement update product
});

// Delete product
router.delete("/:id", async (_req: Request, res: Response) => {
  // TODO: Implement delete product
});

export default router;
