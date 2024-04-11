import { IconType, Icona } from "@/components/base/ThemedIcon";
import { Boto, } from "@/components/base/ThemedPress";
import { Targeta } from "@/components/base/ThemedTargeta";
import { DataText, Text } from "@/components/base/ThemedText";
import { HVista, Vista } from "@/components/base/ThemedView";
import EstatOrdreTag, {
    modeEstatOrdreTag,
} from "@/components/ordre/EstatOrdreTag";
import TipusOrdreTag from "@/components/ordre/TipusOrdreTag";
import { useTema } from "@/context/TemaProvider";
import { Ordre, enumEstatOrdre } from "@/models/Ordre";
import { router } from "expo-router";
import React from "react";

export type OrdreListTargetaProps={
    ordre: Ordre,
    onRequestExecutarOrdre: (ordre:Ordre)=> void
}

const OrdreListTargeta = ({ordre, onRequestExecutarOrdre}:OrdreListTargetaProps) => {

    const { COLORS, MIDES } = useTema();


  return (
    <Targeta clicable onPress={() => router.push(`/more/InformacioOrdre/${ordre.id}`)}>
    <HVista justify="space-between" align="center" gap={8}>
      <Text
        numberOfLines={1}
        style={{ width: 75 }}
        mida={MIDES.small}
      >
        {ordre.idComanda}
      </Text>
      <HVista
        gap={18}
        align="center"
        justify="space-between"
        style={{ flex: 1 }}
      >
        <DataText to="terciari" mida={MIDES.small} format="HH:ss">
          {ordre.data}
        </DataText>
        <TipusOrdreTag tipus={ordre.tipus}></TipusOrdreTag>
        <HVista
          align="center"
          justify="flex-end"
          gap={5}
          style={{ minWidth: 40 }}
        >
          <Text to="terciari" mida={MIDES.small}>
            {ordre.quantitatGavetes}
          </Text>
          <Icona
            type={IconType.FontAweomseIcon}
            name={"inbox"}
            color={COLORS.gris[600]}
            size={18}
          />
        </HVista>
      </HVista>
      <Vista style={{ width: 55 }} align="flex-end">
        {ordre.estat === enumEstatOrdre.Pendent ? (
          <Boto
            onPress={() => onRequestExecutarOrdre(ordre)}
            style={{
              backgroundColor: COLORS.gris[800],
              padding: 5,
              borderWidth:1,
              borderColor: COLORS.gris[600],
              paddingHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <EstatOrdreTag
              estat={ordre.estat}
              mode={modeEstatOrdreTag.Icona}
              midaIcona={25}
            ></EstatOrdreTag>
          </Boto>
        ) : (
          <EstatOrdreTag
            estat={ordre.estat}
            mode={modeEstatOrdreTag.Icona}
            midaIcona={25}
          ></EstatOrdreTag>
        )}
      </Vista>
    </HVista>
  </Targeta>  )
}

export default OrdreListTargeta