import { useEstacioContext } from "@/context/EstacioContext";
import { useTema } from "@/context/TemaProvider";
import { Accio } from "@/models/Accio";
import { Contenidor } from "@/models/Contenidor";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { IconType, Icona } from "../base/ThemedIcon";
import { BotoFlotant } from "../base/ThemedPress";
import { Targeta } from "../base/ThemedTargeta";
import { Text } from "../base/ThemedText";
import { HVista, Separador, Vista } from "../base/ThemedView";
import { Cobertura } from "../generic/Cobertura";
import CustomBackdrop from "../generic/CustomBackdrop";
import ModificarQuantitatInventariModal from "./ModificarQuantitatInventariModal";
import CustomBottomSheetModal from "../generic/CustomBottomSheetModal";

export type AccioInventariTargetaProps = {
  accio: Accio;
  contenidor: Contenidor;
  onRequestEntrarGaveta: (idGaveta: string) => void;
};

const AccioInventariTargeta = ({
  accio,
  contenidor,
  onRequestEntrarGaveta,
}: AccioInventariTargetaProps) => {
  const { COLORS, MIDES } = useTema();
  const { IdLectura } = useEstacioContext();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  return (
    <Vista>
      <Targeta>
        <Vista gap={MIDES.xxSmall}>
          {/* PRODUCTE */}
          <Vista justify="center" align="center">
            <Text style={{ fontWeight: "bold", fontSize: MIDES.large }}>
              {contenidor.producte.referencia}
            </Text>
            <Text
              numberOfLines={2}
              style={{ color: COLORS.gris[500], textAlign: "center" }}
            >
              {contenidor.producte.nom}
            </Text>
          </Vista>
          {/* QUANTITAT */}
          <Vista justify="center" align="center" gap={10}>
            <HVista gap={40}>
              <Text
                pes="negreta"
                color={COLORS.entradaProducte}
                mida={MIDES.huge * 1.5}
              >
                {contenidor.quantitatReservada}
              </Text>
              <Text pes="negreta" mida={MIDES.huge * 1.5}>
                {contenidor.quantitatDisponible}
              </Text>
              <Text
                pes="negreta"
                color={COLORS.sortidaProducte}
                mida={MIDES.huge * 1.5}
              >
                {contenidor.quantitatEnUs}
              </Text>
            </HVista>
            <HVista gap={20} style={{ marginTop: -19 }}>
              <Text to="secundari">reservades</Text>
              <Text to="secundari">disponibles</Text>
              <Text to="secundari">espai en ús</Text>
            </HVista>
            <HVista align="baseline" gap={5}>
              <Text>Màxima:</Text>
              <Text pes="negreta">{contenidor.producte.quantitatMaxima}</Text>
              <Text>unitats</Text>
            </HVista>
          </Vista>
          {/* BOTO */}
          <HVista align="center" justify="space-between">
            <BotoFlotant
              color={COLORS.fonsTargeta}
              style={{ borderColor: COLORS.inventari, borderWidth: 1 }}
              onPress={() => handlePresentModalPress()}
            >
              <HVista align="center" gap={6}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: COLORS.inventari,
                    fontSize: MIDES.xLarge,
                  }}
                >
                  Editar
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: COLORS.gris[500],
                    fontSize: MIDES.xLarge,
                  }}
                >
                  unitats
                </Text>
              </HVista>
            </BotoFlotant>
            <BotoFlotant
              color={COLORS.fonsTargeta}
              style={{ borderColor: COLORS.inventari, borderWidth: 1 }}
              onPress={() => onRequestEntrarGaveta(contenidor.id)}
            >
              <HVista align="center">
                <Icona type={IconType.Ionicon} name={"arrow-redo"} size={18} />
                <Vista style={{ transform: [{ scaleX: -1 }] }}>
                  <Icona
                    type={IconType.MaterialCommunityIcons}
                    name={"warehouse"}
                    size={26}
                  />
                </Vista>
              </HVista>
            </BotoFlotant>
          </HVista>

          {/* INFORMACIÓ */}
          <Separador marge={MIDES.mini} />
          <HVista align="center" gap={7} justify="center">
            <Icona
              type={IconType.FontAweomseIcon}
              name={"inbox"}
              color={COLORS.text}
              size={24}
            />
            <Icona
              type={IconType.MaterialCommunityIcons}
              name={"clipboard-edit-outline"}
              color={COLORS.inventari}
              size={24}
            />

            <Icona
              type={IconType.MaterialCommunityIcons}
              name={"human-greeting"}
              color={COLORS.text}
              size={24}
            />
          </HVista>
        </Vista>
      </Targeta>
      {/* COBERTURA */}
      {IdLectura !== contenidor.id && (
        <Cobertura colorFons={COLORS.fonsBase} opacitat={0.9}>
          <Text style={{ fontWeight: "bold" }} to="secundari">
            Espera a que la gaveta
          </Text>
          <Text style={{ fontWeight: "bold" }} to="secundari">
            arribi a l'estació
          </Text>
        </Cobertura>
      )}

      <CustomBottomSheetModal
        innerRef={bottomSheetModalRef}
        onRequestDismiss={() => handleDismissModalPress()}
      >
        <ModificarQuantitatInventariModal
          contenidor={contenidor}
          onRequestCloseModal={() => handleDismissModalPress()}
          accio={accio}
        />
      </CustomBottomSheetModal>
    </Vista>
  );
};

export default AccioInventariTargeta;
