import { HVista, Separador, Vista } from "@/components/base/ThemedView";
import { useTema } from "@/context/TemaProvider";
import { Text } from "@/components/base/ThemedText";
import React, { useEffect, useState } from "react";
import { Targeta } from "@/components/base/ThemedTargeta";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import { Boto, BotoOpcions, Pressionable } from "@/components/base/ThemedPress";
import { Linking, Switch } from "react-native";

const ConfiguracioPage = () => {
  const { esFosc, COLORS, MIDES, setTema } = useTema();
  const [isFosc, setIsEnabled] = useState(esFosc);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    setTema(isFosc ? "fosc" : "clar");
  }, [isFosc]);

  return (
    <Vista style={{ marginHorizontal: MIDES.xxSmall }}>
      <HVista
        align="baseline"
        justify="center"
        style={{ marginVertical: MIDES.medium, marginBottom: 100 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: MIDES.xLarge }}>
          Configuració
        </Text>
      </HVista>

      <Vista gap={30} style={{ marginHorizontal: MIDES.small }}>
        <Separador marge={0} percentOcupacio="100%" />

        <HVista justify="space-between">
          <Text>Estació principal</Text>
          <Text pes="negreta" mida={MIDES.large}>EM1</Text>
        </HVista>
        <Separador marge={0} percentOcupacio="100%" />
        <HVista justify="space-between">
          <Text>Tema</Text>
          <Switch
            trackColor={{ false: COLORS.primari50, true: COLORS.gris[300] }}
            thumbColor={isFosc ? COLORS.blanc : COLORS.primari}
            ios_backgroundColor={COLORS.fonsBase}
            onValueChange={toggleSwitch}
            value={isFosc}
            style={{}}
          />
        </HVista>
        <Separador marge={0} percentOcupacio="100%" />
      </Vista>
    </Vista>
  );
};

export default ConfiguracioPage;
