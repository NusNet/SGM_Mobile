import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Pressable } from "react-native";
import { useTema } from "@/context/TemaProvider";


export type CustomBackdropProps={
  onRequestDismiss: ()=>void,
} &BottomSheetBackdropProps &BottomSheetDefaultBackdropProps

const CustomBackdrop = ({onRequestDismiss, animatedIndex, animatedPosition, style}: CustomBackdropProps ) => {
  const {esFosc} = useTema();

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      esFosc ? [0.55, 0.95] : [0.5, 0.7] ,
      Extrapolation.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "black",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle}>
    <Pressable style={{flex:1}} onPress={() => onRequestDismiss()}/>
  </Animated.View>;
};

export default CustomBackdrop;