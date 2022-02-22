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
    }

    interface DataItem {
        buyer_first_name: string;
        buyer_photo: string;
        country_iso: string;
        country_name: string;
        buyer_id: 14;
        buyer_email: string;
        buyer_phone: string;
        buyer_address: string;
        total_count: number;
        total_amount: number;
        order_items: Orders.DataItem[];

        // address_line_1: null
        // address_line_2: null
        // buyer_email: "vlad.z@solid-sl.com"
        // buyer_first_name: ""
        // buyer_id: 11
        // buyer_photo: null
        // city: null
        // country_iso: null
        // country_name: null
        // order_items: null
        // post_code: null
        // state: null
        // total_amount: null
        // total_count: null
    }
}
