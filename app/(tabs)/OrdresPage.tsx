import { GetOrdresActuals, PutExecutarOrdre } from "@/accessos/OrdreAcces";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import { Boto } from "@/components/base/ThemedPress";
import { Targeta } from "@/components/base/ThemedTargeta";
import { DataText, Text } from "@/components/base/ThemedText";
import { HVista, Vista } from "@/components/base/ThemedView";
import Carregant from "@/components/generic/Carregant";
import CustomRefreshControl from "@/components/generic/CustomRefreshControl";
import { Error } from "@/components/generic/Error";
import EstatOrdreTag, {
  modeEstatOrdreTag,
} from "@/components/ordre/EstatOrdreTag";
import OrdreListTargeta from "@/components/ordre/OrdreListTargeta";
import TipusOrdreTag from "@/components/ordre/TipusOrdreTag";
import { useModalContext } from "@/context/ModalProvider";
import { useTema } from "@/context/TemaProvider";
import { Ordre, enumEstatOrdre } from "@/models/Ordre";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, RefreshControl } from "react-native";

const REFRESH_TIME = 30;

const OrdresPage = () => {
  const { esFosc, COLORS, MIDES } = useTema();
  const { openModal } = useModalContext();

  const {
    ordresActuals,
    isLoadingOrdresActuals,
    errorOrdresActuals,
    refetchOrdresActuals,
  } = GetOrdresActuals();

  const [refreshing, setrefreshing] = useState(false);

  const [timer, settimer] = useState<number>(0);
  useEffect(() => {
    const t = setTimeout(() => {
      settimer((prev) => prev + 1);
    }, 1000);

    if (timer >= REFRESH_TIME) {
      refetchOrdresActuals();
      settimer(0);
    }

    return () => {
      clearTimeout(t);
    };
  }, [timer]);

  const onRequestExecutarOrdre = async (ordre: Ordre) => {
    try {
      await PutExecutarOrdre(ordre.id);
      refetchOrdresActuals();
      // Alert.alert(
      //   "Confirmació",
      //   "Estàs segur d'executar l'ordre?",
      //   [
      //     {
      //       text: "No",
      //       onPress: async () => {},
      //       style: "cancel",
      //     },
      //     {
      //       text: "Sí",
      //       onPress: async () => {
      //         await PutExecutarOrdre(ordre.id);
      //         refetchOrdresActuals();
      //       },
      //       style: "default",
      //     },
      //   ],
      //   { cancelable: true, userInterfaceStyle: esFosc ? "dark" : "light" }
      // );
    } catch {
      openModal(
        <Vista align="center" justify="center" gap={10}>
          <Icona type={IconType.Feather} name="alert-triangle" size={24} />
          <Text>Error executant l'ordre</Text>
        </Vista>,
        false
      );

    }
  };

  return (
    <Pressable
      style={{ flex: 1 }}
      onTouchStart={() => {
        settimer(0);
      }}
    >
      <Vista style={{ flex: 1, marginHorizontal: MIDES.xxxSmall }}>
        <HVista
          align="baseline"
          justify="space-between"
          style={{ marginVertical: MIDES.medium, marginBottom: MIDES.huge, marginHorizontal:MIDES.xxxSmall }}
        >
          <Text style={{ fontWeight: "bold", fontSize: MIDES.xLarge }}>
            Ordres
          </Text>
          <Text>{moment().format("dddd  DD/MM")}</Text>
          {/* <Boto
            color={COLORS.gris[700]}
            style={{ padding: 7 }}
            onPress={() => refetchOrdresActuals()}
          >
            <Icona type={IconType.MaterialCommunityIcons} name={"reload"} />
          </Boto> */}
        </HVista>

        {isLoadingOrdresActuals ? (
          <Carregant />
        ) : errorOrdresActuals ? (
          <Error />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ordresActuals}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                  setrefreshing(true);
                  await refetchOrdresActuals();
                  setrefreshing(false);
                }}
                colors={[COLORS.primari50]}
                progressBackgroundColor={COLORS.fonsTargeta}
                tintColor={COLORS.primari50}
              />
            }
            ListEmptyComponent={() => (
              <Vista
                align="center"
                justify="center"
                gap={30}
                style={{ marginTop: 50 }}
              >
                <Icona
                  type={IconType.Feather}
                  name={"file-text"}
                  size={48}
                  color={COLORS.gris[600]}
                />
                <Text to="secundari">No hi ha cap ordre pendent</Text>
              </Vista>
            )}
            ItemSeparatorComponent={() => (
              <Vista style={{ height: 10 }}></Vista>
            )}
            ListFooterComponent={() => <Vista style={{ height: 100 }}></Vista>}
            renderItem={({ item }) => (
              <OrdreListTargeta
                ordre={item}
                onRequestExecutarOrdre={onRequestExecutarOrdre}
              />
            )}
            keyExtractor={(item, index) => item.id?.toString() ?? index}
          />
        )}
      </Vista>
    </Pressable>
  );
};

export default OrdresPage;
