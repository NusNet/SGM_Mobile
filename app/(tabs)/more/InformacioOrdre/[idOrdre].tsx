import { DeleteCancellarOrdre, GetFullOrdre } from "@/accessos/OrdreAcces";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import { Boto, Pressionable } from "@/components/base/ThemedPress";
import { Targeta } from "@/components/base/ThemedTargeta";
import { DataText, Text, Titol } from "@/components/base/ThemedText";
import { HVista, Separador, Vista } from "@/components/base/ThemedView";
import Carregant from "@/components/generic/Carregant";
import { CollapsableContainer } from "@/components/generic/CollapsableContainer";
import { Error } from "@/components/generic/Error";
import TargetaPasOrdreInfo from "@/components/more/registreOrdres/TargetaPasOrdreInfo";
import EstatOrdreTag from "@/components/ordre/EstatOrdreTag";
import TipusOrdreTag from "@/components/ordre/TipusOrdreTag";
import { useModalContext } from "@/context/ModalProvider";
import { useTema } from "@/context/TemaProvider";
import { enumEstatOrdre } from "@/models/Ordre";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, ScrollView } from "react-native";
const InformacioOrdrePage = () => {
  const { openModal } = useModalContext();

  const { idOrdre } = useLocalSearchParams();
  const { COLORS, MIDES } = useTema();
  const { ordre, isLoadingOrdre, errorOrdre } = GetFullOrdre(
    Number.parseInt(idOrdre as string)
  );

  const cancellarOrdre = async () =>{
    if(ordre){
      try{

        await DeleteCancellarOrdre(ordre?.idOrdre)
      }
      catch{
        openModal(
          <Vista align="center" justify="center" gap={10}>
            <Icona type={IconType.Feather} name="alert-triangle" size={24} color={COLORS.error} />
            <Text>Error cancel·lant l'ordre</Text>
          </Vista>,
          false
        );
      }
    }
  }

  const [expandedAltresAccions, setExpandedAltresAccions] =
    useState<boolean>(false);

  return (
    <Vista
      style={{
        flex: 1,
      }}
    >
      {isLoadingOrdre ? (
        <Carregant centrat />
      ) : errorOrdre ? (
        <Error flexi />
      ) : (
        ordre && (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
              flex: 0,
              justifyContent: "center",
            }}
          >
            <Vista
              style={{
                marginTop: MIDES.huge,
              }}
              gap={30}
              justify="center"
            >
              {/* TITOL */}
              <Targeta
                style={{
                  borderBottomColor: COLORS.primari,
                  marginHorizontal: MIDES.xxxSmall,
                }}
              >
                <Vista gap={MIDES.large}>
                  <HVista justify="space-between">
                    <Titol>Ordre</Titol>
                    <TipusOrdreTag tipus={ordre.tipus} />
                  </HVista>
                  <HVista justify="space-between">
                    <Text>{ordre.idComanda}</Text>
                    <Text to="secundari">{ordre.idOrdre}</Text>

                    <EstatOrdreTag estat={ordre.estat} />
                  </HVista>
                </Vista>
              </Targeta>
              {/* DATES */}
              <Vista
                style={{ marginHorizontal: MIDES.large }}
                gap={MIDES.xSmall}
              >
                <HVista gap={5}>
                  <Text color={COLORS.gris[500]}>Creació</Text>
                  <DataText>{ordre.data}</DataText>
                </HVista>
                <HVista justify="space-between">
                  <HVista gap={5}>
                    <Text color={COLORS.gris[500]}>Inici</Text>
                    <DataText>{ordre.dataInici}</DataText>
                  </HVista>
                  <HVista gap={5}>
                    <Text color={COLORS.gris[500]}>Fi</Text>
                    <DataText>{ordre.dataFi}</DataText>
                  </HVista>
                </HVista>
              </Vista>
              <Separador color={COLORS.primari} marge={0} />
              <HVista style={{ marginHorizontal: MIDES.large }} gap={6}>
                <Text to="secundari" pes="negreta">
                  {ordre.passos.length}
                </Text>
                <Text to="secundari" pes="negreta">
                  passos
                </Text>
              </HVista>

              {/* PASSOS */}
              <Vista align="center" justify="center">
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={ordre.passos}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{ paddingHorizontal: MIDES.xxSmall }}
                  ItemSeparatorComponent={() => <Vista style={{ width: 10 }} />}
                  renderItem={({ item, index }) => (
                    <TargetaPasOrdreInfo item={item} />
                  )}
                />
              </Vista>

              {/* ALTRES ACCIONS */}
              <Vista style={{ marginHorizontal: MIDES.xSmall }}>
                <Pressionable
                  onPress={() => setExpandedAltresAccions((prev) => !prev)}
                >
                  <Vista style={{ paddingVertical: 20 }}>
                    <HVista justify="space-between">
                      <Text pes="negreta" to="secundari" mida={MIDES.large}>
                        Opcions
                      </Text>
                      {expandedAltresAccions ? (
                        <Icona
                          type={IconType.MatetrialIcon}
                          name={"keyboard-arrow-up"}
                          color={COLORS.gris[400]}
                          size={24}
                        />
                      ) : (
                        <Icona
                          type={IconType.MatetrialIcon}
                          name={"keyboard-arrow-down"}
                          color={COLORS.gris[400]}
                          size={24}
                        />
                      )}
                    </HVista>
                    <Separador percentOcupacio="100%" />
                  </Vista>
                </Pressionable>
                <CollapsableContainer expanded={expandedAltresAccions}>
                  <Vista gap={20} style={{marginHorizontal:MIDES.mini}}>
                    {/* CANCELLAR */}
                    <HVista justify="space-between" align="center">
                      <Text>Cancel·lar ordre</Text>
                      <Boto disabled={ordre.estat != enumEstatOrdre.Pendent}
                        onPress={() => cancellarOrdre()}
                        color={COLORS.gris[600]}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 8,
                          borderColor: COLORS.gris[400],
                          borderWidth: 1,
                        }}
                      >
                        <HVista align="center" gap={6}>

                        <Icona size={25} type={IconType.MaterialCommunityIcons} name={"file-cancel-outline"} color={COLORS.gris[200]}/>
                        <Text>Cancel·lar</Text>
                        </HVista>
                      </Boto>
                    </HVista>
               
                  </Vista>
                </CollapsableContainer>
              </Vista>
            </Vista>
          </ScrollView>
        )
      )}
    </Vista>
  );
};

export default InformacioOrdrePage;
