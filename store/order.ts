// make a zustand store for the selected order , with safe type

import { Order } from '@/app/(tabs)/two';
import { create } from 'zustand';

type OrderState = {
  order: Order | null
  setOrder: (order:Order) => void
}

export const useOrder = create<OrderState>()((set) => ({
  order: null,
  setOrder: (order:Order) => set({ order }),
}))