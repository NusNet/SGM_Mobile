import { IconType, Icona } from "@/components/base/ThemedIcon";
import { Text } from "@/components/base/ThemedText";
import { HVista, Vista } from "@/components/base/ThemedView";
import { RolUsuari, useRolContext } from "@/context/RolContext";
import { useTema } from "@/context/TemaProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
  Vibration,
} from "react-native";
const { width, height } = Dimensions.get("window");

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
const dialPadSize = width * 0.2;
const pinLength = 4;

const BASIC_PIN = [9, 6, 5, 4];
const ADMIN_PIN = [1, 1, 1, 3];

export default function LogIn() {
  const [pinCode, setPinCode] = useState<number[]>([]);
  const { rol, setRol } = useRolContext();
  const { COLORS } = useTema();
  
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const [colorPin, setcolorPin] = useState(COLORS.gris[300]);

  useEffect(() => {
    // console.log(pinCode, REAL_PIN);
    if (pinCode.length === pinLength) {
      if (JSON.stringify(pinCode) === JSON.stringify(BASIC_PIN)) {
        console.log("LOG IN");
        Vibration.vibrate(50);
        setcolorPin(COLORS.exit);
        setRol(RolUsuari.Basic);
        setTimeout(() => {
          setPinCode([]);
          router.replace("/(tabs)/EstacioPage");
        }, 350);
      } else if (JSON.stringify(pinCode) === JSON.stringify(ADMIN_PIN)) {
        console.log("LOG IN ADMIN");
        Vibration.vibrate(50);
        setcolorPin(COLORS.exit);
        setShowAdminLogin(true);
        setRol(RolUsuari.Admin);
        setTimeout(() => {
          setPinCode([]);
          router.replace("/(tabs)/EstacioPage");
        }, 350);
      } else {
        setcolorPin(COLORS.error);
        Vibration.vibrate(400);
        setTimeout(() => {
          setPinCode([]);
          setcolorPin(COLORS.gris[300]);
        }, 200);
      }
    }
  }, [pinCode]);

  const DialPad = ({
    onPress,
  }: {
    onPress: (item: number | string) => void;
  }) => {
    return (
      <Vista style={{ height: 420 }}>
        <FlatList
          data={dialPad}
          numColumns={3}
          style={{ flexGrow: 1 }}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          columnWrapperStyle={{ gap: 20 }}
          contentContainerStyle={{ gap: 20 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                delayPressIn={0}
                delayPressOut={0}
                onPress={() => {
                  onPress(item);
                  Vibration.vibrate(30);
                }}
                disabled={item === ""}
              >
                <Vista
                  align="center"
                  justify="center"
                  style={{
                    width: dialPadSize,
                    height: dialPadSize,
                    borderRadius: dialPadSize / 2,
                  }}
                >
                  {item === "del" ? (
                    <Ionicons
                      name="backspace-outline"
                      size={dialPadSize / 2.5}
                      color={COLORS.gris[500]}
                    />
                  ) : item === "" ? (
                    <Ionicons
                      name="finger-print"
                      size={dialPadSize / 2}
                      color={"transparent"}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: dialPadSize / 3,
                      }}
                    >
                      {item}
                    </Text>
                  )}
                </Vista>
              </TouchableOpacity>
            );
          }}
        />
      </Vista>
    );
  };

  return (
    <Vista
      align="center"
      justify="space-between"
      style={{
        flex: 1,
        backgroundColor: COLORS.fonsBase,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Vista
        style={{
          marginTop: 100,
          backgroundColor: COLORS.primari,
          borderRadius: 16,
          elevation: 9,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          padding: 10,
          paddingTop: 0,
        }}
        justify="center"
        align="center"
      >
        <Icona
          type={IconType.MaterialCommunityIcons}
          name={"warehouse"}
          size={100}
        />
      </Vista>

      <Vista
        style={{
          marginBottom: 0,

        }}
        justify="center" align="center" gap={10}
      >
        <HVista gap={20} align="flex-end" style={{height:30}}>
          {[...Array(pinLength).keys()].map((index) => {
            const isSelected =
              pinCode[index] != undefined || pinCode[index] != null;
            return (
              <Vista
                key={index}
                style={{
                  width: 18,
                  height: isSelected ? 18 : 2,
                  borderRadius: 22,
                  backgroundColor: colorPin,
                }}
              />
            );
          })}
        </HVista>
        {showAdminLogin &&
        <Text color={COLORS.exit} pes="negreta">Admin</Text>
        }
      </Vista>
      <DialPad
        onPress={async (item) => {
          setcolorPin(COLORS.gris[300]);

          if (item === "del") {
            setPinCode((prevCode) => prevCode.slice(0, prevCode.length - 1));
          } else if (pinCode.length >= pinLength) {
            return;
          } else if (typeof item === "number") {
            setPinCode((prevCode) => [...prevCode, item]);
          }
        }}
      />
    </Vista>
  );
}
