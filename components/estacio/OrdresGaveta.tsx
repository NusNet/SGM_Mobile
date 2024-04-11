import { PutEntrarGaveta } from "@/accessos/EstacioAcces";
import { GetOrdresGaveta } from "@/accessos/OrdreAcces";
import { Imatges } from "@/assets/images/Imatges";
import { useModalContext } from "@/context/ModalProvider";
import { useTema } from "@/context/TemaProvider";
import { OrdreComplet, enumEstatOrdre, enumTipusOrdre } from "@/models/Ordre";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { IconType, Icona } from "../base/ThemedIcon";
import { Text } from "../base/ThemedText";
import { HVista, Vista } from "../base/ThemedView";
import { Carousel } from "../generic/Carousel/Carousel";
import Carregant from "../generic/Carregant";
import { Error } from "../generic/Error";
import OrdreGaveta from "./OrdreGaveta";
import OrdreTargeta from "./OrdreTargeta";
import { enumEstatPas } from "@/models/PasGaveta";
import { BotoFlotant } from "../base/ThemedPress";

const OrdresGaveta = ({ idGaveta }: { idGaveta: string }) => {
  const { COLORS, MIDES } = useTema();
  const { isModalOpen, openModal } = useModalContext();
  const {
    ordresGaveta,
    isLoadingOrdresGaveta,
    errorOrdresGaveta,
    refetchOrdresGaveta,
  } = GetOrdresGaveta(idGaveta);

  useEffect(() => {
    refetchOrdresGaveta(idGaveta);
  }, [idGaveta]);

  const [selectedOrdre, setselectedOrdre] = useState<OrdreComplet>();

  const onRequestEntrarGaveta = async (idGaveta: string) => {
    console.log("request entrar gaveta", idGaveta);
    try {
      var hiHaPendents = ordresGaveta?.some(
        (o) =>
          o.tipus != enumTipusOrdre.Inventari &&
          o.passos
            .filter((p) => p.contenidor.id === idGaveta)
            .some((p) => p.accions[0].estat === enumEstatPas.Pendent)
      );
      if (hiHaPendents)
        openModal(
          <Vista align="center" justify="center" gap={10}>
            <Icona type={IconType.Feather} name="alert-triangle" size={24} color={COLORS.alerta}/>
            <Text>Acaba totes les accions pendents</Text>
          </Vista>,
          false
        );
      else await PutEntrarGaveta("EM1");
    } catch (err) {
      console.log("ERROR put entrar gaveta", err);
    }
  };

  if (isLoadingOrdresGaveta) {
    return <Carregant />;
  }
  if (errorOrdresGaveta) {
    return <Error />;
  }
  if (!ordresGaveta || ordresGaveta?.length == 0) {
    return (
      <Vista
        style={{ margin: 30, marginTop: 100 }}
        justify="center"
        align="center"
        gap={30}
      >
        <Text pes="negreta" color={COLORS.gris[300]}>
          Aquesta gaveta no té cap ordre executant-se
        </Text>
        <HVista gap={20} align="flex-end">
          {/* <Icona
            type={IconType.FontAweomseIcon}
            name={"inbox"}
            color={COLORS.error25}
            size={60}
          /> */}
          <Icona
            type={IconType.FontAwesome5}
            name={"file-excel"}
            color={COLORS.error25}
            size={80}
          />
        </HVista>
        <Vista>
          <Text  color={COLORS.gris[300]}>
            Entra-la al magatzem
          </Text>
          <BotoFlotant
            color={COLORS.fonsTargeta}
            style={{ borderColor: COLORS.primari, borderWidth: 1 }}
            onPress={() => onRequestEntrarGaveta(idGaveta)}
          >
            <HVista align="center">
              <Icona
                type={IconType.Ionicon}
                name={"arrow-redo"}
                size={18}
                color={COLORS.text}
              />
              <Vista style={{ transform: [{ scaleX: -1 }] }}>
                <Icona
                  type={IconType.MaterialCommunityIcons}
                  name={"warehouse"}
                  size={26}
                  color={COLORS.text}
                />
              </Vista>
            </HVista>
          </BotoFlotant>
        </Vista>
      </Vista>
    );
  }

  return (
    <Vista style={{ flex: 1 }} gap={15}>
      <Carousel
        items={ordresGaveta}
        onItemDisplayedChanged={(item) => setselectedOrdre(item)}
        renderItem={({ item }) => <OrdreTargeta ordre={item} />}
      />
      {selectedOrdre && (
        <OrdreGaveta
          ordre={selectedOrdre}
          onRequestEntrarGaveta={onRequestEntrarGaveta}
        />
      )}
    </Vista>
  );
};

export default OrdresGaveta;
