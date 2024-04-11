import { Targeta } from "@/components/base/ThemedTargeta";
import { HVista, Vista } from "@/components/base/ThemedView";
import { Ordre } from "@/models/Ordre";
import React from "react";
import { DataText, Text } from "@/components/base/ThemedText";
import EstatOrdreTag from "@/components/ordre/EstatOrdreTag";
import { useTema } from "@/context/TemaProvider";

const TargetaOrdreLlista = ({ ordre }: { ordre: Ordre }) => {
  const { COLORS, MIDES } = useTema();
  return (
    // <Targeta>
    <Vista gap={5} style={{ padding: 18, paddingHorizontal: 15 }}>
      <HVista justify="space-between">
        <HVista gap={10}>
          <Text>{ordre.idComanda}</Text>
          <Text to="secundari" style={{ fontStyle: "italic" }}>
            {ordre.idOrdre}
          </Text>
        </HVista>
        <EstatOrdreTag estat={ordre.estat} />
      </HVista>
      <HVista justify="space-between">
        <DataText to="secundari" mida={MIDES.xSmall}>
          {ordre.data}
        </DataText>
        <HVista align="center" gap={5}>
          <Text color={COLORS.gris[600]} mida={MIDES.xSmall}>
            Inici{" "}
          </Text>
          <DataText to="secundari" mida={MIDES.xSmall} format="HH:mm">
            {ordre.dataInici}
          </DataText>
        </HVista>
        <HVista align="center" gap={5}>
          <Text color={COLORS.gris[600]} mida={MIDES.xSmall}>
            Fi{" "}
          </Text>
          <DataText to="secundari" mida={MIDES.xSmall} format="HH:mm">
            {ordre.dataFi}
          </DataText>
        </HVista>
      </HVista>
    </Vista>

    // </Targeta>
  );
};

export default TargetaOrdreLlista;
