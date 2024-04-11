import { useTema } from "@/context/TemaProvider";
import React, { useCallback, useImperativeHandle } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Vista } from "../base/ThemedView";
import { Keyboard } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
var MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
var MIN_TRANSLATE_Y = -SCREEN_HEIGHT / 3;
var MID_TRANSLATE_Y = -SCREEN_HEIGHT / (3 / 2);

type BottomSheetProps = {
  children?: React.ReactNode;
  withBackdrop?: boolean;
  snapPoints?: number[] | string[];
};

export type BottomSheetRefProps = {
  present: (position?: number) => void;
};
const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children, withBackdrop = true, snapPoints }, ref) => {
    const { COLORS } = useTema();

    var SNAPPOINTS: number[] = [];
    if (snapPoints) {
      if (typeof snapPoints[0] === "string")
        SNAPPOINTS = snapPoints.map(
          (snap) => (-SCREEN_HEIGHT * parseFloat(snap as string)) / 100
        );
      else SNAPPOINTS = snapPoints as number[];
    } else SNAPPOINTS = [MIN_TRANSLATE_Y, MID_TRANSLATE_Y, MAX_TRANSLATE_Y];

    const context = useSharedValue({ y: 0 });
    const translateY = useSharedValue(0);

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      if (destination === 0) {
        translateY.value = withTiming(destination, {
          duration: 200,
          easing: Easing.in(Easing.quad),
        });
      } else {
        translateY.value = withSpring(destination, { damping: 100 });
      }
    }, []);
    const present = (position?: number) => {
      Keyboard.dismiss();
      var posicio = SNAPPOINTS[position ?? 0];
      scrollTo(posicio);
    };

    useImperativeHandle(
      ref,
      () => ({
        present,
      }),
      [present]
    );

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > SNAPPOINTS[0] + 80) scrollTo(0);
        else {
          var closest = SNAPPOINTS.sort(function (a, b) {
            var a = Math.abs(a - translateY.value);
            var b = Math.abs(b - translateY.value);
            return a < b ? -1 : a > b ? 1 : 0;
          })[0];

          scrollTo(closest);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle((): any => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 15],
        Extrapolation.CLAMP
      );
      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    const rBackDropStyle = useAnimatedStyle((): any => {
      const opacity = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y, 0],
        [0.55, 0.3, 0],
        Extrapolation.CLAMP
      );
      const height = translateY.value == 0 ? 0 : SCREEN_HEIGHT;
      return {
        opacity: opacity,
        height: height,
      };
    });

    return (
      <>
        <Animated.View
          onTouchEnd={() => scrollTo(0)}
          style={[
            {
              display: withBackdrop ? "flex" : "none",
              position: "absolute",
              width: "100%",
              top: 0,
              backgroundColor: "black",
            },
            rBackDropStyle,
          ]}
        ></Animated.View>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                height: SCREEN_HEIGHT,
                width: "100%",
                opacity: 1,
                backgroundColor: COLORS.blanc,
                position: "absolute",
                top: SCREEN_HEIGHT,
                // borderRadius: 25,
              },
              rBottomSheetStyle,
            ]}
          >
            <Vista
              style={{
                width: 75,
                height: 4,
                backgroundColor: COLORS.gris[600],
                alignSelf: "center",
                marginTop: 15,
                marginBottom: 5,
                borderRadius: 2,
              }}
            ></Vista>

            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

export default BottomSheet;
