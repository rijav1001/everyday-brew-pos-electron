/* eslint-disable react-hooks/set-state-in-effect */
import ActiveOrdersPanel from "@renderer/components/orders/ActiveOrdersPanel";
import NewOrderDialog from "@renderer/components/orders/NewOrderDialog";
import PageHeader from "@renderer/components/shared/PageHeader";
import { orderService } from "@renderer/services/orderService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { OrderStatus, OrderType } from "../../../../shared/enums";
import { OrderHistoryItemDto } from "src/shared/orderHistory";

function ActiveOrdersPage() {
    const navigate = useNavigate();

    const [activeOrders, setActiveOrders] = useState<OrderHistoryItemDto[]>([]);
    const [newOrderDialogOpen, setNewOrderDialogOpen] = useState(false);

    async function loadActiveOrders() {
        const orders = await orderService.getActiveOrders();
        setActiveOrders(orders);
    }

    useEffect(() => {
        loadActiveOrders();
    }, []);

    function handleNewOrder() {
        setNewOrderDialogOpen(true);
    }

    async function handleCreateOrder(orderType: OrderType, tableNumber: number | null) {
        const orderId = await orderService.create({
            orderType,
            tableNumber,
            status: OrderStatus.ACTIVE,
        });

        setNewOrderDialogOpen(false);

        await loadActiveOrders();

        navigate("/orders", {
            state: {
                orderId,
            },
        });
    }

    function handleCancelNewOrder() {
        setNewOrderDialogOpen(false);
    }

    async function handleSelectOrder(orderId: string) {
        navigate("/orders", {
            state: {
                orderId,
            },
        });
    }

    async function handleCancelOrder(orderId: string, reason: string | null) {
        await orderService.cancelOrder(orderId, reason);
        toast.success("Order cancelled successfully");
        await loadActiveOrders();
    }

    return (
        <>
            <PageHeader
                title="Active Orders"
                description="Manage all active customer orders"
            />

            <div className="h-full rounded-2xl bg-(--surface) p-5 shadow-sm">
                <ActiveOrdersPanel
                    orders={activeOrders}
                    activeOrderId={null}
                    onSelectOrder={handleSelectOrder}
                    onCreateOrder={handleNewOrder}
                    onCancelOrder={handleCancelOrder}
                />
            </div>

            <NewOrderDialog
                open={newOrderDialogOpen}
                onCreate={handleCreateOrder}
                onCancel={handleCancelNewOrder}
            />
        </>
    );
}

export default ActiveOrdersPage;