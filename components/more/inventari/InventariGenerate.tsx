import { PostNouInventari } from "@/accessos/OrdreAcces";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import {
  BotoFlotant,
  BotoTextMenu,
  Pressionable,
} from "@/components/base/ThemedPress";
import { Targeta } from "@/components/base/ThemedTargeta";
import { Text } from "@/components/base/ThemedText";
import { HVista, Separador, Vista } from "@/components/base/ThemedView";
import { useTema } from "@/context/TemaProvider";
import { OrdreInventariAdd } from "@/models/DTOs/OrdreInventariAdd";
import { Producte } from "@/models/Producte";
import React, { useState } from "react";
import { FlatList, TextInput, ViewProps } from "react-native";

export type InventariGenerateProps ={
    productes: Producte[],
    esborrarProducte:( producte:Producte) => void
    generarInventari: (dto :OrdreInventariAdd) => void
    containerStyle?: ViewProps["style"]
}
const InventariGenerate = ({productes, esborrarProducte, generarInventari, containerStyle} : InventariGenerateProps) => {
  const { COLORS, MIDES } = useTema();

  const [idInventari, setidInventari] = useState<string>()

  const postInventari = async () =>{
    if (idInventari && productes){
      var dto : OrdreInventariAdd = {
        Id: Number.parseInt(idInventari),
        Productes: productes.map(p=>p.referencia)
      }
      generarInventari(dto);
    }
  }

  return (
    <Targeta
      style={[{ marginHorizontal: MIDES.xxSmall, },containerStyle]}
    >
      <Vista style={{ flex: 1 }} gap={5}>
        <HVista align="center" justify="space-between" gap={10} style={{marginBottom:20}}>
          <HVista gap={12} align="center">
            <Text pes="negreta" mida={MIDES.xLarge}>
              Inventari
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor:COLORS.gris[900],
                borderColor: COLORS.inventari,
                paddingHorizontal: 15,
                fontSize: MIDES.large,
                fontWeight: "bold",
                minWidth: 130,
                color:COLORS.text
              }}
              onChangeText={(text) => setidInventari(text)}
              value={idInventari}
              cursorColor={COLORS.gris[700]}
              keyboardType="numeric"
            ></TextInput>
          </HVista>
          <HVista align="center" gap={5}>
            <Text pes="negreta" color={COLORS.inventari}>
              {productes.length}
            </Text>
            <Icona
              type={IconType.MaterialCommunityIcons}
              name={"hammer-wrench"}
              color={COLORS.inventari}
              size={18}
            />
          </HVista>
        </HVista>
        <FlatList
          style={{ flex: 1 }}
          data={productes}
          ItemSeparatorComponent={() => <Separador marge={4} />}
          renderItem={({ item, index }) => (
            <HVista
              style={{ paddingHorizontal: 10, paddingVertical: 1 }}
              justify="space-between" align="center"
              gap={20}
            >
              <Text mida={MIDES.small}>{item.referencia}</Text>
              <Pressionable style={{ padding:5, paddingLeft:20}}
                pressedOpacity={true}
                onPress={() => esborrarProducte(item)}
              >
                <Icona type={IconType.Feather} name={"trash-2"} />
              </Pressionable>
            </HVista>
          )}
        />
        <BotoFlotant color={COLORS.inventari} disabled={!idInventari || productes.length ===0} 
          onPress={() => postInventari()}
        >
          <Text color={COLORS.blanc}>Generar</Text>
        </BotoFlotant>
      </Vista>
    </Targeta>
  );
};

export default InventariGenerate;


