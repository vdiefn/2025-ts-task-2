import type { CouponData } from '@/types/coupons'
import { ref } from 'vue'

const getInitialCouponData = (): CouponData => ({
  id: '',
  due_date: 0,
  is_enabled: 0,
  percent: 0,
  title: '',
  code: '',
})

export function useCouponForm() {
  const form = ref<CouponData>(getInitialCouponData())
  const formTitle = ref('新增優惠券')

  const loadCoupon = (data: CouponData | null): void => {
    console.log(data)
    if (data) {
      console.log('編輯')
      form.value = { ...data }
      formTitle.value = '編輯優惠券'
    } else {
      console.log('新增')
      resetForm()
    }
  }

  const resetForm = (): void => {
    form.value = getInitialCouponData()
    formTitle.value = '新增優惠券'
  }

  return {
    form,
    formTitle,
    loadCoupon,
    resetForm,
  }
}
