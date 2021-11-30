declare module State {
  interface Root {
    router: Type.RouterRootState;
    addresses: Addresses;
    profile: Profile;
    user: User;
  }

  type Addresses = Addresses.Root;
  type Profile = Profile.Root;
  type User = User.Root;
}
