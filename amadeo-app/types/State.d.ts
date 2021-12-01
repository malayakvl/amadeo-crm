declare module State {
    interface Root {
        router: Type.RouterRootState;
        addresses: Addresses;
        profile: Profile;
        user: User;
        notifications: Notifications;
    }

    type Addresses = Addresses.Root;
    type Profile = Profile.Root;
    type User = User.Root;
    type Notifications = User.Notifications;
}
