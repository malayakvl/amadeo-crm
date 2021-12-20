declare namespace Products {
    interface Root {
        products: Product[];
        product: Product;
        colors: Color[];
        sizes: Size[];
        loading: boolean;
        isFetched: boolean;
        uploadedFiles: File[];
        productFiles: string[];
        checkedIds: number[];
        count: number;
        items: ProductItem[];
        activeTab: string;
        selectedColors: any[];
        selectedSizes: any[];
    }

    interface Product {
        product: any;
        configurations: any;
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
