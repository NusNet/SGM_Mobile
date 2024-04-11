import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Text } from "@/components/base/ThemedText";
import { Keyboard, Platform, Pressable, StatusBar, View } from "react-native";
import { Vista } from "@/components/base/ThemedView";
import TabBar from "@/components/generic/TabBar";
import { useTema } from "@/context/TemaProvider";
import { IconType, Icona } from "@/components/base/ThemedIcon";
import { useRolContext } from "@/context/RolContext";

export default function TabLayout() {
  const { COLORS } = useTema();

  const { esAdmin } = useRolContext();

  return (
    <Vista
      style={{
        flex: 1,
        position: "relative",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Tabs
        screenOptions={{ tabBarHideOnKeyboard: true }}
        tabBar={(props) => <TabBar {...props} />}
        sceneContainerStyle={{ backgroundColor: COLORS.fonsBase }}
        initialRouteName="EstacioPage"
      >
        <Tabs.Screen
          name="OrdresPage"
          options={{
            freezeOnBlur: true,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="EstacioPage"
          options={{
            freezeOnBlur: true,
            headerShown: false,
            lazy: false,
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            href: "/more",
            headerShown: false,
            lazy: false,
          }}
        />
      </Tabs>
      {esAdmin && (
        <View
          style={{
            position: "absolute",
            bottom: 65,
            right: 10,
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7,
            borderBottomRightRadius: 7,
            borderTopRightRadius: 7,
            borderWidth: 1,
            borderColor: COLORS.exit,
            backgroundColor: COLORS.fonsBase,
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.exit25,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 3,
              paddingHorizontal: 8,
            }}
          >
            <Icona
              type={IconType.MatetrialIcon}
              name={"admin-panel-settings"}
              size={25}
              color={COLORS.exit}
            />
            <Text
              style={{ marginTop: -5, padding: 0 }}
              mida={9}
              pes="negreta"
              color={COLORS.exit}
            >
              Admin
            </Text>
          </View>
        </View>
      )}
    </Vista>
  );
}
