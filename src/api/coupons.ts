import type { GetCouponResponse, CreateCouponParams, CreateCouponResponse, EditCouponParams, EditCouponResponse, DeleteCouponResponse } from "@/types/coupons";
import type { AxiosResponse } from "axios";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const couponApi = axios.create({
  baseURL: BASE_URL,
})

couponApi.interceptors.request.use(
  (request) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    if (token) {
      request.headers['Authorization'] = token
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

couponApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

export const apiGetCoupons = (params:{ page?: string }):Promise<AxiosResponse<GetCouponResponse<string>>> => {
  return couponApi.get(`/v2/api/${API_PATH}/admin/coupons`, { params })
}

export const apiCreateCoupon = (params: CreateCouponParams):Promise<AxiosResponse<CreateCouponResponse>> => {
  return couponApi.post(`/v2/api/${API_PATH}/admin/coupons`, { data:params })
}

export const apiEditCoupon = (params: EditCouponParams): Promise<AxiosResponse<EditCouponResponse>> => {
  const { id, data } = params
  return couponApi.put(`/v2/api/${API_PATH}/admin/coupons/${id}`, { data })
}

export const apiDeleteCoupon = (couponId: string):Promise<AxiosResponse<DeleteCouponResponse>> => {
  return couponApi.delete(`/v2/api/${API_PATH}/admin/coupons/${couponId}`)
}
