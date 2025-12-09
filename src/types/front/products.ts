export type ProductData = {
  category: string,
  content: string,
  description: string,
  id: string,
  imageUrl: string,
  imagesUrl: string[],
  is_enabled: number,
  num: number,
  origin_price: number,
  price: number,
  title: string,
  unit: number
}

export type Pagination = {
  total_pages: number,
  current_page: number,
  has_pre:boolean,
  has_next:boolean,
  category:string
}

export type GetAllProductsResponse = {
  success: boolean,
  products: ProductData[],
  messages: string[]
}

export type GetProductsResponse = GetAllProductsResponse & {
  pagination: Pagination
}

export type GetProductDetail = {
  product: ProductData,
  success:boolean
}
