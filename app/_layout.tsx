import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
    </Stack>
  );
}

const RootLayoutNav = () => {
  return (
    <ActionSheetProvider>
      <>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
          <RootLayout />
        </GestureHandlerRootView>
      </>
    </ActionSheetProvider>
  );
};

export default RootLayoutNav
