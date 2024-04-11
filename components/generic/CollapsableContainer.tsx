import React, { useState } from "react";
import { LayoutChangeEvent, View, Text, ViewProps } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const CollapsableContainer = ({
  children,
  expanded,
  style
}: {
  children: React.ReactNode;
  expanded: boolean;
  style?: ViewProps["style"]
}) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    console.log("onlayout", onLayoutHeight)
    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded
      ? withTiming(height, {
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System,
        })
      : withTiming(0, {
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System,
        });

    return {
      height: animatedHeight.value,
    };
  }, [expanded, height]);

  return (
    <Animated.View style={[style, collapsableStyle, { overflow: "hidden" }]}>
      <View style={{ position: "absolute", width:"100%" }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};
