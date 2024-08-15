import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';

const COLORS = [
  '#0079bf',
  '#d29034',
  '#519839',
  '#b04632',
  '#89609e',
  '#cd5a91',
  '#4bbf6b',
  '#00aecc',
  '#838c91',
];
export const DEFAULT_COLOR = COLORS[0];

const ColorSelect = () => {
  const [selected, setSelected] = useState(DEFAULT_COLOR);
  const onColorSelect = (color: string) => {
    setSelected(color);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          onPress={() => onColorSelect(color)}
          style={{
            backgroundColor: color,
            height: 100,
            aspectRatio: 1,
            margin: 5,
            borderRadius: 4,
            borderWidth: color === selected ? 2 : 0,
            borderColor: Colors.fontDark,
          }}></TouchableOpacity>
      ))}
    </View>
  );
};

export default ColorSelect;
