import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: {
    id: string;
    name?: string;
    price?: number;
  };
  Cart: undefined;
};

export type DrawerParamList = {
  ProfileMain: undefined;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Orders: undefined;
  ProfileTab: NavigatorScreenParams<DrawerParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<TabParamList>;
};
