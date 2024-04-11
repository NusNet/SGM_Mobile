import React, { useState } from "react";
import { HVista, Vista } from "../base/ThemedView";
import { Text } from "../base/ThemedText";
import { BotoFlotant,  } from "../base/ThemedPress";
import { useTema } from "@/context/TemaProvider";
import { Accio } from "@/models/Accio";
import { Keyboard, TextInput } from "react-native";
import RadioButtons from "../generic/RadioButtons";
import { PutEditarQuantitatAccio } from "@/accessos/OrdreAcces";
import { AccioProducteModQuantitat, enumTipusCanviQuantitat } from "@/models/DTOs/AccioProducteModQuantitat";
import { IconType, Icona } from "../base/ThemedIcon";


type ModificarQuantitatProps = {
  accio: Accio;
  onRequestCloseModal: ()=>void
};
const ModificarQuantitatModal = ({ accio, onRequestCloseModal }: ModificarQuantitatProps) => {
  const { COLORS, MIDES } = useTema();

  const [valorModificat, setValorModificat] = useState<string | undefined>();

  const [tipusCanvi, settipusCanvi] = useState<enumTipusCanviQuantitat>(enumTipusCanviQuantitat.Voluntari);

  const onModificarAccio = async () => {
    try {
      if(valorModificat ){
        var dto : AccioProducteModQuantitat ={
          IdAccio: accio.id,
          IdEstacio: "EM1",
          VellaQuantitat: accio.quantitatEfectuada,
          NovaQuantitat: Number.parseInt(valorModificat),
          TipusCanvi: tipusCanvi
        }

        await PutEditarQuantitatAccio(dto);
        accio.quantitatEfectuada = Number.parseInt(valorModificat)
        Keyboard?.dismiss();
        onRequestCloseModal()
      }
    } catch (err) {
      console.log("ERROR put entrar gaveta", err);
    }
  };

  return (
    <Vista style={{ flex: 1 }}>
      <Vista justify="center" align="center">
        <Text color={COLORS.alerta} style={{ marginBottom: MIDES.large }}>
          Modificar la quantitat
        </Text>

        <Text style={{ fontWeight: "bold", fontSize: MIDES.large }}>
          {accio.producte.referencia}
        </Text>
        <Text
          numberOfLines={2}
          style={{ color: COLORS.gris[500], textAlign: "center" }}
        >
          {accio.producte.nom}
        </Text>
      </Vista>
      <HVista
        style={{ marginHorizontal: MIDES.medium, flex: 1 }}
        align="center"
        justify="center"
        gap={MIDES.xLarge}
      >
        <Text style={{ fontSize: MIDES.huge }}>{accio.quantitatEfectuada}</Text>
        <Icona
          type={IconType.MatetrialIcon}
          name="keyboard-double-arrow-right"
        />
        <TextInput
          style={{
            borderWidth: 2,
            borderRadius: 5,
            borderColor: COLORS.alerta,
            paddingHorizontal: 15,
            paddingVertical: 5,
            fontSize: MIDES.huge,
            color:COLORS.text,
            minWidth: 70,
          }}          
          onChangeText={(text) => setValorModificat(text)}
          value={valorModificat}
          cursorColor={COLORS.gris[700]}
          keyboardType="numeric"
        ></TextInput>
      </HVista>
      <HVista justify="center" align="center" style={{ flex: 1 }}>
        <RadioButtons
          opcions={[{ text: "Voluntari" }, { text: "Quantitat" }]}
          defaultSelected={0}
          required
          gap={[10, 10]}
          selectedChanged={(seleccionat: string | null) =>{
            settipusCanvi(
              seleccionat === "Voluntari"
              ? enumTipusCanviQuantitat.Voluntari
              : enumTipusCanviQuantitat.DiferenciaEstoc
              )
            }
          }
          ItemRender={(text, selected) => (
            <Vista
              style={{
                borderWidth: 1.5,
                borderColor: selected ? COLORS.alerta : COLORS.gris[500],
                padding: 5,
                paddingHorizontal: MIDES.large,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: selected ? COLORS.alerta : COLORS.text }}>
                {text}
              </Text>
            </Vista>
          )}
        />
      </HVista>
      <Vista
        style={{ flex: 1, marginBottom: MIDES.xxxLarge }}
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
          color={COLORS.alerta}
          disabled={!valorModificat }
          onPress={() => onModificarAccio()}
        >
          <Text>Modificar</Text>

        </BotoFlotant>
      </Vista>
    </Vista>
  );
};

export default ModificarQuantitatModal;
