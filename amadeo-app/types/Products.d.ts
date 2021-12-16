declare namespace Products {
    interface Root {
        products: Product[];
        product: Product;
        colors: Color[];
        sizes: Size[];
        loading: boolean;
        isFetched: boolean;
        uploadedFiles: File[];
        checkedIds: number[];
        count: number;
        items: ProductItem[];
    }

    interface Product {
        id: number | null;
        user_id: number | null;
        country_id: number | null;
        state: string | null;
        post_code: string | null;
        address_type: string | null;
        city: string | null;
        address_line_1: string | null;
        address_line_2: string | null;
        created_at: any;
        updated_at: any;
    }

    interface Color {
        id: number | null;
        name: string | null;
        translations: any | null;
    }

    interface Size {
        id: number | null;
        name: string | null;
        translations: any | null;
    }

    interface ProductItem {
        id: number;
        name: string;
        previewphoto: any;
        description: string;
        price: number;
        quantity: number;
        publish: boolean;
        first_name: string | null;
        last_name: string | null;
        created_at: any;
        updated_at: any;
    }
}
