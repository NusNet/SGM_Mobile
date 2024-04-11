import { useTema } from "@/context/TemaProvider";
import { enumEstatOrdre } from "@/models/Ordre";
import React from "react";
import { Text } from "../base/ThemedText";
import { HVista, Vista } from "../base/ThemedView";
import { IconType, Icona, IconaProp } from "../base/ThemedIcon";
import { enumEstatPas } from "@/models/PasGaveta";

export enum modeEstatOrdreTag {
  Text,
  Icona,
  TextIcona,
}

type EstatPasTagProps = {
  estat: enumEstatPas;
  mode?: modeEstatOrdreTag;
  midaIcona?: number;
};
const EstatPasTag = ({
  estat,
  mode = modeEstatOrdreTag.Text,
  midaIcona,
}: EstatPasTagProps) => {
  const { COLORS, MIDES } = useTema();
  var color: string = "black";
  var colorBG: string = "";

  var icona: IconaProp = { type: IconType.MatetrialIcon, name: "dangerous" };

  switch (estat) {
    case enumEstatPas.Pendent:
      color = COLORS.alerta;
      colorBG = COLORS.alerta25;
      icona = { type: IconType.Feather, name: "play", size: midaIcona };
      break;
    case enumEstatPas.EnProces:
      color = COLORS.link;
      colorBG = COLORS.link25;
      icona = {
        type: IconType.MaterialCommunityIcons,
        name: "dots-horizontal",
        size: midaIcona,
      };

      break;
    case enumEstatPas.Finalitzant:
      color = COLORS.alertaGroc;
      colorBG = COLORS.alertaGroc25;
      icona = { type: IconType.Entypo, name: "check", size: midaIcona };

      break;
    case enumEstatPas.Finalitzat:
      color = COLORS.exit;
      colorBG = COLORS.exit25;
      icona = { type: IconType.Entypo, name: "check", size: midaIcona };

      break;
    case enumEstatPas.Cancellat:
      color = COLORS.gris[400];
      colorBG = COLORS.gris[700];
      icona = { type: IconType.Entypo, name: "cross", size: midaIcona };

      break;
    case enumEstatPas.Error:
      color = COLORS.error;
      colorBG = COLORS.error25;
      icona = {
        type: IconType.FontAweomseIcon,
        name: "exclamation",
        size: midaIcona,
      };

      break;
    default:
      break;
  }

  if (mode == modeEstatOrdreTag.Text) {
    return (
      <HVista
        style={{
          borderWidth: 1,
          borderColor: color,
          borderRadius: 5,
          paddingVertical: 2,
          paddingHorizontal: 2,
          backgroundColor: colorBG,
        }}
      >
        {/* <Icona type={IconType.MaterialCommunityIcons} name={"dots-horizontal"} color={color}/> */}
        <Text
          style={{ color: color, fontSize: MIDES.small, paddingHorizontal: 5 }}
        >
          {enumEstatPas[estat]}
        </Text>
      </HVista>
    );
  } else if (mode == modeEstatOrdreTag.TextIcona) {
    return (
      <HVista
      style={{
        borderWidth: 1,
        borderColor: color,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: colorBG,
      }} align="center" justify="center" gap={5}
      >
          <Icona
            type={icona.type}
            name={icona.name}
            color={color}
            size={icona.size}
          />
        <Text
          style={{ color: color, fontSize: MIDES.small,}}
        >
          {enumEstatPas[estat]}
        </Text>
      </HVista>
    );
  } else if (mode == modeEstatOrdreTag.Icona) {
    return (
      <HVista
        style={{
          paddingVertical: 2,
          paddingHorizontal: 2,
        }}
      >
        <Icona
          type={icona.type}
          name={icona.name}
          color={color}
          size={icona.size}
        />
      </HVista>
    );
  }
};

export default EstatPasTag;
