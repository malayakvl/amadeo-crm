declare module State {
  interface Root {
    router: Type.RouterRootState;
    addresses: Addresses;
    profile: Profile;
  }

  type Addresses = Addresses.Root;
  type Profile = Profile.Root;
}
