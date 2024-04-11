import { enumTipusOrdre } from "@/models/Ordre";
import React from "react";
import { Text } from "../base/ThemedText";
import { useTema } from "@/context/TemaProvider";

type TipusOrdreTagProps = {
  tipus: enumTipusOrdre;
};

const TipusOrdreTag = ({ tipus }: TipusOrdreTagProps) => {
  const { COLORS } = useTema();

  var color: string = "black";
  var elTexte: string = "";
  switch (tipus) {
    case enumTipusOrdre.EntradaProducte:
      color = COLORS.entradaProducte;
      elTexte = "Entrada";
      break;
    case enumTipusOrdre.SortidaProducte:
      color = COLORS.sortidaProducte;
      elTexte = "Sortida";
      break;
    case enumTipusOrdre.Inventari:
      color = COLORS.inventari;
      elTexte = "Inventari";
      break;
    default:
      break;
  }

  return <Text style={{ color: color, fontWeight:"bold" }}>{elTexte}</Text>;
};

export default TipusOrdreTag;
