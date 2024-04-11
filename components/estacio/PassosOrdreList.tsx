import { useEstacioContext } from "@/context/EstacioContext";
import { useTema } from "@/context/TemaProvider";
import { enumTipusOrdre } from "@/models/Ordre";
import { PasGaveta } from "@/models/PasGaveta";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { IconType, Icona } from "../base/ThemedIcon";
import { Targeta } from "../base/ThemedTargeta";
import { Text } from "../base/ThemedText";
import { HVista, Vista } from "../base/ThemedView";
import { modeEstatOrdreTag } from "../ordre/EstatOrdreTag";
import EstatPasTag from "../ordre/EstatPasTag";

export type PassosOrdreListProps = {
  passos: PasGaveta[];
  tipusOrdre: enumTipusOrdre,
  onPasSeleccionat: (pas: PasGaveta) => void;
};
const PassosOrdreList = ({
  passos,
  tipusOrdre,
  onPasSeleccionat,
}: PassosOrdreListProps) => {
  const { COLORS, MIDES } = useTema();

  const { IdLectura } = useEstacioContext();

  const [idSelected, setidSelected] = useState<string>();
  const flatListRef = React.useRef<FlatList<PasGaveta>>(null);

  useEffect(() => {
    var passet = passos.find((p) => p.contenidor.id === IdLectura);
    if (passet) {
      setidSelected(passet?.id);
      onPasSeleccionat(passet);
    }
  }, [IdLectura, passos[0].id]);
  
  useEffect(() => {
    var index = passos.findIndex((p) => p.id === idSelected);

    if (flatListRef && index && index > 0) {
      (flatListRef as any).current.scrollToIndex({
        animated: true,
        index: index,
        viewOffset: 30,
      });
    }
  }, [idSelected]);

  return (
    <Vista gap={3}>
      <HVista style={{ marginHorizontal: MIDES.small }} justify="space-between">
        <Text mida={MIDES.small} to="secundari">
          Passos
        </Text>
        <Text mida={MIDES.small} to="secundari">
          {passos.length} {passos.length === 1 ? "gaveta" : "gavetes"}
        </Text>
      </HVista>
      <Vista justify="center" align="center" >
        <FlatList
          ref={flatListRef}
          initialScrollIndex={ passos.findIndex((p) => p.id === idSelected) === -1 ? 0 : passos.findIndex((p) => p.id === idSelected)}
          onScrollToIndexFailed={(info) => {}}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListHeaderComponent={() => <Vista style={{ width: MIDES.xxSmall }} />}
          ListFooterComponent={() => <Vista style={{ width: MIDES.xxSmall }} />}
          ItemSeparatorComponent={() => (
            <Vista style={{ width: MIDES.xxxSmall }} />
          )}
          data={passos}
          renderItem={({ item, index }) => (
            <Targeta
              style={{
                borderWidth: 1,
                borderColor:
                  item.id === idSelected ? tipusOrdre === enumTipusOrdre.Inventari ? COLORS.inventari: COLORS.primari : "transparent",
              }}
              color={
                item.contenidor.id === IdLectura
                  ? COLORS.gris[700]
                  : COLORS.gris[800]
              }
              clicable
              onPress={() => {
                onPasSeleccionat(item);
                setidSelected(item.id);
              }}
            >
              <Vista
                style={{
                  maxWidth: 80,
                }}
                justify="center"
                align="center"
              >
                <Icona
                  type={IconType.FontAweomseIcon}
                  name={"inbox"}
                  color={COLORS.text}
                  size={28}
                />
                <Text
                  numberOfLines={1}
                  style={{ fontSize: MIDES.xxSmall, color: COLORS.gris[500] }}
                >
                  {item.contenidor.id}
                </Text>
                <EstatPasTag
                  estat={item.estat}
                  mode={modeEstatOrdreTag.Icona}
                />
              </Vista>
            </Targeta>
          )}
        />
      </Vista>
    </Vista>
  );
};

export default PassosOrdreList;
