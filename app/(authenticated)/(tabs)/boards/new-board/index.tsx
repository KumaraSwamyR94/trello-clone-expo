import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_COLOR } from './color-select';

const NewBoard = () => {
  const [boardName, setBoardName] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLOR);

  const onCreateBoard = async () => {};
  return (
    <View style={{ marginVertical: 10 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={onCreateBoard}>
              <Text style={boardName ? styles.btnText : styles.btnTextDisabled}>
                Create
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <TextInput
        style={styles.input}
        value={boardName}
        onChangeText={setBoardName}
        placeholder='New Board'
        autoFocus
      />
      <Link
        href={'/(authenticated)/(tabs)/boards/new-board/color-select'}
        asChild>
        <TouchableOpacity style={styles.btnItem}>
          <Text style={styles.btnItemText}>Background</Text>
          <View
            style={[styles.colorPreview, { backgroundColor: selectedColor }]}
          />
          <Ionicons name='chevron-forward' size={22} color={Colors.grey} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  btnTextDisabled: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.grey,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary,
  },
  input: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
    backgroundColor: 'white',
    padding: 12,
    paddingHorizontal: 24,
    fontSize: 16,
    marginBottom: 32,
  },
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
  },
  btnItemText: {
    fontSize: 16,
    flex: 1,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
});

export default NewBoard;
