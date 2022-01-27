declare namespace Livesessions {
    interface Root {
        count: number;
        items: DataItem[];
        item: DataItem;
        isFetched: boolean;
        loading: boolean;
        showPopup: boolean;
        itemScenarios: DataScenario[];
    }

    interface DataScenario {
        id: number;
        name: string;
    }

    interface DataItem {
        id: number | null;
        name: string;
        keywords: string;
        message_fr: string;
        message_en: string;
        active: boolean;
        answer_count: any;
        discount: any;
        product: any;
        created_at: any;
        updated_at: any;
    }
}
