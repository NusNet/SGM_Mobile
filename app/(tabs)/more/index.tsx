import React, { useReducer, useState } from "react";
import { Text } from "@/components/base/ThemedText";
import { HVista, Separador, Vista } from "@/components/base/ThemedView";
import { Targeta } from "@/components/base/ThemedTargeta";
import { useTema } from "@/context/TemaProvider";
import { Pressable, RefreshControl, ScrollView } from "react-native";
import { router } from "expo-router";
import { IconType, Icona, IconaProp } from "@/components/base/ThemedIcon";
import ResumStats from "@/components/more/stats/ResumStats";
import { Pressionable } from "@/components/base/ThemedPress";
import { useRolContext } from "@/context/RolContext";
const MorePage = () => {
  const { COLORS, MIDES } = useTema();
  const { esAdmin } = useRolContext();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <Vista
        style={{
          flex: 1,
          marginHorizontal: MIDES.xxxSmall,
          paddingVertical: MIDES.medium,
        }}
        gap={35}
      >
        {/* RESUMS */}
        <Vista style={{ marginHorizontal: 3 }}>
          <ResumStats />
        </Vista>

        <Separador marge={5} percentOcupacio="55%" />
        {/* MENU */}
        <Vista gap={20}>
          <Targeta color={COLORS.gris[800]}>
            <MenuItem
              onPress={() => {
                router.push("/more/InventariPage");
              }}
              item={
                <HVista gap={5} align="center">
                  <Icona
                    type={IconType.Entypo}
                    name={"squared-plus"}
                    color={COLORS.inventari}
                    size={24}
                  />
                  <Text pes="negreta" color={COLORS.inventari}>
                    Inventari
                  </Text>
                </HVista>
              }
              icona={{
                type: IconType.MaterialCommunityIcons,
                name: "clipboard-edit-outline",
                color: COLORS.inventari,
                size: 24,
              }}
            />
            <Separador color={COLORS.gris[600]} />
            <MenuItem
              onPress={() => {
                router.push("/more/ProductesPage");
              }}
              itemText="Productes"
              icona={{
                type: IconType.MaterialCommunityIcons,
                name: "hammer-wrench",
                size: 24,
              }}
            />
            <Separador color={COLORS.gris[600]} />
            <MenuItem
              onPress={() => {
                router.push("/(tabs)/more/RegistreOrdresPage");
              }}
              itemText="Registre ordres"
              icona={{
                type: IconType.Ionicon,
                name: "file-tray-full",
                size: 23,
              }}
            />
          </Targeta>

          {/* <Text to="secundari" pes="negreta" style={{ marginTop: 30 }}>
            General
          </Text> */}

          <Targeta color={COLORS.gris[800]}>
            <MenuItem
              onPress={() => router.push("/(tabs)/more/ConfiguracioPage")}
              itemText="Configuració"
              icona={{
                type: IconType.FontAwesome6,
                name: "gear",
                size: 20,
              }}
            />
            <Separador color={COLORS.gris[600]} />
            <MenuItem
              onPress={() => router.push("/(tabs)/more/SuportPage")}
              itemText="Suport"
              icona={{
                type: IconType.MaterialCommunityIcons,
                name: "human-greeting-proximity",
                size: 22,
              }}
            />
          </Targeta>
        </Vista>

        {/* MENÚ ADMIN */}
        {esAdmin && (
          <Vista gap={20}>
            <Targeta color={COLORS.gris[800]}>
              <MenuItem
                onPress={() => {
                  router.push("/more/EdicioTecnicaPage");
                }}
                item={
                  <HVista gap={5} align="center">
                    <Icona
                      type={IconType.MatetrialIcon}
                      name={"admin-panel-settings"}
                      color={COLORS.gris[400]}
                      size={24}
                    />
                    <Text >
                      Edició tècnica
                    </Text>
                  </HVista>
                }
                icona={{
                  type: IconType.FontAwesome6,
                  name: "helmet-safety",
                  size: 20,
                }}
              />
            
           
            </Targeta>

          
          </Vista>
        )}
      </Vista>
    </ScrollView>
  );
};

type MenuItemProps = {
  item?: React.ReactNode;
  itemText?: string;
  icona?: IconaProp;
  onPress: () => void;
};
const MenuItem = ({ itemText, item, icona, onPress }: MenuItemProps) => {
  return (
    <Pressionable onPress={onPress}>
      <HVista
        align="center"
        gap={10}
        justify="space-between"
        style={{ padding: 10 }}
      >
        {item ?? <Text>{itemText}</Text>}
        {icona && (
          <Icona
            type={icona?.type}
            name={icona?.name}
            color={icona?.color}
            size={icona?.size}
          />
        )}
      </HVista>
    </Pressionable>
  );
};

export default MorePage;
