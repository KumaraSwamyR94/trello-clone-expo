import { View, Text } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { DefaultTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const NewBoardLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Board',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: DefaultTheme.colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='close' size={25} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name='color-select'
        options={{
          title: 'Board Background',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: DefaultTheme.colors.background,
          },
        }}
      />
    </Stack>
  );
};

export default NewBoardLayout;
