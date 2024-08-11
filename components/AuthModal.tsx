import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AuthStrategy, ModalType } from "@/types/enums";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

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
  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: AuthStrategy.Google,
  });
  const { startOAuthFlow: microsoftAuth } = useOAuth({
    strategy: AuthStrategy.Microsoft,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({
    strategy: AuthStrategy.Apple,
  });
  const { startOAuthFlow: slackAuth } = useOAuth({
    strategy: AuthStrategy.Slack,
  });

  const onAuthSelect = async (startegy: AuthStrategy) => {
    useWarmUpBrowser();
    if (!signIn || !signUp) return;

    const selectedAuth = {
      [AuthStrategy.Google]: googleAuth,
      [AuthStrategy.Microsoft]: microsoftAuth,
      [AuthStrategy.Apple]: appleAuth,
      [AuthStrategy.Slack]: slackAuth,
    }[startegy];

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      try {
        const { createdSessionId, setActive } = await selectedAuth();

        if (createdSessionId) {
          setActive!({ session: createdSessionId });
        }
      } catch (err) {
        console.log(err);
      }
    }
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
    resizeMode: "contain",
  },
});

export default AuthModal;
