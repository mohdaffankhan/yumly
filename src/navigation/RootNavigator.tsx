import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import {
  DefaultTheme,
  NavigationContainer,
  type LinkingOptions,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from '@/context/AuthContext';
import AuthStack from '@/navigation/AuthStack';
import MainTabs from '@/navigation/MainTabs';
import { colors } from '@/theme';
import type { RootStackParamList } from '@/types';

const prefix = Linking.createURL('/');

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, 'foodapp://'],
  config: {
    screens: {
      Main: {
        screens: {
          HomeTab: {
            screens: {
              Home: 'home',
              RestaurantDetail: 'restaurant/:id',
              Cart: 'cart',
            },
          },
          Search: 'search',
          Orders: 'orders',
          ProfileTab: {
            screens: {
              ProfileMain: 'profile',
              MyOrders: 'profile/orders',
              Settings: 'profile/settings',
              Help: 'profile/help',
            },
          },
        },
      },
      Auth: {
        screens: {
          Onboarding: 'welcome',
          Login: 'login',
        },
      },
    },
  },
};

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bg, primary: colors.primary },
};

export default function RootNavigator() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) SplashScreen.hideAsync().catch(() => {});
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking} theme={navTheme}>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
