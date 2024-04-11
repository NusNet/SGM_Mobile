import { HVista, Vista } from "@/components/base/ThemedView";
import { useTema } from "@/context/TemaProvider";
import { Text } from "../base/ThemedText";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { IconType, Icona } from "../base/ThemedIcon";

type EstatEstacioProps = {
    idLectura?: string;
  };
  export default function EstatEstacio  ({ idLectura }: EstatEstacioProps) {
    const { COLORS, MIDES } = useTema();
  
    var color = idLectura ? COLORS.exit : COLORS.alerta;
    var elText = idLectura ? "Lectura" : "Cap lectura";

    const anim = useRef(new Animated.Value(1));

    useEffect(() => {
      // makes the sequence loop
      Animated.loop(
        // runs given animations in a sequence
        Animated.sequence([
          // increase size
          Animated.timing(anim.current, {
            toValue: 1.4, 
            duration: 800, useNativeDriver:false,
          },),
          // decrease size
          Animated.timing(anim.current, {
            toValue: 1, 
            duration: 800, useNativeDriver:false,
          }),
        ])
      ).start();
    }, []);

    return (
      <HVista align="center" gap={10}>
        <Text color={COLORS.blanc} style={{fontWeight:"200", opacity:0.65}} mida={MIDES.small}>{idLectura}</Text>
        <Vista style={{opacity:idLectura ? 1:0.4}}>
          <Icona
            type={IconType.FontAweomseIcon}
            name={"inbox"}
            color={COLORS.blanc}
            size={20}
          />
        </Vista>
        <Animated.View
          style={[{
            margin:5,
            width: 11,
            height: 11,
            borderRadius: 4,
            backgroundColor: color,
          }, {transform: [{scale:anim.current}]}]}
        />
      </HVista>
    );
  };