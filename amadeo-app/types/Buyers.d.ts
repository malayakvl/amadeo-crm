declare namespace Buyers {
    interface Root {
        count: number;
        items: DataItem[];
        // orders: { [index]: Orders.DataItem[] };
        methods: PaymentMethod[];
        isFetched: boolean;
        loading: boolean;
        showPopup: boolean;
        fileterData: any;
        showDateSelector: boolean;
        tagSellersSuggestions: any[];
        tagBuyerssSuggestions: any[];
    }

    interface DataItem {
        buyer_id: number;
        buyer_email: string;
        buyer_first_name: string;
        buyer_photo: string;
        buyer_phone: string;
        buyer_full_address: string;
        country_iso: string;
        country_name: string;
        total_count: number;
        total_amount: number;
        order_items: OrderDataItem[];
    }

    interface OrderDataItem extends Orders.DataItem {
        order_items_count: number;
    }
}
