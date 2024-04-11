import { HVista, Vista } from "@/components/base/ThemedView";
import React from "react";
import { Text } from "@/components/base/ThemedText";
import { useTema } from "@/context/TemaProvider";

const EdicioTecnicaPage = () => {
  const { MIDES } = useTema();
  return (
    <Vista style={{ flex: 1 }} gap={20}>
      <HVista
        align="baseline"
        justify="center"
        style={{ marginVertical: MIDES.medium, marginBottom: MIDES.mini }}
      >
        <Text style={{ fontWeight: "bold", fontSize: MIDES.xLarge }}>
          Edició tècnica
        </Text>
      </HVista>
      <Vista gap={30} style={{marginHorizontal:MIDES.xxSmall}}>
        <Text>Editar ubicació</Text>
        <Text>Forçar recollida</Text>
        <Text>Editar ordre</Text>
      </Vista>
    </Vista>
  );
};

export default EdicioTecnicaPage;
