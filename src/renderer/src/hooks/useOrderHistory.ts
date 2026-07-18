/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import { orderService } from "@renderer/services/orderService";

import type { OrderDetailsDto } from "src/shared/order";
import type { OrderHistoryItemDto } from "src/shared/orderHistory";

export function useOrderHistory() {
    const [orders, setOrders] = useState<OrderHistoryItemDto[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetailsDto | null>(null);

    const [loading, setLoading] = useState(true);

    async function loadOrders() {
        setLoading(true);

        try {
            setOrders(await orderService.getHistory());
        } finally {
            setLoading(false);
        }
    }

    async function loadOrderDetails(id: string) {
        setSelectedOrder(
            await orderService.getDetails(id),
        );
    }

    useEffect(() => {
        loadOrders();
    }, []);

    return {
        orders,
        loading,

        selectedOrder,

        loadOrders,
        loadOrderDetails,

        setSelectedOrder,
    };
}