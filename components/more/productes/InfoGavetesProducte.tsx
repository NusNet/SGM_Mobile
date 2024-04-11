import React from "react";
import { HVista, Vista } from "@/components/base/ThemedView";
import { Text } from "@/components/base/ThemedText";
import { useTema } from "@/context/TemaProvider";
import { Producte } from "@/models/Producte";
import { GetInformacioProducte } from "@/accessos/ProducteAcces";
import Carregant from "@/components/generic/Carregant";
import { Targeta } from "@/components/base/ThemedTargeta";
import { ScrollView } from "react-native";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import {
  enumEstatGaveta,
  enumEstatUbicacio,
} from "@/models/DTOs/InformacioProducte";
import EstatUbicacioTag from "./EstatUbicacioTag";
import EstatGavetaTag from "./EstatGavetaTag";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const GavetesProducte = ({ producte }: { producte: Producte }) => {
  const { COLORS, MIDES } = useTema();

  const { informacioProducte, isLoadingInformacioProducte } =
    GetInformacioProducte(producte.referencia);
  return (
    <Vista style={{ marginHorizontal: MIDES.xxxSmall, flex: 1 }} gap={20}>
      <Vista justify="center" align="center">
        <Text style={{ fontWeight: "bold", fontSize: MIDES.large }}>
          {producte.referencia}
        </Text>
        <Text
          numberOfLines={2}
          style={{ color: COLORS.gris[500], textAlign: "center" }}
        >
          {producte.nom}
        </Text>
      </Vista>
      {isLoadingInformacioProducte ? (
        <Carregant />
      ) : (
        <Vista style={{ flex: 1, marginBottom: 10, }}>
          <BottomSheetScrollView showsVerticalScrollIndicator={false} >
            {informacioProducte?.gavetesProducte.map((ubicacio) => (
              <HVista
                key={ubicacio.idUbicacio}
                justify="space-between"
                align="stretch"
                style={{
                  borderColor: COLORS.gris[600],
                  marginVertical: MIDES.xSmall,
                  borderWidth: 1,
                  borderRadius: 6,
                  padding: MIDES.large,
                }}
              >
                {/* INFORMACIO GAVETA */}
                <Vista justify="center">
                  <Text mida={MIDES.small} to="secundari">
                    {ubicacio.idGaveta}
                  </Text>
                  <HVista align="center" gap={10}>
                    <Icona
                      type={IconType.FontAweomseIcon}
                      name={"inbox"}
                      color={COLORS.gris[300]}
                      size={40}
                    />
                    <Vista>
                      <Text mida={MIDES.xSmall}>Estandard</Text>
                      <EstatGavetaTag
                        estat={ubicacio.estatGaveta}
                        midaText={MIDES.small}
                      />
                    </Vista>
                  </HVista>
                </Vista>
                {/* UNITATS */}
                <Vista align="center" justify="center">
                  <Text pes="negreta" color={COLORS.primari75}>
                    Unitats
                  </Text>
                  <Text
                    mida={MIDES.xLarge}
                    pes="negreta"
                    color={COLORS.primari}
                  >
                    {ubicacio.quantitatProducte}
                  </Text>
                </Vista>
                {/* INFORMACIO UBICACIO */}
                <HVista
                  justify="center"
                  align="center"
                  style={{
                    backgroundColor: COLORS.gris[800],
                    margin: -MIDES.large,
                    paddingHorizontal: MIDES.xLarge,
                  }}
                >
                  <Vista align="flex-start" justify="center" gap={5}>
                    <HVista align="center" gap={10}>
                      <Icona
                        type={IconType.Entypo}
                        name={"location"}
                        color={COLORS.gris[300]}
                        size={28}
                      />
                      <Vista>
                        <EstatUbicacioTag
                          midaText={MIDES.small}
                          estat={ubicacio.estat}
                        />

                        <Text color={COLORS.gris[300]} mida={MIDES.small}>
                          Rack {ubicacio.idPrestatgeria}
                        </Text>
                      </Vista>
                    </HVista>
                    <HVista align="center" gap={10}>
                      <HVista
                        align="center"
                        style={{ width: 30 }}
                        justify="center"
                      >
                        <Vista
                          style={{
                            height: 22,
                            width: 3,
                            marginLeft: 10,
                            backgroundColor: COLORS.primari75,
                          }}
                        />
                        <Vista
                          style={{
                            height: 3,
                            width: 22,
                            marginTop: 7,
                            marginLeft: -10,
                            backgroundColor: COLORS.primari75,
                          }}
                        />
                      </HVista>
                      <Text>
                        {ubicacio.columna} | {ubicacio.fila}
                      </Text>
                    </HVista>
                  </Vista>
                </HVista>
              </HVista>
            ))}
          </BottomSheetScrollView>
        </Vista>
      )}
    </Vista>
  );
};

export default GavetesProducte;
