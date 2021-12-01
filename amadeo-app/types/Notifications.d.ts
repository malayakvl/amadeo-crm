declare namespace Notifications {
    interface Root {
        cntNew: number;
        notifications: Notification[];
        notification: Notification;
    }

    interface Notification {
        id: number;
        user_id: number;
        message: string;
        is_read: boolean;
        type: string;
        created_at: any;
        updated_at: any;
    }
}
