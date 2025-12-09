<script lang="ts" setup>
</script>

<template>
  <div class="d-md-none position-absolute" style="top:0; bottom:0; left:0; right:0; background-image: url(https://images.unsplash.com/photo-1656275537622-7837184a0dcc?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
      background-position: center center;"></div>
  <nav class="navbar navbar-expand-lg navbar-light bg-white mt-n1 py-2 px-3 z-1">
    <RouterLink class="navbar-brand" :to="{ name:'homepage' }">
      <img class="img-fluid" style="width: 3.75rem; height: 3.75rem;" src="@/assets/images/logo.webp" alt="logo">
    </RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <RouterLink class="nav-item nav-link me-4" :to="{ name:'all-product' }">產品列表</RouterLink>
        <!-- <a class="nav-item nav-link me-4" href="./product.html">產品列表</a> -->
        <a class="d-md-none nav-item nav-link" href="./cart.html">購物車</a>
        <a class="d-none d-md-block nav-item nav-link" href="./cart.html"><i class="fas fa-shopping-cart"></i></a>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>

</style>
