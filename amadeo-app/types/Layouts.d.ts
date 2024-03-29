declare namespace Layouts {
    interface Root {
        pagination: {
            notifications: Pagination;
            products: Pagination;
        };
        isSidebarOpen: boolean;
        toasts: Toast[];
        checkedIds: CheckedIds[];
        modalConfirmationMeta: ModalConfirmationMeta | null;
    }

    interface Pagination {
        limit: number;
        offset: number;
        sort: string;
        column: string;
        query: string;
        filters?: any;
        meta?: Meta;
    }
    interface CheckedIds {
        id: number;
        checked: boolean;
    }

    // interface Filters {
    //     assetCode?: string;
    //     assetcategoryCode?: Type.AssetCategories;
    //     subComponentTypeId?: number | 'unassigned' | null;
    //     year?: string;
    //     startTime?: Type.Moment;
    //     endTime?: Type.Moment;
    //     voltage?: CableVoltages;
    // }

    interface Toast {
        id: number;
        message: ToastMessage;
        type: 'error' | 'success' | 'info';
    }

    type ToastMessage = string | { key: string; options: object };

    interface Meta {
        preWarningSetting?: number;
    }

    interface ModalConfirmationMeta {
        titleKey?: string;
        onConfirm: null;
    }
}
