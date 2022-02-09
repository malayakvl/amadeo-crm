declare namespace Orders {
    interface Root {
        count: number;
        items: DataItem[];
        item: DataItem;
        isFetched: boolean;
        loading: boolean;
        showPopup: boolean;
    }

    interface DataItem {
        id: number;
        user_id: number;
        user_name: string;
        photo: string;
        flag_name: string | null;
        shipping_image: string | null;
        live_sessions_id: number;
        shipping_id: number | null;
        shipping_name: string | null;
        country_id: number | null;
        country_name: string | null;
        payment_id: number | null;
        payment_name: string | null;
        order_amount: number;
        discount_amount: number;
        total_amount: number;
        order_number: number;
        status: string;
        created_at: any;
        updated_at: any;
    }
}
