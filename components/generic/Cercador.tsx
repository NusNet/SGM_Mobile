import React, { useState } from "react";
import { HVista, Vista } from "../base/ThemedView";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, ViewProps } from "react-native";
import { useTema } from "@/context/TemaProvider";

export interface CercadorProps {
  onTextCanviat: (inputText: string) => any;
  onCercarClick?: (inputText: string) => any;
  containerStyle?: ViewProps["style"]
  color?:string
}

const Cercador = ({ onTextCanviat, onCercarClick, containerStyle, color }: CercadorProps) => {
  const { COLORS, MIDES } = useTema();
  const [textCerca, setTextCerca] = useState<string>("");
    const [inputFocused, setinputFocused] = useState(false)
  return (
    <HVista
      justify="space-between"
      align="center"
      style={[{
        paddingVertical:MIDES.small,
      }, containerStyle]}
    >
      <AntDesign name="search1" size={21} color={COLORS.gris[500]} />
        <TextInput
          onChangeText={(text) => {
            setTextCerca(text);
            onTextCanviat(text);
          }}
          onFocus={()=> setinputFocused(true)}
          onBlur={()=> setinputFocused(false)}
          numberOfLines={1}
          cursorColor={COLORS.gris[500]}
          value={textCerca}
          style={{
            flex:1,
            marginHorizontal:10,
            paddingHorizontal:8,
            minWidth: 200,
            height:35,
            fontSize: MIDES.medium,
            color: COLORS.text,
            borderRadius:5,
            elevation:(textCerca || inputFocused)?  4:0,
            backgroundColor:COLORS.fonsBase
          }}
          placeholder="Search...   "
          placeholderTextColor={COLORS.gris[500]}
        ></TextInput>
      <Pressable
        onPress={() => {
          onCercarClick && onCercarClick(textCerca);
        }}
        style={{backgroundColor:textCerca ? color ?? COLORS.primari:"transparent",
    padding:5, borderRadius:5}}
      >
        <Ionicons name="filter-sharp" size={21} color={textCerca ? COLORS.blanc:COLORS.gris[500]} />
      </Pressable>
    </HVista>
  );
};

export default Cercador;
