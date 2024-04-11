import { HVista, Separador, Vista } from "@/components/base/ThemedView";
import React, { memo, useEffect, useState } from "react";
import { Text } from "@/components/base/ThemedText";
import { useTema } from "@/context/TemaProvider";
import RadioButtons from "@/components/generic/RadioButtons";
import { ScrollView } from "react-native-gesture-handler";
import { Pressionable } from "@/components/base/ThemedPress";
import TipusOrdreTag from "@/components/ordre/TipusOrdreTag";
import { Ordre, enumTipusOrdre } from "@/models/Ordre";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import { CollapsableContainer } from "@/components/generic/CollapsableContainer";
import { GetOrdresLlista, OrdresLlistaFiltre } from "@/accessos/OrdreAcces";
import TargetaOrdreLlista from "@/components/more/registreOrdres/TargetaOrdreLlista";
import { FlatList } from "react-native";
import { Targeta } from "@/components/base/ThemedTargeta";
import { router } from "expo-router";
import Carregant from "@/components/generic/Carregant";
const RegistreOrdresPage = () => {
  const { esFosc, COLORS, MIDES } = useTema();

  const [expandedSortida, setExpandedSortida] = useState<boolean>(false);
  const [expandedEntrada, setExpandedEntrada] = useState<boolean>(false);
  const [expandedInventari, setExpandedInventari] = useState<boolean>(false);

  const [filtre, setFiltre] = useState<OrdresLlistaFiltre>("Dia");
  const { ordres, isLoadingOrdres, errorOrdres, refetchOrdres } =
    GetOrdresLlista("Dia");

  useEffect(() => {
    setExpandedEntrada(false);
    setExpandedSortida(false);
    setExpandedInventari(false);
    refetchOrdres(filtre);
  }, [filtre]);

  return (
    <Vista style={{ flex: 1 }} gap={20}>
      <HVista
        align="baseline"
        justify="center"
        style={{ marginVertical: MIDES.medium, marginBottom: MIDES.mini }}
      >
        <Text style={{ fontWeight: "bold", fontSize: MIDES.xLarge }}>
          Registre Ordres
        </Text>
      </HVista>

      {/* FILTRES */}
      <Vista>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            marginBottom: 0,
            flex: 1,
          }}
        >
          <RadioButtons
            opcions={[
              { text: "Dia" },
              { text: "Setmana" },
              { text: "Mes" },
              { text: "Històric" },
            ]}
            required
            selectedChanged={(seleccionat) => {
              setFiltre(seleccionat as OrdresLlistaFiltre);
            }}
            gap={[10, 5]}
            defaultSelected={0}
            ItemRender={(text, selected) => (
              <HVista
                style={{
                  borderWidth: 1.5,
                  backgroundColor: selected
                    ? COLORS.primari75
                    : COLORS.primari25,
                  borderColor: COLORS.primari50,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                }}
              >
                <Text>{text}</Text>
              </HVista>
            )}
          />
        </ScrollView>
      </Vista>

      {isLoadingOrdres ? (
        <Carregant />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Vista gap={10} style={{ flex: 1 }}>
            {/* SORTIDA */}
            <Vista>
              <Pressionable onPress={() => setExpandedSortida((prev) => !prev)}>
                <Targeta
                  style={{
                    marginHorizontal: MIDES.mini,
                    padding: 10,
                    paddingHorizontal: 6,
                    marginVertical: MIDES.xxxSmall,
                  }}
                >
                  <HVista
                    style={{
                      padding: 10,
                      borderRadius: 2,
                      borderBottomWidth: 1,
                      borderColor: COLORS.sortidaProducte,
                    }}
                    justify="space-between"
                  >
                    <TipusOrdreTag tipus={enumTipusOrdre.SortidaProducte} />
                    <HVista align="center" gap={10}>
                      <Text
                        color={COLORS.sortidaProducte}
                        pes="negreta"
                        style={{ opacity: 0.6 }}
                      >
                        {
                          ordres?.filter(
                            (o) => o.tipus === enumTipusOrdre.SortidaProducte
                          ).length
                        }
                      </Text>
                      {expandedSortida ? (
                        <Icona
                          type={IconType.MatetrialIcon}
                          color={COLORS.sortidaProducte}
                          name={"keyboard-arrow-up"}
                        />
                      ) : (
                        <Icona
                          type={IconType.MatetrialIcon}
                          color={COLORS.sortidaProducte}
                          name={"keyboard-arrow-down"}
                        />
                      )}
                    </HVista>
                  </HVista>
                </Targeta>
              </Pressionable>
              <CollapsableContainer
                expanded={expandedSortida}
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: COLORS.sortidaProducte,
                  marginLeft: MIDES.xxxSmall,
                }}
              >
                <FlatList
                  scrollEnabled={false}
                  initialNumToRender={20}
                  style={{ flex: 1 }}
                  data={ordres?.filter(
                    (o) => o.tipus === enumTipusOrdre.SortidaProducte
                  )}
                  renderItem={({ item }) => (
                    <ListItem item={item} key={item.id} />
                  )}
                  ItemSeparatorComponent={() => <Separador marge={1} />}
                />
              </CollapsableContainer>
            </Vista>
            {/* ENTRADA */}
            <Vista>
              <Pressionable onPress={() => setExpandedEntrada((prev) => !prev)}>
                <Targeta
                  style={{
                    marginHorizontal: MIDES.mini,
                    padding: 10,
                    paddingHorizontal: 6,
                    marginVertical: MIDES.xxxSmall,
                  }}
                >
                  <HVista
                    style={{
                      padding: 10,
                      borderRadius: 2,
                      borderBottomWidth: 1,
                      borderColor: COLORS.entradaProducte,
                    }}
                    justify="space-between"
                  >
                    <TipusOrdreTag tipus={enumTipusOrdre.EntradaProducte} />
                    <HVista align="center" gap={10}>
                      <Text
                        color={COLORS.entradaProducte}
                        pes="negreta"
                        style={{ opacity: 0.6 }}
                      >
                        {
                          ordres?.filter(
                            (o) => o.tipus === enumTipusOrdre.EntradaProducte
                          ).length
                        }
                      </Text>
                      {expandedEntrada ? (
                        <Icona
                          type={IconType.MatetrialIcon}
                          name={"keyboard-arrow-up"}
                          color={COLORS.entradaProducte}
                        />
                      ) : (
                        <Icona
                          type={IconType.MatetrialIcon}
                          name={"keyboard-arrow-down"}
                          color={COLORS.entradaProducte}
                        />
                      )}
                    </HVista>
                  </HVista>
                </Targeta>
              </Pressionable>
              <CollapsableContainer
                expanded={expandedEntrada}
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: COLORS.entradaProducte,
                  marginLeft: MIDES.xxxSmall,
                }}
              >
                <FlatList
                  scrollEnabled={false}
                  initialNumToRender={20}
                  style={{ flex: 1 }}
                  data={ordres?.filter(
                    (o) => o.tipus === enumTipusOrdre.EntradaProducte
                  )}
                  renderItem={({ item }) => (
                    <ListItem item={item} key={item.id} />
                  )}
                  ItemSeparatorComponent={() => <Separador marge={8} />}
                />
              </CollapsableContainer>
            </Vista>
            {/* INVENTARI */}
            <Vista>
              <Pressionable
                onPress={() => setExpandedInventari((prev) => !prev)}
              >
                <Targeta
                  style={{
                    marginHorizontal: MIDES.mini,
                    padding: 10,
                    paddingHorizontal: 6,
                    marginVertical: MIDES.xxxSmall,
                  }}
                >
                  <HVista
                    style={{
                      padding: 10,
                      borderRadius: 2,
                      borderBottomWidth: 1,
                      borderColor: COLORS.inventari,
                    }}
                    justify="space-between"
                  >
                    <TipusOrdreTag tipus={enumTipusOrdre.Inventari} />
                    <HVista align="center" gap={10}>
                      <Text
                        color={COLORS.inventari}
                        pes="negreta"
                        style={{ opacity: 0.6 }}
                      >
                        {
                          ordres?.filter(
                            (o) => o.tipus === enumTipusOrdre.Inventari
                          ).length
                        }
                      </Text>
                      {expandedInventari ? (
                        <Icona
                          type={IconType.MatetrialIcon}
                          name={"keyboard-arrow-up"}
                          color={COLORS.inventari}
                        />
                      ) : (
                        <Icona
                          type={IconType.MatetrialIcon}
                          name={"keyboard-arrow-down"}
                          color={COLORS.inventari}
                        />
                      )}
                    </HVista>
                  </HVista>
                </Targeta>
              </Pressionable>
              <CollapsableContainer
                expanded={expandedInventari}
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: COLORS.inventari,
                  marginLeft: MIDES.xxxSmall,
                }}
              >
                <FlatList
                  scrollEnabled={false}
                  initialNumToRender={20}
                  style={{ flex: 1 }}
                  data={ordres?.filter(
                    (o) => o.tipus === enumTipusOrdre.Inventari
                  )}
                  renderItem={({ item }) => (
                    <ListItem item={item} key={item.id} />
                  )}
                  ItemSeparatorComponent={() => <Separador marge={8} />}
                />
              </CollapsableContainer>
            </Vista>
          </Vista>
        </ScrollView>
      )}
    </Vista>
  );
};

export default RegistreOrdresPage;

const ListItem = memo(
  ({ item }: { item: Ordre }) => {
    return (
      <Pressionable
        key={item.id}
        onPress={() => router.push(`/more/InformacioOrdre/${item.id}`)}
      >
        <TargetaOrdreLlista key={item.id} ordre={item} />
      </Pressionable>
    );
  },
  (prev, next) => prev.item.id === next.item.id
);
