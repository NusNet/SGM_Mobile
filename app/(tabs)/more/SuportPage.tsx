import { HVista, Vista } from "@/components/base/ThemedView";
import { useTema } from "@/context/TemaProvider";
import { Text } from "@/components/base/ThemedText";
import React from "react";
import { Targeta } from "@/components/base/ThemedTargeta";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import { Boto, BotoOpcions, Pressionable } from "@/components/base/ThemedPress";
import { Linking } from "react-native";

interface Tavileru {
  nom: string;
  telefon: string;
  professio: string;
  colorProfessio: string;
  correu: string;
}

const SuportPage = () => {
  const { esFosc, COLORS, MIDES } = useTema();
  const Tavilerus: Tavileru[] = [
    {
      nom: "Josep Ripoll",
      professio: "Hardware",
      colorProfessio: COLORS.alerta,
      correu: "josepripoll@tavil.net",
      telefon: "+34 697 83 28 10",
    },
    {
      nom: "Lluc Domènech",
      professio: "Software",
      colorProfessio: COLORS.link,
      correu: "llucdomenech@tavil.net",
      telefon: "+34 663 49 33 48",
    },
    {
      nom: "Miquel Cerezo",
      professio: "Software",
      colorProfessio: COLORS.link,
      correu: "miquelcerezo@tavil.net",
      telefon: "+34 687 02 91 06",
    },
    {
      nom: "Zenón Rossell",
      professio: "IoT",
      colorProfessio: COLORS.error,
      correu: "zenonrossell@tavil.net",
      telefon: "+34 667 61 93 84",
    },
  ];
  return (
    <Vista style={{ marginHorizontal: MIDES.xxSmall }}>
      <HVista
        align="baseline"
        justify="center"
        style={{ marginVertical: MIDES.medium, marginBottom: MIDES.huge }}
      >
        <Text style={{ fontWeight: "bold", fontSize: MIDES.xLarge }}>
          Tècnics de suport
        </Text>
      </HVista>

      <Vista gap={30}>
        {Tavilerus.map((tavileru, index) => (
          <Targeta key={tavileru.nom}>
            <Pressionable
              onPress={async () => {
                console.log(tavileru.telefon.trim());
                Linking.openURL(`tel:${tavileru.telefon.trim()}`);
              }}
            >
              <HVista gap={20} align="center">
                <Vista gap={7} style={{ flex: 1 }}>
                  <HVista style={{ marginBottom: 10 }} gap={30} align="center">
                    <Text mida={MIDES.large}>{tavileru.nom}</Text>
                    <Text
                      to="secundari"
                      mida={MIDES.small}
                      style={{ fontStyle: "italic" }}
                      color={tavileru.colorProfessio}
                    >
                      {tavileru.professio}
                    </Text>
                  </HVista>
                  <HVista gap={15} align="center">
                    <Icona type={IconType.FontAweomseIcon} name={"whatsapp"} />
                    <Text mida={MIDES.small} color={COLORS.gris[400]}>
                      {tavileru.telefon}
                    </Text>
                  </HVista>
                  <HVista gap={15} align="center">
                    <Icona
                      type={IconType.MaterialCommunityIcons}
                      name={"email-outline"}
                    />
                    <Text mida={MIDES.small} color={COLORS.gris[400]}>
                      {tavileru.correu}
                    </Text>
                  </HVista>
                </Vista>
                <Vista align="center">
                  <Icona
                    type={IconType.MatetrialIcon}
                    name={"support-agent"}
                    size={65}
                    color={COLORS.gris[400]}
                  />
                  <Text to="secundari">Trucar</Text>
                </Vista>
              </HVista>
            </Pressionable>
          </Targeta>
        ))}
      </Vista>
    </Vista>
  );
};

export default SuportPage;
