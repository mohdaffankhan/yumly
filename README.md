# Yumly — Food Delivery App

A small Expo + React Native app built to practice the major React Navigation
patterns end-to-end: stack, nested stacks, bottom tabs, drawer, conditional
auth flow, params, deep linking, and persisted session.

## Tech stack

- Expo SDK 55 (React Native 0.83)
- React Navigation 7 (native-stack, bottom-tabs, drawer)
- TypeScript
- AsyncStorage (mock auth persistence)
- @expo/vector-icons (Ionicons)

## Run locally

```bash
npm install
npm start
```

Then press `i` for iOS simulator, `a` for Android, or scan the QR with Expo Go.

> Use any email and a 4+ character password to sign in. The session is stored
> in AsyncStorage so it survives reloads.

## Navigation structure

```
NavigationContainer
└── Conditional on auth state
    ├── Unauthenticated → AuthStack
    │   ├── Onboarding   (Get Started → replace → Login)
    │   └── Login        (mock sign-in, persisted)
    │
    └── Authenticated → MainTabs (Bottom Tab Navigator)
        ├── HomeTab     → HomeStack (Native Stack)
        │   ├── Home               (list of restaurants)
        │   ├── RestaurantDetail   (params: id, name, price)  ← tab bar hidden
        │   └── Cart                                          ← tab bar hidden
        │
        ├── Search      (single screen, jumps to RestaurantDetail in HomeTab)
        │
        ├── Orders      (badge shows live cart count)
        │
        └── ProfileTab  → ProfileDrawer (Drawer Navigator)
            ├── Profile     (default; "hamburger" opens drawer)
            ├── My Orders
            ├── Settings
            └── Help
            (custom drawer content: avatar + name + log out)
```

## Deep linking

URL scheme: `foodapp://`

| Link                          | Opens                                |
| ----------------------------- | ------------------------------------ |
| `foodapp://restaurant/123`    | Restaurant Detail for id `123`       |
| `foodapp://home`              | Home screen                          |
| `foodapp://cart`              | Cart                                 |
| `foodapp://profile/orders`    | Drawer → My Orders                   |
| `foodapp://login`             | Login (when signed out)              |

Test from a device terminal:

```bash
# iOS Simulator
xcrun simctl openurl booted foodapp://restaurant/123

# Android
adb shell am start -W -a android.intent.action.VIEW -d "foodapp://restaurant/123"
```

When the app opens a deep link and only the `id` is present, the restaurant
name and price are looked up from the local data file as a fallback.

## What's demonstrated

- **Nested navigators**: HomeStack inside HomeTab; ProfileDrawer inside ProfileTab.
- **Params**: `Home → RestaurantDetail` passes `{ id, name, price }`.
- **Header customization**: HomeStack header is colored, with a back label.
- **Tab badge**: Orders tab shows live cart count via `tabBarBadge`.
- **Hide tab bar**: tab bar is hidden on Restaurant Detail and Cart using
  `getFocusedRouteNameFromRoute`.
- **Conditional auth flow**: `user` from `AuthContext` decides which navigator
  is mounted; persisted via AsyncStorage and re-hydrated on reload.
- **Programmatic navigation**: `navigate`, `goBack`, `replace`, and `reset`
  are all used (see Onboarding, Cart empty state, Cart checkout).
- **Deep linking**: configured via `linking` on `NavigationContainer`.

## Project structure

```
src/
  context/        Auth + Cart providers
  data/           Mock restaurant list
  navigation/    AuthStack, HomeStack, MainTabs, ProfileDrawer, CustomDrawer, RootNavigator
  screens/        All screens (drawer screens in screens/drawer)
  theme.ts        Colors + spacing
  types.ts        Typed param lists
```

## Assumptions

- Authentication is mocked; any email and a 4+ character password is accepted.
- Restaurant data is local — no network calls.
- Cart state is in-memory; it resets on app reload (auth persists).
- The drawer is intentionally placed inside the Profile tab (rather than as
  a top-level navigator) to match the spec.

## Submission

- Demo video: *add link here*
- Public repo: *add link here*
