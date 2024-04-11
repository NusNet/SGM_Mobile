import React from "react";
import { Targeta } from "../base/ThemedTargeta";
import { HVista, Vista } from "../base/ThemedView";
import TipusOrdreTag from "../ordre/TipusOrdreTag";
import { Text } from "../base/ThemedText";
import { Ordre, OrdreComplet, enumTipusOrdre } from "@/models/Ordre";
import { useTema } from "@/context/TemaProvider";
import EstatOrdreTag, { modeEstatOrdreTag } from "../ordre/EstatOrdreTag";

type OrdreTargetaProps = {
  ordre: Ordre | OrdreComplet;
};
const OrdreTargeta = ({ ordre }: OrdreTargetaProps) => {
  const { COLORS, MIDES } = useTema();

  return (
    <Targeta style={{marginHorizontal:MIDES.xSmall}}>
      <Vista gap={5}>
        <HVista gap={6}>
          <Text mida={MIDES.large} style={{ color: COLORS.gris[200] }}>
            Ordre
          </Text>
          <Text mida={MIDES.large} pes="negreta">
            {ordre.idComanda}
          </Text>
        </HVista>
        <HVista justify="space-between" align="center">
          <TipusOrdreTag tipus={ordre.tipus} />
          <EstatOrdreTag estat={ordre.estat} mode={modeEstatOrdreTag.TextIcona} />
        </HVista>
      </Vista>
    </Targeta>
  );
};

export default OrdreTargeta;
