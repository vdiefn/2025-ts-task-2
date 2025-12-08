import axios from "axios"
import type { GetProductsResponse } from "@/types/front/products";
import type { AxiosResponse } from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const api = axios.create({
  baseURL: BASE_URL,
})

export const reqAllProducts = ():Promise<AxiosResponse<GetProductsResponse>> => api.get(`/v2/api/${API_PATH}/products/all`)

export const reqProducts = (page:number, category:string):Promise<AxiosResponse<GetProductsResponse>> => api.get(`/v2/api/${API_PATH}/products?=${page}&category?=${category}`)
