import { View, Pressable, Dimensions, StyleSheet, Keyboard } from "react-native";
import { IconType, Icona } from "../base/ThemedIcon";
import { useTema } from "@/context/TemaProvider";
import { Text } from "../base/ThemedText";
import { Vista } from "../base/ThemedView";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");

export default function TabBar({ state, descriptors, navigation, props }: any) {
  const { COLORS } = useTema();


  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: COLORS.fonsTargeta,
          borderColor: COLORS.primari,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            onPress={onPress}
            style={{
              borderRadius: 20,
              flex: 1,
            }}
            key={index}
          >
            <View style={[styles.mainItemContainer]}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  paddingTop: 5,
                  paddingBottom: 10,
                  borderTopWidth: 3,
                  borderColor: isFocused ? COLORS.primari : "transparent",
                }}
              >
                <NavIcon
                  tabName={label}
                  isFocused={isFocused}
                  color={isFocused ? COLORS.primari : COLORS.text}
                />
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    borderRadius: 5,
    borderTopWidth: 1,
    paddingHorizontal: width * 0.1,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 0,
    borderRadius: 1,
  },
});

type NavIconProps = {
  tabName: string;
  color: string;
  isFocused:boolean
};
function NavIcon({ tabName, color, isFocused }: NavIconProps) {
  const { COLORS, MIDES } = useTema();
  switch (tabName) {
    case "EstacioPage":
      return (
        <Vista
          style={{
            borderWidth: 2,
            borderTopWidth:1.5,
            borderBottomWidth: 3,
            borderRadius: 12,
            borderColor: COLORS.primari,
            paddingVertical:10,
            marginTop:-16,
            paddingHorizontal: 10,
            backgroundColor: isFocused? color : COLORS.fonsTargeta
          }}
          justify="center" align="center"
        >
          <Text style={{fontWeight:"bold", fontSize: 20, textAlign:"center" }} color={isFocused?COLORS.blanc: COLORS.gris[300]}>
            EM1
          </Text>
        </Vista>
        // <Icona
        //   type={IconType.FontAweomseIcon}
        //   name={"list-alt"}
        //   size={30}
        //   color={color}
        // />
      );
    case "OrdresPage":
      return (
        <Icona
          type={IconType.Feather}
          name={"file-text"}
          size={28}
          color={color}
        />
      );
    case "more":
      return (
        <Icona type={IconType.AntDesign} name={"appstore-o"} size={26} color={color} />
      );
    default:
      return (
        <Icona
          type={IconType.MatetrialIcon}
          name={"report"}
          size={28}
          color={"red"}
        />
      );
  }
}
