import { ModalProvider } from "@/context/ModalProvider";
import { useTema } from "@/context/TemaProvider";
import {
  SafeAreaView,
  ViewProps,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { IconType, Icona } from "./ThemedIcon";

export function LayoutPrincipal(props: ViewProps) {
  const { style, children, ...otherProps } = props;
  const { COLORS } = useTema();

  const stylePagina: ViewProps["style"] = {
    flex: 1,
    backgroundColor: COLORS.fonsBase,
    position: "relative",
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={Platform.OS === "android" ? -64 : 0}
      >
        <ModalProvider>
          <View style={[stylePagina, style]}>
            {children}
          
          </View>
        </ModalProvider>
        <StatusBar backgroundColor={COLORS.primari} barStyle="light-content" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
