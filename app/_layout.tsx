// import { ThemeProvider } from "@/hooks/useTheme";
// import { ConvexProvider, ConvexReactClient } from "convex/react";
// import { Stack } from "expo-router";

// const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
//   unsavedChangesWarning: false,
// });

// export default function RootLayout() {


//   return (
//     <ConvexProvider client={convex}>
//     <ThemeProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)"  />
//       </Stack>
//     </ThemeProvider>
//     </ConvexProvider>
//   )
// }

import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "@/hooks/useTheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      // Disable edge-to-edge so background + button styles work
      NavigationBar.setPositionAsync("absolute");

      // Set background to white
      NavigationBar.setBackgroundColorAsync("#fffbfbff");

      // Black icons for 3-button nav
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={Platform.OS === "android" ? ["bottom"] : []} // ✅ only Android
      >
        <ConvexProvider client={convex}>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
          </ThemeProvider>
        </ConvexProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}



