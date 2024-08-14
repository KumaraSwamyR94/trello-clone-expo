import { View, Text, Image } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

const BoardsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitle: () => (
            <Image
              source={require('@/assets/images/trello-logo-gradient-white.png')}
              style={{ width: 120, height: 50, resizeMode: 'contain' }}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default BoardsLayout;
