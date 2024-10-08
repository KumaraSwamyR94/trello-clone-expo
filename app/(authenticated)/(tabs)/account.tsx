import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';

const Account = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button title='Sign out' onPress={() => signOut()} />
    </View>
  );
};

export default Account;
