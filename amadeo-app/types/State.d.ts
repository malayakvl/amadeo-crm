// eslint-disable-next-line no-unused-vars
declare module State {
    // eslint-disable-next-line no-unused-vars
    interface Root {
        // eslint-disable-next-line no-undef
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
