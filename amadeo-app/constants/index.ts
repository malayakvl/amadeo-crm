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
    // PAYMENTS_TRANSACTIONS = 'chatbot'
    PAYMENTS_TRANSACTIONS = 'paymentstransactions'
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
        { className: 'shipping-dropdown' },
        { className: 'shipping-number' },
        { titleKey: 'Shipping Method' },
        { className: 'shipping-logo' },
        { className: 'option-switcher' },
        { className: 'shipping-countries' },
        {}
    ],
    [PaginationType.LIVESESSIONS]: [
        { titleKey: null, iconClass: 'icon-tbl-date' },
        { titleKey: 'Start Time', iconClass: 'icon-tbl-time' },
        // { titleKey: 'Duration cart', iconClass: 'icon-tbl-cart' },
        { titleKey: null, iconClass: 'icon-tbl-status' },
        { titleKey: 'Participants', iconClass: 'icon-tbl-users' },
        { titleKey: 'Products' }
    ],
    [PaginationType.PAYMENTS_TRANSACTIONS]: [
        { titleKey: null },
        { titleKey: null, sortKey: 'id', iconClass: 'icon-tbl-order' }, // 'Id'
        { titleKey: null, iconClass: 'icon-tbl-date' },
        { titleKey: null, sortKey: 'order', iconClass: 'icon-tbl-order' }, //'Order'
        { titleKey: 'Shopper', iconClass: 'icon-tbl-users' },
        { titleKey: null, sortKey: 'paymentMethod', iconClass: 'icon-tbl-amount' },
        { titleKey: 'Total' },
        { titleKey: null, className: 'w-1' }
    ]
};
