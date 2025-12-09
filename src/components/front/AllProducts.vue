<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue"
import { reqProducts } from "@/api/front/products";
import type { ProductsData } from "@/types/front/products";
import { useRoute, useRouter } from "vue-router"

const currentPage = ref(1)
const totalPages = ref(1)
const category = computed(() => route.query.category as string || "")
const products = ref<ProductsData[]>([])
const route = useRoute()
const router = useRouter()

const handleGetProducts = async() => {
  try {
    const res = await reqProducts(currentPage.value, category.value)
    products.value = res.data.products
    totalPages.value = res.data.pagination.total_pages
    currentPage.value = res.data.pagination.current_page
  } catch(error){
    console.error(error)
  }
}

const setCategory = (category: string) => {
  router.push({
    name: 'all-product',
    query: { category }
  })
}

const changePage = (page:number) => {
  if(page > totalPages.value || page < 1) return
  currentPage.value = page
  handleGetProducts()
}

onMounted(() => {
  handleGetProducts()
})

watch(
  () => route.query.category,
  () => {
    handleGetProducts()
  }
)

</script>
<template>
<div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
    <div class="position-absolute"
      style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1656275537622-7837184a0dcc?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D); background-position: center center; background-size: cover; background-repeat: no-repeat; opacity: 0.1;">
    </div>
    <h2 class="fw-bold">產品列表</h2>
  </div>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-4">
        <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0 ms-2">
                  分類
                </h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" class="py-2 d-block text-muted text-decoration-none" @click.prevent="setCategory('')" :class="{'fw-bolder': category === ''}">顯示全部
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted text-decoration-none" @click.prevent="setCategory('客廳植栽')" :class="{'fw-bolder': category === '客廳植栽'}">客廳植栽
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted text-decoration-none" @click.prevent="setCategory('窗邊植栽')" :class="{'fw-bolder': category === '窗邊植栽'}">窗邊植栽
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted text-decoration-none" @click.prevent="setCategory('書房植栽')" :class="{'fw-bolder': category === '書房植栽'}">書房植栽
                    </a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted text-decoration-none" @click.prevent="setCategory('餐桌植栽')" :class="{'fw-bolder': category === '餐桌植栽'}">餐桌植栽
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <template v-if="products.length > 0">
            <div class="col-md-6" v-for="product in products" :key="product.id">
              <div class="card border-0 mb-4 position-relative position-relative">
                <img style="height: 320px;"
                  :src="product.imageUrl"
                  class="card-img-top object-fit-cover rounded-0" alt="product image">
                <a href="#" class="text-dark">
                  <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
                </a>
                <div class="card-body p-0">
                  <h4 class="mb-0 mt-3">{{ product.title }}</h4>
                  <p class="card-text mb-0">NT${{product.price}} <span class="text-muted "><del>NT${{ product.origin_price }}</del></span></p>
                  <p class="text-muted mt-3"></p>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="d-flex justify-content-center mt-3 mb-3">
              <h6>該項目暫無產品</h6>
            </div>
          </template>
        </div>
        <nav class="d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item" :class="{disabled: currentPage === 1}">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li class="page-item" :class="{ 'active': currentPage === index+1}" v-for="(page,index) in totalPages" :key="index"><a class="page-link" @click.prevent="changePage(index+1)">{{ index+1 }}</a></li>

            <li class="page-item" :class="{disabled: currentPage === totalPages}">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
