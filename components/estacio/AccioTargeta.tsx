import { useEstacioContext } from "@/context/EstacioContext";
import { useTema } from "@/context/TemaProvider";
import { Accio, enumTipusAccio } from "@/models/Accio";
import { Contenidor } from "@/models/Contenidor";
import { enumEstatOrdre } from "@/models/Ordre";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Pressable } from "react-native";
import { BotoFlotant,  } from "../base/ThemedPress";
import { Targeta } from "../base/ThemedTargeta";
import { Text } from "../base/ThemedText";
import { HVista, Separador, Vista } from "../base/ThemedView";
import { Cobertura } from "../generic/Cobertura";
import { CollapsableContainer } from "../generic/CollapsableContainer";
import CustomBackdrop from "../generic/CustomBackdrop";
import ModificarQuantitatModal from "./ModificarQuantitatModal";
import { IconType, Icona } from "../base/ThemedIcon";
import CustomBottomSheetModal from "../generic/CustomBottomSheetModal";
import { enumEstatPas } from "@/models/PasGaveta";

type AccioTargetaProps = {
  accio: Accio;
  contenidor: Contenidor;
  onAccioRealitzada: (accio: Accio) => void;
  onRequestEntrarGaveta: (idGaveta:string) => void
};

const AccioTargeta = ({
  accio,
  contenidor,
  onAccioRealitzada,
  onRequestEntrarGaveta
}: AccioTargetaProps) => {
  const { COLORS, MIDES } = useTema();
  const { IdLectura } = useEstacioContext();

  const [expanded, setExpanded] = useState<boolean>(false);

  const realitzada = accio.estat !== enumEstatPas.Pendent;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() =>{
    bottomSheetModalRef.current?.dismiss()
  },[])


  return (
    <Vista>
      <Targeta>
        <Vista gap={MIDES.xxSmall}>
          {/* PRODUCTE */}
          <Vista justify="center" align="center">
            <Text style={{ fontWeight: "bold", fontSize: MIDES.large }}>
              {accio.producte.referencia}
            </Text>
            <Text
              numberOfLines={2}
              style={{ color: COLORS.gris[500], textAlign: "center" }}
            >
              {accio.producte.nom}
            </Text>
          </Vista>
          {/* QUANTITAT */}
          <HVista justify="center" align="baseline" gap={10}>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.gris[500],
                fontSize: MIDES.xLarge,
              }}
            >
              {accio.tipus === enumTipusAccio.IntroduirProducte
                ? "Introdueix"
                : "Treu"}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.primari,
                fontSize: (MIDES.huge * 3) / 2,
              }}
            >
              {accio.quantitatEfectuada}
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
          {/* BOTO */}
          <Vista>
            {realitzada ? (
              <HVista style={{ flex: 1 }}>
                <BotoFlotant
                  disabled
                  color={COLORS.gris[600]}
                  style={{ flex: 1 }}
                >
                  <HVista gap={10}>
                    <Icona
                      type={IconType.Entypo}
                      name={"check"}
                      size={22}
                      color={COLORS.exit}
                    />
                  </HVista>
                </BotoFlotant>
                <BotoFlotant
                  color={COLORS.fonsTargeta}
                  style={{ borderColor: COLORS.primari, borderWidth: 1 }}
                  onPress={() =>
                    onRequestEntrarGaveta(contenidor.id)
                  }
                >
                  <HVista align="center">
                    <Icona
                      type={IconType.Ionicon}
                      name={"arrow-redo"}
                      size={18} color={COLORS.text}
                    />
                    <Vista style={{ transform: [{ scaleX: -1 }] }}>
                      <Icona
                        type={IconType.MaterialCommunityIcons}
                        name={"warehouse"}
                        size={26} color={COLORS.text}
                      />
                    </Vista>
                  </HVista>
                </BotoFlotant>
              </HVista>
            ) : (
              <BotoFlotant
                onPress={() => {
                  onAccioRealitzada(accio);
                }}
              >
                <Text style={{ color: COLORS.blanc }}>REALITZAT</Text>
              </BotoFlotant>
            )}
          </Vista>

          {/* INFORMACIÓ */}
          <Separador marge={MIDES.mini} />
          <HVista justify="space-between" align="center">
            <HVista align="center" gap={5}>
              <Icona
                type={IconType.FontAweomseIcon}
                name={"inbox"}
                color={COLORS.text}
                size={26}
              />
              <Icona
                type={IconType.Entypo}
                name={
                  accio.tipus === enumTipusAccio.IntroduirProducte
                    ? "download"
                    : "upload"
                }
                color={
                  accio.tipus === enumTipusAccio.IntroduirProducte
                    ? COLORS.entradaProducte
                    : COLORS.sortidaProducte
                }
                size={23}
              />
              <Vista
                style={
                  accio.tipus === enumTipusAccio.IntroduirProducte
                    ? { transform: [{ scaleX: -1 }] }
                    : {}
                }
              >
                <Icona
                  type={IconType.MaterialCommunityIcons}
                  name={"human-dolly"}
                  color={COLORS.text}
                  size={25}
                />
              </Vista>
            </HVista>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => setExpanded((prev) => !prev)}
            >
              <HVista
                justify="center"
                align="center"
                gap={5}
                style={{
                  opacity: 0.5,
                }}
              >
                <Icona type={IconType.AntDesign} name="infocirlceo" size={16} color={COLORS.text} />
                <Text style={{ fontSize: MIDES.small }}>Més detalls</Text>
              </HVista>
            </Pressable>
            {/* OBRIR EDICIO */}
            <Pressable disabled={realitzada}
              onPress={() => {
                handlePresentModalPress();
              }}
              style={{
                paddingLeft: 15,
                paddingVertical: 3,
                backgroundColor: COLORS.fonsTargeta,
              }}
            >
              <Icona
                type={IconType.FontAweomseIcon}
                name={"edit"}
                size={28}
                color={COLORS.alerta}
              />
            </Pressable>
          </HVista>
          {/* MÉS DETALLS */}
          <CollapsableContainer expanded={expanded}>
            <Vista
              style={{ marginVertical: 20, paddingHorizontal: MIDES.medium }}
            >
              <Text>Quantitats</Text>
              <HVista gap={0} align="baseline">
                <Text
                  mida={MIDES.small}
                  to="secundari"
                  style={{ marginRight: MIDES.xxSmall }}
                >
                  Reservada/disponible/en ús
                </Text>
                <Text pes="negreta" color={COLORS.entradaProducte}>
                  {contenidor.quantitatReservada}
                </Text>
                <Text>/</Text>
                <Text pes="negreta">{contenidor.quantitatDisponible}</Text>
                <Text>/</Text>
                <Text pes="negreta" color={COLORS.sortidaProducte}>
                  {contenidor.quantitatEnUs}
                </Text>
              </HVista>
              <HVista align="baseline" gap={5}>
                <Text mida={MIDES.small} to="secundari">
                  Màxima:
                </Text>
                <Text>{accio.producte.quantitatMaxima}</Text>
                <Text mida={MIDES.small} to="secundari">
                  unitats
                </Text>
              </HVista>
            </Vista>
          </CollapsableContainer>
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
          <ModificarQuantitatModal onRequestCloseModal={handleDismissModalPress} accio={accio} />
      </CustomBottomSheetModal>
    </Vista>
  );
};

export default AccioTargeta;
