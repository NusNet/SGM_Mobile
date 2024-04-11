import { useTema } from "@/context/TemaProvider";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { Text } from "../base/ThemedText";
import { Vista } from "../base/ThemedView";
import { Image } from "expo-image";
import { Imatges } from "@/assets/images/Imatges";
import { IconType, Icona, IconaProp } from "../base/ThemedIcon";
export const Error = ({ flexi, msg = true }: { flexi?: boolean, msg?:boolean }) => {
  const { COLORS } = useTema();
  const { width } = useWindowDimensions();

  const [img, setimg] = useState()

  useEffect(() => {
    
  var r = Math.round(Math.random()*5)
  setimg(r === 0? Imatges.cute : r ===1 ? Imatges.cute1: r===2 ? Imatges.cute2:  r===3 ?  Imatges.cute3 : r ===4 ?Imatges.cute4 : Imatges.cute5);

  }, [])
  


  return (
    <View
      style={{
        flex: flexi ? 1 : 0,
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {msg &&
      <Text color={COLORS.gris[600]}>Alguna cosa ha anat malament</Text>
      }
      <Icona type={IconType.MaterialCommunityIcons} name={"server-network-off"} size={95} color={COLORS.gris[700]}/>

      <Vista style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          contentFit="contain"
          source={img}
          style={{ opacity: 0.7, width:200, height:200, }}
        />
      </Vista>
    </View>
  );
};


export const ErrorIcona = ({ flexi, icona, msg = false }: { flexi?: boolean, icona: IconaProp, msg?:boolean }) => {
  const { COLORS } = useTema();

  return (
    <View
      style={{
        flex: flexi ? 1 : 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {msg &&
      <Text color={COLORS.gris[600]}>Alguna cosa ha anat malament :(</Text>
      }

      <Vista style={{ alignItems: "center", justifyContent: "center" }}>
        <Icona name={icona.name} type={icona.type} color={icona.color ?? COLORS.gris[700]} size={icona.size}
        />
      </Vista>
    </View>
  );
};


