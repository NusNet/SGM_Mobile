import { PostNouInventari } from "@/accessos/OrdreAcces";
import { GetProductesInventari } from "@/accessos/ProducteAcces";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import {
  BotoFlotant,
  BotoTextMenu,
  Pressionable,
} from "@/components/base/ThemedPress";
import { Targeta } from "@/components/base/ThemedTargeta";
import { Text } from "@/components/base/ThemedText";
import { HVista, Separador, Vista } from "@/components/base/ThemedView";
import Carregant from "@/components/generic/Carregant";
import Cercador from "@/components/generic/Cercador";
import InventariGenerate from "@/components/more/inventari/InventariGenerate";
import { useModalContext } from "@/context/ModalProvider";
import { useTema } from "@/context/TemaProvider";
import { OrdreInventariAdd } from "@/models/DTOs/OrdreInventariAdd";
import { Producte } from "@/models/Producte";
import { router } from "expo-router";
import React, { memo, useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native";

const InventariPage = () => {
  const { COLORS, MIDES } = useTema();
  const { openModal } = useModalContext();

  const {
    productesInventari,
    isLoadingProductesInventari,
    errorProductesInventari,
    refetchProductesInventari,
  } = GetProductesInventari();

  const [llistaProductesInventari, setllistaProductesInventari] = useState<
    Producte[]
  >([]);
  const afegirProducte = (producte: Producte) => {
    setllistaProductesInventari((pev) =>
      pev.find((p) => p.referencia === producte.referencia)
        ? [...pev]
        : [...pev, producte]
    );
  };

  const esborrarProducte = (producte: Producte) => {
    setllistaProductesInventari((prev) =>
      prev.filter((p) => p.referencia !== producte.referencia)
    );
  };

  const postInventari = async (dto: OrdreInventariAdd) => {
    try {
      await PostNouInventari(dto);
      openModal(
        <Vista align="center" justify="center" gap={10}>
          <Icona
            type={IconType.MaterialCommunityIcons}
            name="information-outline"
            size={24} color={COLORS.primari} 
          />
          <Text>Inventari generat</Text>
        </Vista>,
        false
      );
      router.back();
    } catch (ex) {
      openModal(
        <Vista align="center" justify="center" gap={10}>
          <Icona type={IconType.Feather} name="alert-triangle" size={24} color={COLORS.error} />
          <Text>Error generant inventari</Text>
        </Vista>,
        false
      );
    }
  };
  const [productesFiltrats, setproductesFiltrats] = useState<Producte[]>();
  const [cerca, setcerca] = useState<string>("");
  useEffect(() => {
    if (cerca) {
      setproductesFiltrats(
        productesInventari?.filter(
          (p) =>
            p.referencia.toLowerCase().includes(cerca.toLocaleLowerCase()) ||
            p.nom.toLowerCase().includes(cerca.toLowerCase())
        )
      );
    } else setproductesFiltrats(productesInventari);
  }, [productesInventari, cerca]);

  return (
    <Vista gap={0} style={{ flex: 1, paddingBottom: 70 }}>
      <HVista justify="center" style={{ marginTop: 10 }} gap={10} align="center">
        <Icona
          type={IconType.MaterialCommunityIcons}
          name={"clipboard-edit-outline"}
          color={COLORS.inventari}
          size={28}
        />
        <Text pes="negreta" mida={24} color={COLORS.inventari}>
          Nou Inventari
        </Text>
      </HVista>

      <Vista style={{ marginHorizontal: MIDES.xxSmall, flex: 1 }}>
        <Cercador
          onTextCanviat={(text) => setcerca(text)}
          color={COLORS.inventari}
        />
        {isLoadingProductesInventari ? (
          <Carregant />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 40 }}
            data={productesFiltrats}
            bounces={false}
            showsVerticalScrollIndicator={false}
            windowSize={2}
            maxToRenderPerBatch={10}
            initialNumToRender={300}
            ItemSeparatorComponent={() => <Separador marge={0} />}
            keyExtractor={(item) => item.referencia}
            renderItem={({ item, index }) => (
              <ListItem
                item={item}
                key={item.referencia}
                afegirProducte={afegirProducte}
              />
            )}
          />
        )}
      </Vista>

      <InventariGenerate
        generarInventari={postInventari}
        productes={llistaProductesInventari}
        containerStyle={{ flex: 1, marginTop: 10, borderWidth:0.2, borderColor:COLORS.inventari }}
        esborrarProducte={esborrarProducte}
      />
    </Vista>
  );
};

export default InventariPage;

const ListItem = memo(
  ({
    item,
    afegirProducte,
  }: {
    item: Producte;
    afegirProducte: (pro: Producte) => void;
  }) => {
    const { COLORS } = useTema();
    return (
      <Pressionable
        key={item.referencia}
        style={{ paddingVertical: 10 }}
        onPress={() => afegirProducte(item)}
        pressedColor={COLORS.inventari25}
      >
        <HVista
          style={{ paddingHorizontal: 10, paddingVertical: 1 }}
          justify="space-between"
          gap={20}
        >
          <Text>{item.referencia}</Text>
          <Text
            to="secundari"
            numberOfLines={1}
            style={{ flexWrap: "wrap", flex: 1, textAlign: "right" }}
          >
            {item.nom}
          </Text>
        </HVista>
      </Pressionable>
    );
  },
  (prev, next) => prev.item.referencia === next.item.referencia
);
