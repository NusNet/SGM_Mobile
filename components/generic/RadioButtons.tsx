import React, { useState } from "react";
import {
  LayoutChangeEvent,
  PressableProps,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { FlexJustifyType, HVista, Vista, VistaProps } from "../base/ThemedView";
import { IconaProp } from "../base/ThemedIcon";

export type RadioButtonOpcio = {
  text: string;
  icona?: IconaProp;
};
type RadioButtonItem = {
  id: string;
  nom: string;
  icona?: IconaProp;
  selected: boolean;
};
type RadioButtonsProps = {
  opcions: RadioButtonOpcio[];
  defaultSelected?: number;
  required?: boolean;
  selectedChanged: (seleccionat: string | null) => void;
  ItemRender: (
    text: string,
    selected: boolean,
    icona?: IconaProp
  ) => React.ReactNode;
  SeparatorRender?: React.ReactNode;
  vertical?: boolean;
  gap?: [number, number];
  justify?:FlexJustifyType
};

const RadioButtons = ({
  opcions,
  defaultSelected,
  required = false,
  selectedChanged,
  ItemRender,
  SeparatorRender,
  vertical,
  gap,
  justify
}: RadioButtonsProps) => {
  const [llistaRB, setLlistaRB] = useState<RadioButtonItem[]>(
    opcions.map((opcio: RadioButtonOpcio, index) => {
      return {
        id: opcio.text,
        nom: opcio.text,
        selected: index === defaultSelected ? true : false,
        icona: opcio.icona,
      };
    })
  );
  const onRadioBtnClick = (item: RadioButtonItem) => {
    let updatedState = llistaRB.map((RBItem) =>
      RBItem.id === item.id
        ? { ...RBItem, selected: required ? true : !RBItem.selected }
        : { ...RBItem, selected: false }
    );
    setLlistaRB(updatedState);

    var valorSel = required? item.nom: item.selected ? null : item.nom;
    selectedChanged(valorSel);
  };

  return (
    <View
      style={{
        flexDirection: vertical ? "column" : "row",
        flexWrap: "wrap",
        columnGap: gap ? gap[0] : 0,
        rowGap: gap ? gap[1] : 0,
        justifyContent: justify
      }}
    >
      {llistaRB &&
        llistaRB.map((item, index) => (
          <View
            key={index}
            style={{ flexDirection: vertical ? "column" : "row" }}
          >
            <TouchableOpacity
              onPress={() => onRadioBtnClick(item)}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {ItemRender(item.nom, item.selected, item.icona)}
            </TouchableOpacity>
            {index !== llistaRB.length - 1 && SeparatorRender}
          </View>
        ))}
    </View>
  );
};

export default RadioButtons;
