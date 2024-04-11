import { Vista } from "@/components/base/ThemedView";
import { createContext, useContext, useState } from "react";
import { Modal, useWindowDimensions } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/base/ThemedText";
import { Boto } from "@/components/base/ThemedPress";
import { useTema } from "./TemaProvider";
import { Cobertura } from "@/components/generic/Cobertura";
export interface ModalProviderProps {
  isModalOpen: boolean;
  openModal: (children: React.ReactNode, viewConfirm?: boolean) => void;
}
export const ModalContext = createContext<ModalProviderProps>({
  openModal: (children: React.ReactNode, viewConfirm?: boolean) => {},
  isModalOpen: false,
});

type Props = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const { COLORS, MIDES } = useTema();

  const { width } = useWindowDimensions();
  const [viewConfirmButtons, setviewConfirmButtons] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.ReactNode>();
  const defaultTheme = {
    isModalOpen: modalVisible,
    openModal: (children: React.ReactNode, viewConfirm?: boolean) => {
      setModalVisible(true);
      setModalChildren(children);
      setviewConfirmButtons(viewConfirm ?? true);
    },
  };

  return (
    <ModalContext.Provider value={defaultTheme}>
      <Vista style={{ flex: 1 }}>
        {children}
        {modalVisible && (
          <Cobertura colorFons={COLORS.fonsBase} opacitat={0.7}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Pressable
                style={{ flex: 1 }}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.centeredView}>
                  <View
                    style={[
                      styles.modalView,
                      {
                        width: width * 0.85,
                        backgroundColor: COLORS.fonsTargeta,
                      },
                    ]}
                  >
                    {modalChildren}
                    {viewConfirmButtons && (
                      <Boto
                        style={{ paddingHorizontal: 30, paddingVertical: 8 }}
                        color={COLORS.primari50}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text>D'acord</Text>
                      </Boto>
                    )}
                  </View>
                </View>
              </Pressable>
            </Modal>
          </Cobertura>
        )}
      </Vista>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 22,
  },
  modalView: {
    gap: 15,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
