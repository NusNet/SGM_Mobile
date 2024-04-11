import { IconType, Icona } from "@/components/base/ThemedIcon";
import { Targeta } from "@/components/base/ThemedTargeta";
import { HVista, Separador, Vista } from "@/components/base/ThemedView";
import EstatPasTag, { modeEstatOrdreTag } from "@/components/ordre/EstatPasTag";
import { useTema } from "@/context/TemaProvider";
import { PasGaveta } from "@/models/PasGaveta";
import React from "react";
import { Text } from "@/components/base/ThemedText";
import { enumTipusAccio } from "@/models/Accio";

const TargetaPasOrdreInfo = ({ item }: { item: PasGaveta }) => {
  const { COLORS, MIDES } = useTema();

  return (
    <Targeta>
      <Vista gap={10}>
        <Vista align="center" gap={5}>
          <EstatPasTag estat={item.estat} />
          <HVista align="center" gap={10}>
            <Icona
              type={IconType.FontAweomseIcon}
              name={"inbox"}
              color={COLORS.gris[300]}
              size={25}
            />
            <Text mida={MIDES.small} color={COLORS.gris[300]}>
              {item.contenidor?.id}
            </Text>
          </HVista>
        </Vista>
        <Separador percentOcupacio="100%" />
        <Vista gap={10}>
          <Text pes="negreta" to="secundari">
            Accions
          </Text>
          {item.accions.map((item, index) => (
            <HVista align="center"  key={item.id} gap={10}>
              <EstatPasTag estat={item.estat} mode={modeEstatOrdreTag.Icona} midaIcona={MIDES.xxLarge}/>
              <Vista gap={5}>
                <HVista align="center" gap={10}>                 
                  <Icona
                    type={item.tipus === enumTipusAccio.Recompte ? IconType.MaterialCommunityIcons: IconType.Entypo}
                    name={
                        item.tipus === enumTipusAccio.Recompte ? "clipboard-edit-outline":
                      item.tipus === enumTipusAccio.IntroduirProducte
                        ? "download"
                        : "upload"
                    }
                    color={
                      item.tipus === enumTipusAccio.Recompte ? COLORS.inventari:
                      item.tipus === enumTipusAccio.IntroduirProducte
                        ? COLORS.entradaProducte
                        : COLORS.sortidaProducte
                    }
                    size={23}
                  />
                  {item.quantitat === item.quantitatEfectuada ? (
                    <Text pes="negreta" mida={MIDES.large}>{item.quantitatEfectuada}</Text>
                  ) : (
                    <HVista align="center" gap={2}>
                      <Text style={{textDecorationLine:"none"}} color={COLORS.gris[500]}>{item.quantitat}</Text>
                      <Icona  type={IconType.Ionicon} name={"arrow-forward-sharp"} color={COLORS.gris[500]} size={MIDES.small}/>
                      <Text pes="negreta" mida={MIDES.large}>{item.quantitatEfectuada}</Text>
                    </HVista>
                  )}
                </HVista>
                <Text to="secundari" mida={MIDES.small}>
                  {item.producte.referencia}
                </Text>
              </Vista>
            </HVista>
          ))}
        </Vista>
      </Vista>
    </Targeta>
  );
};

export default TargetaPasOrdreInfo;
