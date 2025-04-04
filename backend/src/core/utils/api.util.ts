import axios from "axios";

export class ApiUtil {
  private axiosInstance: Axios.AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async request({
    endpoint,
    method = "GET",
    body = {},
    params = {},
  }: {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, any>;
    params?: Record<string, any>;
  }) {
    if (body === null) {
      body = {};
    }

    try {
      let response;

      if (method === "GET") {
        response = await this.axiosInstance.get(endpoint, { params });
      } else if (method === "POST") {
        response = await this.axiosInstance.post(endpoint, body);
      } else if (method === "PUT") {
        response = await this.axiosInstance.put(endpoint, body);
      } else if (method === "DELETE") {
        response = await this.axiosInstance.delete(endpoint, { params: body });
      } else {
        throw new Error(`Unsupported HTTP method: ${method}`);
      }

      return response.data;
    } catch (error) {
      console.error(`Error in ${method} request to ${endpoint}:`, error);
      throw error;
    }
  }
}
