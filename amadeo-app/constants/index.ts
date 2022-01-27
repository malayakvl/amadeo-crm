// Each table pagination and controls meta stored to redux separately
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export const baseApiUrl = publicRuntimeConfig.apiUrl;

export enum PaginationType {
    NOTIFICATIONS = 'notifications',
    PRODUCTS = 'products',
    CHATBOT = 'chatbot',
    SHIPPING = 'shipping',
    LIVESESSIONS = 'livesessions'
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
        { className: 'shipping-logo' },
        { titleKey: 'Shipping Method' },
        { className: 'option-switcher' },
        { className: 'shipping-countries' },
        {}
    ],
    [PaginationType.LIVESESSIONS]: [
        { titleKey: null, iconClass: 'icon-tbl-date' },
        { titleKey: 'Duration session', iconClass: 'icon-tbl-time' },
        { titleKey: 'Duration cart', iconClass: 'icon-tbl-cart' },
        { titleKey: null, iconClass: 'icon-tbl-status' },
        { titleKey: 'Participants', iconClass: 'icon-tbl-users' },
        { titleKey: 'Products' }
    ]
};
