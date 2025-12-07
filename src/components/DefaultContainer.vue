<script lang="ts" setup>

interface Props {
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})
</script>
<template>
  <div v-if="props.loading" class="default-container h-100 w-100 d-flex justify-content-center align-items-center" >
    <div  class="spinner-border " role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <slot v-else></slot>
</template>
<style lang="scss" scoped>
  .default-container {
    min-height:300px
  }
</style>
