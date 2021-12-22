declare namespace Products {
    interface Root {
        products: Product[];
        additional: {
            colors: Color[];
            sizes: Size[];
            styles: Style[];
            materials: Material[];
        };
        objectsAdditional: Products.Additionals;
        product: Product;
        colors: Color[];
        sizes: Size[];
        styles: Style[];
        materials: Material[];
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
        selectedAdditionals: Products.Additionals;
    }

    interface Additionals {
        colors: Additional[];
        sizes: Additional[];
        styles: Additional[];
        materials: Additional[];
    }

    interface Additional {
        label: string;
        value: number;
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

    interface Style {
        id: number | null;
        name: string | null;
        translations: any | null;
    }

    interface Material {
        id: number | null;
        name: string | null;
        translations: any | null;
    }

    interface ProductItem {
        id: number;
        name: string;
        previewphoto: string;
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
