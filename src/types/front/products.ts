export type ProductsData = {
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

export type GetProductsResponse = {
  success: boolean,
  products: ProductsData[],
  messages: string[]
}
