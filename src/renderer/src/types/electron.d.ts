import { CategoryDto, CreateCategoryRequest } from "../../../shared/category";
import { DashboardSummaryDto, HourlySalesDto, PaymentMethodSummaryDto, RecentOrderDto, TopSellingItemDto } from "../../../shared/dashboard";
import { CreateMenuItemRequest, MenuItemDto } from "../../../shared/menu";
import { CompletedOrderDto } from "../../../shared/order";
import { OrderHistoryItemDto } from "../../../shared/orderHistory";
import { ReportChartDto, ReportFilterDto, ReportSummaryDto } from "../../../shared/report";

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
        // this is obsolete now
        // save(order: CompletedOrderDto): Promise<string>;
        getHistory(): Promise<OrderHistoryItemDto[]>;
        getDetails(id: string): Promise<OrderDetailsDto>;
        create(dto: CreateOrderDto): Promise<string>;
        getActiveOrders(): Promise<OrderHistoryItemDto[]>;
        addItem(orderId: string, item: OrderItemDto): Promise<void>;
        updateItem(itemId: string, item: OrderItemDto): Promise<void>;
        removeItem(itemId: string): Promise<void>;
        cancelOrder(orderId: string, cancelReason: string | null): Promise<void>;
        completeOrder(orderId: string, order: CompletedOrderDto): Promise<void>;
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
    };

    reports: {
        getReportSummary(filter: ReportFilterDto): Promise<ReportSummaryDto>;
        getReportChart(filter: ReportFilterDto): Promise<ReportChartDto[]>;
        getPaymentBreakdown(filter: ReportFilterDto): Promise<PaymentBreakdownDto[]>;
        getTopSellingItems(filter: ReportFilterDto): Promise<TopSellingReportItemDto[]>;
        getOrderHistory(filter: ReportFilterDto): Promise<OrderHistoryDto[]>;
        saveCsv(report: ReportExportDto): Promise<void>;
        printReport(): Promise<void>;
    };

    settings: {
        getBusiness(): Promise<BusinessSettingsDto>;
        saveBusiness(settings: BusinessSettingsDto): Promise<void>;
        getReceipt(): Promise<ReceiptSettingsDto>;
        saveReceipt(settings: ReceiptSettingsDto): Promise<void>;
        getTax(): Promise<TaxSettingsDto>;
        saveTax(settings: TaxSettingsDto): Promise<void>;
        getApp(): Promise<AppSettingsDto>;
        saveApp(settings: AppSettingsDto): Promise<void>;
        backupDatabase(): Promise<void>;
        restoreDatabase(): Promise<void>;
    };

    businessDay: {
        getOpen(): Promise<BusinessDayDto | null>;
        create(businessDate: string, openedAt: string, scheduledCloseAt: string): Promise<string>;
        close(businessDayId: string): Promise<void>;
        extend(businessDayId: string, scheduledCloseAt: string): Promise<void>;
        getStatus(): Promise<{
            businessDayId: string;
            scheduledCloseAt: string;
            shouldWarn: boolean;
            hasExpired: boolean;
        } | null>;
    };
}