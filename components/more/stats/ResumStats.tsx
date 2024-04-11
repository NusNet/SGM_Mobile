import { GetUbicacionsResum } from "@/accessos/MagatzemAcces";
import { GetOrdresResum } from "@/accessos/OrdreAcces";
import { GetProductesResum } from "@/accessos/ProducteAcces";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import { Targeta } from "@/components/base/ThemedTargeta";
import { Text } from "@/components/base/ThemedText";
import { HVista, Vista } from "@/components/base/ThemedView";
import Carregant from "@/components/generic/Carregant";
import { ErrorIcona } from "@/components/generic/Error";
import { useTema } from "@/context/TemaProvider";
import moment from "moment";
import React from "react";
const ResumStats = () => {
  const { COLORS, MIDES } = useTema();

  const { resumProductes, isLoadingResumProductes, errorResumProductes } =
    GetProductesResum();
  const { resumUbicacions, isLoadingResumUbicacions, errorResumUbicacions } =
    GetUbicacionsResum();
  const { resumOrdres, isLoadingResumOrdres, errorResumOrdres } =
    GetOrdresResum();

  return (
    <Vista gap={15}>
      <HVista gap={15}>
        {/* OCUPACIÓ */}
        <Targeta style={{ flex: 1 }}>
          {isLoadingResumUbicacions ? (
            <Carregant padding={10} centrat />
          ) : errorResumUbicacions ? (
            <ErrorIcona
              icona={{
                name: "signal-wifi-bad",
                type: IconType.MatetrialIcon,
                size: 20,
              }}
            />
          ) : (
            <Vista gap={10} align="stretch" justify="space-between">
              <Text pes="negreta" color={COLORS.primari}>
                OCUPACIÓ
              </Text>
              <HVista justify="space-between" align="center">
                <HVista align="baseline" justify="center">
                  <Text mida={34} pes="negreta" to="secundari">
                    {(resumUbicacions?.ocupacio ?? 0) * 100}
                  </Text>
                  <Text mida={22} pes="negreta" to="secundari">
                    %
                  </Text>
                </HVista>
                <Vista justify="flex-start" align="flex-end">
                  <HVista gap={4} align="center">
                    <Text mida={13}>{resumUbicacions?.numTotalGavetes}</Text>
                    <Icona
                      type={IconType.FontAweomseIcon}
                      name={"inbox"}
                      color={COLORS.gris[400]}
                      size={15}
                    />
                  </HVista>

                  <Text mida={13} color={COLORS.exit}>
                    {resumUbicacions?.numGavetesBuides} buides
                  </Text>
                </Vista>
              </HVista>
            </Vista>
          )}
        </Targeta>
        {/* PRODUCTES */}
        <Targeta style={{ flex: 1 }}>
          {isLoadingResumProductes ? (
            <Carregant padding={10} centrat />
          ) : errorResumProductes ? (
            <ErrorIcona
              icona={{
                name: "signal-wifi-bad",
                type: IconType.MatetrialIcon,
                size: 20,
              }}
            />
          ) : (
            <Vista
              gap={10}
              style={{ flex: 1 }}
              align="stretch"
              justify="space-between"
            >
              <Text pes="negreta" color={COLORS.primari}>
                PRODUCTES
              </Text>
              <HVista justify="space-between" align="baseline">
                <HVista align="baseline" justify="center">
                  <Text mida={34} pes="negreta" to="secundari">
                    {resumProductes?.quantitatProductesEnEstoc}
                  </Text>                
                </HVista>
                <Text mida={12}>{resumProductes?.totalUnitats} u</Text>
              </HVista>
            </Vista>
          )}
        </Targeta>
      </HVista>
      <Targeta>
        {isLoadingResumOrdres ? (
          <Carregant padding={10} centrat />
        ) : errorResumOrdres ? (
          <ErrorIcona
            icona={{
              name: "signal-wifi-bad",
              type: IconType.MatetrialIcon,
              size: 20,
            }}
          />
        ) : (
          <HVista align="center">
            <Vista gap={10} align="stretch" style={{ flex: 1 }}>
              <Text pes="negreta" color={COLORS.primari}>
                ORDRES
              </Text>
              <HVista align="baseline">
                <HVista style={{ flex: 1 }} gap={18} align="center">
                  <Text mida={MIDES.small}>{moment().format("MMMM YYYY")}</Text>
                  <HVista gap={5}>
                    <Text color={COLORS.sortidaProducte}>
                      {resumOrdres?.numOrdresSortidaMes}
                    </Text>
                    <Text>|</Text>
                    <Text color={COLORS.entradaProducte}>
                      {resumOrdres?.numOrdresEntradaMes}
                    </Text>
                    <Text>|</Text>
                    <Text color={COLORS.inventari}>
                      {resumOrdres?.numOrdresInventariMes}
                    </Text>
                  </HVista>
                </HVista>
                <HVista align="baseline" gap={5}>
                  <Text to="secundari" pes="negreta" mida={26}>
                    {resumOrdres?.totalOrdresExecutades}
                  </Text>
                  <Text to="secundari" pes="negreta" mida={16}>
                    total
                  </Text>
                </HVista>
              </HVista>
            </Vista>
          </HVista>
        )}
      </Targeta>
    </Vista>
  );
};

export default ResumStats;
