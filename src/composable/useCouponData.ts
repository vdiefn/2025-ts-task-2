import type { CouponData } from '@/types/coupons'
import { ref } from 'vue'

type CouponFormData = {
  id: string,
  due_date: string,
  is_enabled: number,
  percent: number,
  title: string,
  code: string,
}

const getInitialCouponData = (): CouponFormData => ({
  id: '',
  due_date: "",
  is_enabled: 0,
  percent: 0,
  title: '',
  code: '',
})

export function useCouponForm() {
  const form = ref<CouponFormData>(getInitialCouponData())
  const formTitle = ref('新增優惠券')

  const loadCoupon = (data: CouponData | null): void => {
    if (data) {
      form.value = {
        ...data,
        due_date:new Date(data.due_date * 1000).toISOString().slice(0, 10)
      }

      formTitle.value = '編輯優惠券'
    } else {
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
