<script lang="ts" setup>
import { apiCreateCoupon, apiEditCoupon } from '@/api/coupons';
import type { CouponData } from '@/types/coupon'
import { Modal } from 'bootstrap'

import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

const emit = defineEmits(['get-coupons'])
const modalRef = useTemplateRef<HTMLElement>('modalRef')
let modal:Modal|null = null
const isEditMode = computed(() => Boolean(coupon.id))
const isLoading = ref(false)
const form = ref<CouponData>({
  id:"",
  title:"",
  percent:0,
  due_date:0,
  is_enabled:0
})

const openModal = () => {
  if (modal) {
    modal.show()
  }
}

const closeModal = () => {
  if (modal) {
    modal.hide()
  }
}

const handleSaveCoupon = async () => {
  const { id, ...couponData } = form.value

  isLoading.value = true

  try {
    if (isEditMode.value && id) {
      await apiEditCoupon({ couponData, id })
    } else {
      await apiCreateCoupon(couponData)
    }
    closeModal()
  } catch (error) {
    alert('新增/編輯產品失敗')
    console.error(error)
  } finally {
    isLoading.value = false
    emit('get-coupons')
  }
}

defineExpose({
  openModal,
  closeModal,
})

onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
})

onUnmounted(() => {
  if (modal) {
    modal.dispose()
  }
})
</script>

<template>
<div
    ref="modalRef"
    class="modal fade"
    id="addNewProductModal"
    tabindex="-1"
    aria-labelledby="addNewProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content rounded-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewProductModalLabel">{{ formTitle }}</h5>
          <button
            @click="closeModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <form>
                <div class="mb-3">
                  <label for="couponName" class="form-label">優惠券名稱</label>
                  <input
                    v-model="form.title"
                    type="text"
                    class="form-control rounded-lg"
                    id="couponName"
                  />
                </div>
                <div class="row">
                  <div class="col-6 mb-3">
                    <label for="couponPercent" class="form-label">優惠%數</label>
                    <input
                      v-model="form.percent"
                      type="number"
                      class="form-control rounded-lg"
                      id="couponPercent"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="productPrice" class="form-label">到期日</label>
                    <input
                      v-model="form.price"
                      type="number"
                      class="form-control rounded-lg"
                      id="productPrice"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex align-items-center">
                  <label class="form-label me-3 mb-0">啟用</label>
                  <div class="form-check form-switch">
                    <input
                      v-model="form.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchProductEnable"
                      :true-value="1"
                      :false-value="0"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" type="button" class="btn btn-outline-secondary rounded-lg">
            取消
          </button>
          <button
            @click="handleSaveCoupon"
            :disabled="isLoading"
            type="button"
            class="btn btn-dark rounded-lg"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
