import { Imatges } from "@/assets/images/Imatges";
import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { Vista } from "../base/ThemedView";
import { Text } from "../base/ThemedText";
import { Animated, useWindowDimensions } from "react-native";
const EstacioBuida = () => {

  const scaleX = useRef<Animated.Value>(new Animated.Value(0));

  const opacity = useRef<Animated.Value>(new Animated.Value(0));

  const {width} = useWindowDimensions();

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.stagger(0,[
        Animated.timing(scaleX.current, {
          toValue: width+100, 
          duration: 5000, useNativeDriver:false,
        },),
        Animated.sequence([
          Animated.timing(opacity.current, {
            toValue: 1, 
            duration: 2500, useNativeDriver:false,
          },),
          Animated.timing(opacity.current, {
            toValue: 0.2, 
            duration: 2500, useNativeDriver:false,
          },),
        ]),        
      ])
    ).start();
  }, []);


  return (
    <Vista style={{ flex: 1 }} align="stretch" justify="center">

      <Vista justify="center" align="center" >

      <Text to="secundari">No hi ha cap gaveta a l'estació</Text>
      </Vista>
      <Animated.View style={[{padding:0, marginLeft:-100, justifyContent:"center"}, {
        opacity:opacity.current,
        transform:[{translateX:scaleX.current},]}]}
        
      >
        <Image style={{width:100, height:100, }}
          contentFit="contain"
          source={Imatges.gaveta}
        />
      </Animated.View>
   
    </Vista>
  );
};

export default EstacioBuida;
