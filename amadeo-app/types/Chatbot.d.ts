declare namespace Chatbot {
    interface Root {
        count: number;
        items: ChatbotItem[];
        itemsSystem: ChatbotItem[];
        item: ChatbotItem;
        isFetched: boolean;
        loading: boolean;
        isSystemLoaded: boolean;
        showForm: boolean;
        showedItems: number[];
    }

    interface ChatbotItem {
        id: number | null;
        name: string;
        trigger: string;
        description_fr: string;
        description_en: string;
        active: boolean;
        created_at: any;
        updated_at: any;
    }
}
