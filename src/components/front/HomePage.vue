<script lang="ts" setup>
  import { reqAllProducts } from "@/api/front/products"
  import { onMounted, ref } from "vue"
  import type { ProductsData } from "@/types/front/products"

  const loading = ref(false)
  const products = ref<ProductsData[]>([])

  const handleGetAllProducts = async() => {
    loading.value = true

    try {
      const res = await reqAllProducts()
      products.value = res.data.products
    } catch(error){
      console.error(error)
    } finally {
      loading.value = false
    }
  }



  onMounted(() => {
    handleGetAllProducts()
  })
</script>
<template>
  <div class="container position-relative" style="min-height: 100vh;">
    <img class="d-none d-md-block img-fluid"
      src="https://images.unsplash.com/photo-1656275537622-7837184a0dcc?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="banner-desktop">
    <div class="position-absolute top-0 start-0 bottom-0 end-0">
      <div class="h-100 d-flex flex-column justify-content-center align-items-center text-white">
        <h2>植感生活</h2>
        <p class="mb-0">專業挑選的室內植栽，打造你的專屬室內綠洲</p>
        <a href="./product.html" class="btn btn-dark rounded-3 mt-6">來去逛逛</a>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4 mt-md-4" v-for="product in products" :key="product.id">
        <div class="card border-0 mb-4">
          <img
            style="height: 300px;"
            :src="product.imageUrl"
            class="card-img-top rounded-0 object-fit-cover" alt="product title" />
          <div class="card-body text-center">
            <h4>{{ product.title }}</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0">
                {{ product.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light mt-7">
    <div class="container">
      <div class="row justify-content-center py-7">
        <div class="col-md-6 text-center">
          <h3>植感好評</h3>
          <p class="my-5">
            “第一次在這裡選購植栽，買的是琴葉榕。到貨包裝非常仔細，植物葉片完整無損，看得出來很用心照顧。放在客廳後立刻提升了空間質感，朋友來訪都說很有設計感。附上的養護說明也很清楚，照著做就能維持植栽的狀態，真的很推薦！”
          </p>
          <p><small>—高雄市 黃小姐—</small></p>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-7">
    <div class="row">
      <div class="col-md-6">
        <img src="@/assets/images/home-1-1.png" alt="home-1" class="img-fluid">
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="mt-4">🌿 專業植栽挑選</h4>
        <p class="text-muted">我們精心挑選適合室內環境的植栽，並搭配設計感十足的盆器，讓每一株植物不只是綠意，更是空間中的擺飾亮點。</p>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-between mt-4">
      <div class="col-md-6">
        <img src="@/assets/images/home-2-2.png" alt="home-2" class="img-fluid">
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="mt-4">🌱 貼心養護指南</h4>
        <p class="text-muted">每項商品皆附上簡單易懂的照顧說明，從光照、水量到溫度，讓新手也能輕鬆維持植栽最佳狀態，享受無壓力的綠色生活。</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
