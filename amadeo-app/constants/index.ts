// Each table pagination and controls meta stored to redux separately
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export const baseApiUrl = publicRuntimeConfig.apiUrl;

export enum PaginationType {
    NOTIFICATIONS = 'notifications',
    PRODUCTS = 'products',
    CHATBOT = 'chatbot',
    SHIPPING = 'shipping',
    LIVESESSIONS = 'livesessions',
    PAYMENTS = 'payments',
    BUYERS = 'buyers',
    ORDERS = 'orders',
    WAITING = 'waiting'
    // DASHBOARD = 'dashboard'
}

export const TableHeaders: { [key in PaginationType]: Type.DataTableHeader[] } = {
    [PaginationType.PRODUCTS]: [
        { sortKey: 'photo', titleKey: 'Photo' },
        { sortKey: 'name', titleKey: 'Reference | Name | Description' },
        { titleKey: null, className: 'option-switcher' },
        { titleKey: null, className: 'inventory-color' },
        { titleKey: null, className: 'inventory-size' },
        { titleKey: null, className: 'inventory-qty' },
        { titleKey: 'Price', className: 'inventory-price' },
        { titleKey: 'Actions', className: 'Actions' }
    ],
    [PaginationType.NOTIFICATIONS]: [],
    [PaginationType.CHATBOT]: [
        { titleKey: null, className: 'option-switcher' },
        { sortKey: 'scenario', titleKey: 'Scenario', iconClass: 'scenario' },
        { titleKey: 'Trigger', iconClass: 'message' },
        { titleKey: 'Product' },
        { titleKey: 'Discount (%)' },
        { titleKey: 'Answers' },
        { titleKey: null, iconClass: 'eye', className: 'chat-eye' },
        { titleKey: null, className: 'actions' }
    ],
    [PaginationType.SHIPPING]: [
        { className: 'table-dropdown' },
        { className: 'table-number' },
        { titleKey: 'Shipping Method' },
        { className: 'shipping-logo' },
        { className: 'option-switcher' },
        { className: 'shipping-countries' },
        {}
    ],
    [PaginationType.LIVESESSIONS]: [
        { titleKey: null, iconClass: 'icon-tbl-date' },
        { titleKey: 'Start Time', iconClass: 'icon-tbl-time' },
        { titleKey: 'Duration Cart', iconClass: 'icon-tbl-cart' },
        { titleKey: null, iconClass: 'icon-tbl-status' },
        { titleKey: null }
        // { titleKey: 'Participants', iconClass: 'icon-tbl-users' },
        // { titleKey: 'Products' }
    ],
    [PaginationType.PAYMENTS]: [
        { titleKey: null, iconClass: 'icon-tbl-order' },
        { titleKey: null, iconClass: 'icon-tbl-date' },
        // { titleKey: null, iconClass: 'icon-tbl-order', className: 'flex justify-center' },
        { titleKey: 'Shopper', iconClass: 'icon-tbl-users' },
        { titleKey: null, iconClass: 'icon-tbl-amount' },
        { titleKey: 'Total', className: 'text-right' },
        { titleKey: null }
    ],
    [PaginationType.BUYERS]: [
        { iconClass: 'icon-tbl-triangle' },
        // { className: 'flex justify-center', iconClass: 'icon-tbl-index' },
        { iconClass: 'icon-tbl-users', titleKey: 'Shopper' },
        { className: 'flex justify-center', iconClass: 'icon-tbl-phone' },
        { iconClass: 'icon-tbl-address', titleKey: 'Address' },
        { className: 'flex justify-center', iconClass: 'icon-tbl-order', titleKey: 'Orders' },
        { className: 'text-right', titleKey: 'Total Spent' }
    ],
    [PaginationType.ORDERS]: [
        { iconClass: 'icon-tbl-triangle' },
        { sortKey: 'order_number', iconClass: 'icon-tbl-order' },
        { sortKey: 'status', iconClass: 'icon-tbl-status' },
        { sortKey: 'created_at', iconClass: 'icon-tbl-date' },
        { sortKey: 'user', titleKey: 'Shopper', iconClass: 'icon-tbl-users' },
        { sortKey: 'country', iconClass: 'icon-tbl-country' },
        { sortKey: 'country', iconClass: 'icon-tbl-sh-cart' },
        { sortKey: 'payment', iconClass: 'icon-tbl-card' },
        { titleKey: 'Products' },
        { titleKey: 'Total' }
    ],
    [PaginationType.WAITING]: [
        { iconClass: 'icon-tbl-triangle' },
        { sortKey: 'photo', titleKey: 'Photo' },
        { sortKey: 'name', titleKey: 'Reference | Name | Description' },
        { titleKey: null, className: 'inventory-color' },
        { titleKey: null, className: 'inventory-size' },
        // { sortKey: 'created_at', iconClass: 'icon-tbl-date' },
        { sortKey: 'user', titleKey: 'Shopper', iconClass: 'icon-tbl-users' }
        // { sortKey: 'country', iconClass: 'icon-tbl-country' },
        // { sortKey: 'country', iconClass: 'icon-tbl-sh-cart' },
        // { sortKey: 'payment', iconClass: 'icon-tbl-card' },
        // { titleKey: 'Products' },
        // { titleKey: 'Total' }
    ]
    // [PaginationType.DASHBOARD]: []
};
