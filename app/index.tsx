import { Colors } from "@/constants/Colors";
import { ModalType } from "@/types/enums";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import AuthModal from "@/components/AuthModal";
import { useSupabase } from "@/context/SupabaseContext";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  const { getBoards } = useSupabase();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPonits = useMemo(() => ["35%"], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);


  const openLink = () => {
    WebBrowser.openBrowserAsync("https://google.co.in");
  };

  const openActionSheet = async () => {
    const data = await getBoards!();
    // const options = ["View Support Docs", "Contact Us", "Cancel"];
    // const cancelButtonIndex = 2;

    // showActionSheetWithOptions(
    //   {
    //     options,
    //     cancelButtonIndex,
    //     title: "Help",
    //   },
    //   (selectedIndex: any) => {}
    // );
  };

  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.4}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={() => bottomSheetRef.current?.close()}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { paddingTop: top }]}>
        <Image
          source={require("@/assets/images/login/trello.png")}
          style={styles.image}
        />
        <Text style={styles.introText}>
          Move teamwork forward - even on the go
        </Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#FFF" }]}
            onPress={() => showModal(ModalType.Login)}
          >
            <Text style={[styles.btnText, { color: Colors.primary }]}>
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => showModal(ModalType.SignUp)}
          >
            <Text style={[styles.btnText, { color: "#FFF" }]}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.decription} onPress={openLink}>
            By sigining up, you agree to the{" "}
            <Text style={styles.link}>User Notice</Text> and{" "}
            <Text style={styles.link} onPress={openLink}>
              Privacy Policy
            </Text>
          </Text>

          <Text style={styles.link} onPress={openActionSheet}>
            Can't Log in or Sign up?
          </Text>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPonits}
        index={0}
        handleComponent={null}
        enableOverDrag={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <AuthModal authType={authType} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  image: {
    height: 450,
    paddingHorizontal: 40,
    resizeMode: "contain",
  },
  introText: {
    fontWeight: 600,
    color: "#FFF",
    fontSize: 17,
    padding: 30,
  },
  bottomContainer: {
    gap: 10,
    width: "100%",
    paddingHorizontal: 40,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  btnText: {
    fontSize: 18,
  },
  decription: {
    fontSize: 12,
    textAlign: "center",
    color: "#FFF",
    marginHorizontal: 60,
  },
  link: {
    color: "#FFF",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
