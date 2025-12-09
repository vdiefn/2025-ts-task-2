<script lang="ts" setup>
import { ref, watch, onMounted } from "vue"
import type { ProductData } from "@/types/front/products";
import { reqProductDetail } from "@/api/front/products";
import { useRoute } from 'vue-router'
import { Carousel } from "bootstrap";
const product = ref<ProductData>()
const route = useRoute()

const handleGetProductDetail = async(id:string) => {
  try {
    const res = await reqProductDetail(id)
    product.value = res.data.product
  } catch(error){
    console.error(error)
  }
}

watch(() => route.params.id, (value) => {
  if (value) handleGetProductDetail(value as string)
}, { immediate: true })

onMounted(() => {
  const myCarousel = document.getElementById('carouselExample');
  if (myCarousel) new Carousel(myCarousel);
});
</script>
<template>
<div class="container">
  <div class="row align-items-center">
    <div class="col-md-7">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white px-0 mb-0 py-3">
          <li class="breadcrumb-item"><RouterLink :to="{ name:'homepage' }" class="text-muted text-decoration-none">首頁</RouterLink></li>
          <li class="breadcrumb-item text-decoration-none"><RouterLink :to="{ name:'all-product' }"  class="text-muted text-decoration-none">產品列表</RouterLink></li>
          <li class="breadcrumb-item active" aria-current="page">產品詳細</li>
        </ol>
      </nav>
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-container carousel-inner">
          <div class="carousel-item active">
            <img
              :src="product?.imagesUrl[0]"
              class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img
              :src="product?.imagesUrl[1]"
              class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img
              :src="product?.imagesUrl[2]"
              class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

  <div class="col-md-5">
    <h2 class="fw-bold h1 mb-1">{{ product?.title }}</h2>
    <p class="mb-0 text-muted text-end"><del>NT${{ product?.origin_price }}</del></p>
    <p class="h4 fw-bold text-end">NT${{ product?.price }}</p>
    <div class="row align-items-center">
      <div class="col-6">
        <div class="input-group my-3 bg-light rounded">
          <div class="input-group-prepend">
            <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <input type="text" class="form-control border-0 text-center my-auto shadow-none bg-light" placeholder=""
            aria-label="Example text with button addon" aria-describedby="button-addon1" value="1">
          <div class="input-group-append">
            <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <button type="button" class="text-nowrap btn btn-dark w-100 py-2">加入購物車</button>
      </div>
    </div>
  </div>
  </div>
  <div class="row my-5">
    <div class="col-md-4">
      <p>{{ product?.content }}</p>
    </div>
    <div class="col-md-3">
      <p class="text-muted">{{ product?.description }}</p>
    </div>
  </div>
  <h3 class="fw-bold">你可能會喜歡的植栽</h3>
  <!-- <div class="swiper mt-4 mb-5">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <div class="card border-0 mb-4 position-relative position-relative">
        <img
          src="https://images.unsplash.com/photo-1616220797246-f01f49dd805d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="card-img-top object-fit-cover rounded-0" style="height: 280px;" alt="...">
        <a href="#" class="text-dark">
        </a>
        <div class="card-body p-0">
          <h4 class="mb-0 mt-3"><a href="#">黃金葛</a></h4>
          <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
          <p class="text-muted mt-3"></p>
        </div>
      </div>
    </div>
    <div class="swiper-slide">
      <div class="card border-0 mb-4 position-relative position-relative">
        <img
          src="https://images.unsplash.com/photo-1616122236015-b37dc314d875?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="card-img-top object-fit-cover rounded-0" style="height: 280px;" alt="...">
        <a href="#" class="text-dark">
        </a>
        <div class="card-body p-0">
          <h4 class="mb-0 mt-3"><a href="#">橡膠樹</a></h4>
          <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
          <p class="text-muted mt-3"></p>
        </div>
      </div>
    </div>
    <div class="swiper-slide">
      <div class="card border-0 mb-4 position-relative position-relative">
        <img
          src="https://images.unsplash.com/photo-1611211232932-da3113c5b960?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="card-img-top object-fit-cover rounded-0" style="height: 280px;" alt="...">
        <a href="#" class="text-dark">
        </a>
        <div class="card-body p-0">
          <h4 class="mb-0 mt-3"><a href="#">虎尾蘭</a></h4>
          <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
          <p class="text-muted mt-3"></p>
        </div>
      </div>
    </div>
    <div class="swiper-slide">
      <div class="card border-0 mb-4 position-relative position-relative">
        <img
          src="https://images.unsplash.com/photo-1675093583860-c88f96dd6801?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fE1vbnN0ZXJhfGVufDB8MHwwfHx8Mg%3D%3D"
          class="card-img-top object-fit-cover rounded-0" style="height: 280px;" alt="...">
        <a href="#" class="text-dark">
        </a>
        <div class="card-body p-0">
          <h4 class="mb-0 mt-3"><a href="#">龜背芋</a></h4>
          <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
          <p class="text-muted mt-3"></p>
        </div>
      </div>
    </div>
    <div class="swiper-slide">
      <div class="card border-0 mb-4 position-relative position-relative">
        <img
          src="https://images.unsplash.com/photo-1616694547693-b0f829a6cf30?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="card-img-top object-fit-cover rounded-0" style="height: 280px;" alt="...">
        <a href="#" class="text-dark">
        </a>
        <div class="card-body p-0">
          <h4 class="mb-0 mt-3"><a href="#">白鶴芋</a></h4>
          <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
          <p class="text-muted mt-3"></p>
        </div>
      </div>
    </div>

  </div>
</div> -->
</div>
</template>
<style lang="scss" scoped>

</style>
