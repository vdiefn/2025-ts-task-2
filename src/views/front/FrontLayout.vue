<script lang="ts" setup>
  import Header from "@/components/front/HeaderPage.vue"
  import Footer from "@/components/front/FooterPage.vue"
  import { RouterView } from "vue-router";

</script>

<template>
  <Header></Header>
  <main>
    <RouterView></RouterView>
  </main>
  <Footer></Footer>
</template>

<style lang="scss" scoped>

</style>
