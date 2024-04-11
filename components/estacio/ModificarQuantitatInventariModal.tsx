import { PutModificarEstoc } from "@/accessos/EstacioAcces";
import { useTema } from "@/context/TemaProvider";
import { Accio } from "@/models/Accio";
import { Contenidor } from "@/models/Contenidor";
import { ModificarEstocInventari } from "@/models/DTOs/ModificarEstoc";
import React, { useState } from "react";
import { Keyboard, TextInput } from "react-native";
import { BotoFlotant, } from "../base/ThemedPress";
import { Text } from "../base/ThemedText";
import { HVista, Vista } from "../base/ThemedView";
import { IconType, Icona } from "../base/ThemedIcon";

type ModificarQuantitatProps = {
  accio: Accio;
  contenidor: Contenidor;
  onRequestCloseModal: () => void;
};
const ModificarQuantitatInventariModal = ({
  accio,
  contenidor,
  onRequestCloseModal,
}: ModificarQuantitatProps) => {
  const { COLORS, MIDES } = useTema();

  const [valorModificat, setValorModificat] = useState<string | undefined>();


  const onModificarEstoc = async () => {
    try {
      if (valorModificat) {
        var dto: ModificarEstocInventari = {
          IdGaveta: contenidor.id,
          IdEstacio: "EM1",
          IdOrdre: 0,
          IdProducte: contenidor.producte.referencia,
          QuantitatReal: Number.parseInt(valorModificat),
        };

        await PutModificarEstoc(dto);
        contenidor.quantitatDisponible = Number.parseInt(valorModificat);
        onRequestCloseModal();
        Keyboard?.dismiss();
      }
    } catch (err) {
      console.log("ERROR put entrar gaveta", err);
    }
  };

  return (
    <Vista style={{ flex: 1 }}>
      <Vista justify="center" align="center">
        <Text color={COLORS.inventari} style={{ marginBottom: MIDES.large }}>
          Modificar l'estoc
        </Text>

        <Text style={{ fontWeight: "bold", fontSize: MIDES.large }}>
          {contenidor.producte.referencia}
        </Text>
        <Text
          numberOfLines={2}
          style={{ color: COLORS.gris[500], textAlign: "center" }}
        >
          {contenidor.producte.nom}
        </Text>
      </Vista>
      <Vista style={{ marginHorizontal: MIDES.medium, flex: 1 }} align="center" justify="center" gap={10}>
        <HVista          
          align="center"
          justify="center"
          gap={MIDES.xLarge}
        >
          <Text style={{ fontSize: MIDES.huge }}>
            {contenidor.quantitatDisponible+contenidor.quantitatEnUs}
          </Text>
          <Icona
            type={IconType.MatetrialIcon}
            name="keyboard-double-arrow-right"
          />
          <TextInput
            style={{
              borderWidth: 2,
              borderRadius: 5,
              borderColor: COLORS.inventari,
              paddingHorizontal: 15,
              paddingVertical: 5,
              fontSize: MIDES.huge,
              minWidth: 70,
              color:COLORS.text
            }}
            onChangeText={(text) => setValorModificat(text)}
            value={valorModificat}
            cursorColor={COLORS.gris[700]}
            keyboardType="numeric"
          ></TextInput>
        </HVista>
        <Text pes="negreta" to="secundari">Quantitat actual en la gaveta</Text>
        <HVista gap={6}>

        <Text  to="secundari">També hi ha</Text>
        <Text pes="negreta" to="secundari">{contenidor.quantitatReservada}</Text>
        <Text  to="secundari">unitats reservades</Text>

        </HVista>

      </Vista>
      <Vista
        style={{ flex: 0, marginBottom: MIDES.xxxLarge }}
        justify="flex-end"
      >
        <HVista
          align="center"
          justify="center"
          gap={10}
          style={{ opacity: 0.4 }}
        >
          <Icona type={IconType.AntDesign} name="infocirlceo" size={16} />

          <Text>Aquest canvi quedarà registrat</Text>
        </HVista>
        <BotoFlotant
          color={COLORS.inventari}
          disabled={!valorModificat}
          onPress={() => onModificarEstoc()}
        >
          <Text color={COLORS.blanc}>Modificar Estoc</Text>
        </BotoFlotant>
      </Vista>
    </Vista>
  );
};

export default ModificarQuantitatInventariModal;
