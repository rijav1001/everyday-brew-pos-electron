import { CategoryDto, CreateCategoryRequest } from "../../../shared/category";
import { DashboardSummaryDto, HourlySalesDto, PaymentMethodSummaryDto, RecentOrderDto, TopSellingItemDto } from "../../../shared/dashboard";
import { CreateMenuItemRequest, MenuItemDto } from "../../../shared/menu";
import { CompletedOrderDto } from "../../../shared/order";
import { OrderHistoryItemDto } from "../../../shared/orderHistory";

export interface ElectronAPI {
    category: {
        getAll(): Promise<unknown>;
        create(category: CreateCategoryRequest): Promise<unknown>;
        update(category: CategoryDto): Promise<unknown>;
        delete(id: string): Promise<unknown>;
    };

    menu: {
        getByCategory(categoryId: string): Promise<unknown>;
        getAddons(menuItemId: string): Promise<unknown>;
        getAll(): Promise<MenuItemDto[]>;
        create(menu: CreateMenuItemRequest): Promise<unknown>;
        update(menu: MenuItemDto): Promise<unknown>;
        delete(id: string): Promise<unknown>;

        addon: {
            create(request: CreateMenuAddonRequest): Promise<void>;
            update(addon: MenuAddonDto): Promise<void>;
            delete(id: string): Promise<void>;
        }
    };

    order: {
        getNextBillNumber(): Promise<string>;
        save(order: CompletedOrderDto): Promise<string>;
        getHistory(): Promise<OrderHistoryItemDto[]>;
        getDetails(id: string): Promise<OrderDetailsDto>;
    };

    receipt: {
        print(orderId: string): Promise<void>;
    };

    dashboard: {
        getSummary(): Promise<DashboardSummaryDto>;
        getPaymentMethodSummary(): Promise<PaymentMethodSummaryDto[]>;
        getTopSellingItems(): Promise<TopSellingItemDto[]>;
        getRecentOrders(): Promise<RecentOrderDto[]>;
        getHourlySales(): Promise<HourlySalesDto[]>;
    }
}