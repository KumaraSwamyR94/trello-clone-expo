import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AuthStrategy, ModalType } from "@/types/enums";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type AuthModalProps = {
  authType: ModalType | null;
};

const LOGIN_OPTIONS = [
  {
    text: "Continue with Google",
    icon: require("@/assets/images/login/google.png"),
    strategy: AuthStrategy.Google,
  },
  {
    text: "Continue with Microsoft",
    icon: require("@/assets/images/login/microsoft.png"),
    strategy: AuthStrategy.Microsoft,
  },
  {
    text: "Continue with Apple",
    icon: require("@/assets/images/login/apple.png"),
    strategy: AuthStrategy.Apple,
  },
  {
    text: "Continue with Slack",
    icon: require("@/assets/images/login/slack.png"),
    strategy: AuthStrategy.Slack,
  },
];

const AuthModal = ({ authType }: AuthModalProps) => {
  const onAuthSelect = async (startegy: AuthStrategy) => {
    console.log();
    
  };
  return (
    <BottomSheetView style={styles.modalContainer}>
      <TouchableOpacity style={styles.modalButton}>
        <Ionicons name="mail-outline" size={20} />
        <Text style={styles.btnText}>
          {authType === ModalType.Login ? "Log in" : "Sign up"} with Email
        </Text>
      </TouchableOpacity>
      {LOGIN_OPTIONS.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.modalButton}
          onPress={() => onAuthSelect(option.strategy!)}
          >
          <Image source={option.icon} style={styles.btnIcon} />
          <Text style={styles.btnText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "flex-start",
    padding: "5%",
    gap: 20,
  },
  modalButton: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
  },
  btnIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default AuthModal;
