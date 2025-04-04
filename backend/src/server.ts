import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import productRoutes from "./routes/product.route";
import { errorResponse } from "./core/utils/common-use.util";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json(errorResponse([err.message || "Internal Server Error"]));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
