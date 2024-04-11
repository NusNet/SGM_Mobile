import { LayoutPrincipal } from "@/components/base/LayoutPrincipal";
import { EstacioProvider } from "@/context/EstacioContext";
import { RolProvider } from "@/context/RolContext";
import { TemaProvider } from "@/context/TemaProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SpaceMonoBold: require("../assets/fonts/SpaceMono-Bold.ttf"),
    Exo2Bold: require("../assets/fonts/Exo2-Bold.ttf"),
    Exo2Regular: require("../assets/fonts/Exo2-Regular.ttf"),
    //  ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) {
  //     throw error;}
  // }, [error]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    SplashScreen.hideAsync();
    return <Text>{error}</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RolProvider>
        <TemaProvider>
          <RootLayoutNav />
        </TemaProvider>
      </RolProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  return (
    <LayoutPrincipal>
      <EstacioProvider>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </BottomSheetModalProvider>
      </EstacioProvider>
    </LayoutPrincipal>
  );
}
