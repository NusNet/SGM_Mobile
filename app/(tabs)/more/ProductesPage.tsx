import { HVista, Separador, Vista } from "@/components/base/ThemedView";
import { useTema } from "@/context/TemaProvider";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text } from "@/components/base/ThemedText";
import Cercador from "@/components/generic/Cercador";
import { FlatList } from "react-native";
import { Producte } from "@/models/Producte";
import { Targeta } from "@/components/base/ThemedTargeta";
import { Pressionable } from "@/components/base/ThemedPress";
import { GetProductesEnEstoc } from "@/accessos/ProducteAcces";
import Carregant from "@/components/generic/Carregant";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CustomBackdrop from "@/components/generic/CustomBackdrop";
import GavetesProducte from "@/components/more/productes/InfoGavetesProducte";
import CustomBottomSheetModal from "@/components/generic/CustomBottomSheetModal";

const ProductesPage = () => {
  const { esFosc, COLORS, MIDES } = useTema();

  const [cerca, setcerca] = useState<string>("");

  const { productesEnEstoc, isLoadingEnEstoc } = GetProductesEnEstoc();
  const [productesFiltrats, setproductesFiltrats] = useState<Producte[]>();
  const memoizedData = useMemo(() => productesFiltrats, [productesFiltrats]);

  useEffect(() => {
    if (cerca) {
      setproductesFiltrats(
        productesEnEstoc?.filter(
          (p) =>
            p.referencia.toLowerCase().includes(cerca.toLowerCase()) ||
            p.nom.toLowerCase().includes(cerca.toLowerCase())
        )
      );
    } else setproductesFiltrats(productesEnEstoc);
  }, [productesEnEstoc, cerca]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const [producteseleccionat, setproducteseleccionat] = useState<Producte>();

  return (
    <>
      <Vista gap={10} style={{ flex: 1, paddingBottom: 70 }}>
        <Vista
          style={{
            paddingTop: MIDES.medium,
            paddingHorizontal: MIDES.xxSmall,
            borderBottomWidth: 1.5,
            borderBottomColor: COLORS.primari,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
          }}
        >
          <HVista justify="center">
            <Text mida={MIDES.xLarge} pes="negreta">
              Productes
            </Text>
          </HVista>
          <Cercador
            onTextCanviat={(text) => setcerca(text)}
            containerStyle={{ marginHorizontal: MIDES.xxSmall }}
          />
        </Vista>
        {isLoadingEnEstoc ? (
          <Carregant />
        ) : (
          <FlatList
            style={{ marginHorizontal: MIDES.xxSmall }}
            contentContainerStyle={{ paddingBottom: 40 }}
            data={memoizedData}
            bounces={false}
            showsVerticalScrollIndicator={false}
            windowSize={21}
            maxToRenderPerBatch={10}
            initialNumToRender={300}
            ListHeaderComponent={() => <Vista></Vista>}
            ItemSeparatorComponent={() => <Separador marge={0} />}
            keyExtractor={(item) => item.referencia}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                key={item.referencia}
                prodSeleccionat={(producte) => {
                  setproducteseleccionat(producte);
                  handlePresentModalPress();
                }}
              />
            )}
          />
        )}
      </Vista>
      <CustomBottomSheetModal
        innerRef={bottomSheetModalRef}
        onRequestDismiss={() => handleDismissModalPress()}
        snapPoints={["65%", "85%"]}
      >
        {producteseleccionat && (
          <GavetesProducte producte={producteseleccionat} />
        )}
      </CustomBottomSheetModal>
    </>
  );
};

export default ProductesPage;

const ListItem = memo(
  ({
    item,
    prodSeleccionat,
  }: {
    item: Producte;
    prodSeleccionat: (pro: Producte) => void;
  }) => {
    const { COLORS } = useTema();
    return (
      <Pressionable
        key={item.referencia}
        style={{ paddingVertical: 10 }}
        onPress={() => {
          prodSeleccionat(item);
        }}
        pressedColor={COLORS.primari25}
      >
        <HVista
          style={{ paddingHorizontal: 10, paddingVertical: 1 }}
          justify="space-between"
          gap={12}
        >
          <Text>{item.referencia}</Text>
          <Text
            to="secundari"
            numberOfLines={1}
            style={{ flexWrap: "wrap", flex: 1, textAlign: "right" }}
          >
            {item.nom}
          </Text>
          <Text pes="negreta" style={{ minWidth: 30, textAlign: "right" }}>
            {item.estoc}
          </Text>
        </HVista>
      </Pressionable>
    );
  },
  (prev, next) => prev.item.referencia === next.item.referencia
);
