<script lang="ts" setup>
import { apiGetCoupons, apiDeleteCoupon } from '@/api/coupons';
import type { Pagination, CouponData } from "@/types/coupons"
import { onMounted, ref, useTemplateRef, computed } from "vue"
import DeleteModal from '@/components/DeleteModal.vue'
import CouponModal from "@/components/CouponModal.vue"
import DefaultContainer from "@/components/DefaultContainer.vue"

const deleteModalRef = useTemplateRef<InstanceType<typeof DeleteModal>>('deleteModalRef')
const couponModalRef = useTemplateRef<InstanceType<typeof CouponModal>>('couponModalRef')
const loading = ref(false)
const keyword = ref("")

const getInitialCouponData = ():CouponData => ({
  id:"",
  due_date: 0,
  is_enabled: 0,
  percent: 0,
  title: "",
  code:""
})

const tempCoupon = ref<CouponData>(getInitialCouponData())
const currentPage = ref<string>('1')
const coupons = ref<CouponData[]>([])
const pagination = ref<Pagination>({
  total_pages: 0,
  current_page: 0,
  has_pre: false,
  has_next: false,
  category: '',
})

const filterCoupons = computed(() => {
  const key = keyword.value.trim().toLowerCase()
  if (!key) return coupons.value

  return coupons.value.filter(item => {
    return item.title.toLowerCase().includes(key) || item.code.toLowerCase().includes(key)
  })
})

const getCoupons = async():Promise<void> => {
  loading.value = true
  try{
    const res = await apiGetCoupons({page: currentPage.value})
    coupons.value = res.data.coupons
    pagination.value = res.data.pagination
  } catch(error){
    alert('取得優惠券列表失敗')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleDeleteCoupon = async(id:string):Promise<void> => {
  try {
    await apiDeleteCoupon(id)
  } catch(error){
    alert('刪除優惠券失敗')
    console.error(error)
  }finally {
    getCoupons()
  }
}

const openModal = (coupon:CouponData | null = null):void => {
  if (coupon) {
    tempCoupon.value = {...coupon}
  }
  couponModalRef.value?.openModal()
}

const openDeleteModal = (productId:string):void => {
  deleteModalRef.value?.openModal(() => handleDeleteCoupon(productId))
}

onMounted(() => {
  getCoupons()
})

</script>
<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <input type=text v-model="keyword" class="rounded-1 ps-3" placeholder="請輸入優惠券關鍵字" />
    <button @click="openModal(null)" type="button" class="btn btn-dark rounded-lg px-4 py-2" :disabled="loading">
      <i class="fas fa-plus me-2"></i>
      新增優惠券
    </button>
  </div>
  <DefaultContainer :loading="loading">
    <div class="card shadow-sm rounded-lg flex-grow-1">
      <div class="card-body p-4">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">優惠券名稱</th>
                <th scope="col">優惠碼</th>
                <th scope="col">優惠%數</th>
                <th scope="col">到期日</th>
                <th scope="col" class="text-center">啟用</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="coupon in filterCoupons" :key="coupon.id">
                <td>{{ coupon.title }}</td>
                <td>{{ coupon.code }}</td>
                <td>{{ coupon.percent }}</td>
                <td>
                  {{ new Date(coupon.due_date * 1000).toLocaleDateString().slice(0, 10) }}
                </td>
                <td class="text-center">
                  <div
                    class="form-check form-switch d-flex justify-content-center align-items-center"
                  >
                    <input
                      readonly
                      class="form-check-input"
                      style="pointer-events: none"
                      type="checkbox"
                      id="flexSwitchCheckDefault1"
                      :checked="Boolean(coupon.is_enabled)"
                    />
                  </div>
                </td>
                <td class="text-nowrap">
                  <button
                    @click="openModal(coupon)"
                    type="button"
                    class="btn btn-sm btn-outline-dark rounded-lg me-2"
                  >
                    編輯
                  </button>
                  <button
                    @click="openDeleteModal(coupon.id)"
                    type="button"
                    class="btn btn-sm btn-outline-danger rounded-lg"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav class="d-flex justify-content-center mt-4">
          <ul class="pagination">
            <li class="page-item">
              <button
                @click="currentPage = String(Number(currentPage) - 1)"
                :disabled="!pagination?.has_pre"
                type="button"
                class="page-link"
                :class="{ disabled: !pagination?.has_pre }"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li v-for="(pageNum,index) in pagination?.total_pages" :key="index" class="page-item">
              <button
                @click="currentPage = pageNum.toString()"
                :disabled="currentPage === pageNum.toString()"
                type="button"
                class="page-link"
                :class="{ active: currentPage === pageNum.toString() }"
              >
                {{ pageNum }}
              </button>
            </li>
            <li class="page-item">
              <button
                @click="currentPage = String(Number(currentPage) + 1)"
                :disabled="!pagination?.has_next"
                class="page-link"
                :class="{ disabled: !pagination?.has_next }"
                type="button"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </DefaultContainer>

  <CouponModal ref="couponModalRef" :coupon="tempCoupon" @get-coupons="getCoupons" />
  <DeleteModal ref="deleteModalRef" title="刪除優惠券" content="確定要刪除該優惠券嗎？" />
</template>
