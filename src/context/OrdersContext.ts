'use client';

import { createContext } from 'react';

import type {
  ClaimKind,
  ClaimReason,
  OrderFilters,
  OrderRecord,
} from '@/components/orders/orders.types';

export type OrdersBinding = {
  orders: readonly OrderRecord[];
  pending?: boolean;
  error?: string;
  onFiltersChange?: (filters: OrderFilters) => void;
  submitClaim: (input: {
    orderId: string;
    kind: ClaimKind;
    quantities: Record<string, number>;
    reason: ClaimReason;
    details: string;
  }) => Promise<void>;
  confirmPurchase: (orderId: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
};

export const OrdersContext = createContext<OrdersBinding | null>(null);
