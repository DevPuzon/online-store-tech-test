import dotenv from "dotenv";
import { ApiUtil } from "../core/utils/api.util";
dotenv.config();

const API_URL = process.env.FAKE_STORE_API_URL || "https://fakestoreapi.com";
const apiUtil = new ApiUtil(API_URL);

export const getProducts = () => {
  return apiUtil.request({
    endpoint: "/products",
  });
};
