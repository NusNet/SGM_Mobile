import { GetEstacio } from "@/accessos/EstacioAcces";
import { Titol } from "@/components/base/ThemedText";
import { HVista, Vista } from "@/components/base/ThemedView";
import EstacioBuida from "@/components/estacio/EstacioBuida";
import EstatEstacio from "@/components/estacio/EstatEstacio";
import OrdresGaveta from "@/components/estacio/OrdresGaveta";
import { useEstacioContext } from "@/context/EstacioContext";
import { useTema } from "@/context/TemaProvider";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {Error} from "@/components/generic/Error";
import { Text } from "@/components/base/ThemedText";
import { Boto,  } from "@/components/base/ThemedPress";
import Carregant from "@/components/generic/Carregant";
import { IconType, Icona } from "@/components/base/ThemedIcon";

const REFRESH_TIME = 5;
export default function EstacioPage() {
  const { COLORS, MIDES } = useTema();
  const { IdLectura, setIdLectura } = useEstacioContext();

  const { estacio, isLoadingEstacio, errorEstacio, refetchEstacio } =
    GetEstacio("EM1");

  const onForcarRefresc = () => {
    setIdLectura("");
    refetchEstacio();
  };

  useEffect(() => {
    if (estacio && estacio?.idLectura !== IdLectura) {
      console.log(
        "IdLectura Estacio ha canviat",
        IdLectura,
        estacio?.idLectura
      );
      setIdLectura(estacio?.idLectura);
    }
  }, [estacio]);

  const [timer, settimer] = useState<number>(0);
  useEffect(() => {
    const t = setTimeout(() => {
      settimer((prev) => prev + 1);
    }, 1000);

    if (timer >= REFRESH_TIME) {
      refetchEstacio();
      settimer(0);
    }

    return () => {
      clearTimeout(t);
    };
  }, [timer]);

  if (errorEstacio) return <Error flexi/>;
  return (
    <Vista style={{ flex: 1 }}>
      {/* TITOL ESTACIO */}
      <HVista
        justify="space-between"
        align="center"
        style={{
          paddingHorizontal: MIDES.medium,
          backgroundColor: COLORS.primari,
          paddingVertical: MIDES.xxxLarge,
          borderBottomLeftRadius:6,
          borderBottomRightRadius:6
        }}
      >
        <HVista gap={10} align="center">
          <Titol style={{ color: COLORS.blanc }}>Estació</Titol>
          <Titol style={{ color: COLORS.blanc }}>EM1</Titol>
          <Boto onPress={() => onForcarRefresc()}>
            <Vista style={{ opacity: 0.5 }}>
              <Icona
                type={IconType.MaterialCommunityIcons}
                name={"reload"} 
                color={COLORS.blanc}
              />
            </Vista>
          </Boto>
        </HVista>
        <EstatEstacio idLectura={IdLectura} />
      </HVista>

      {!IdLectura ? (
        <EstacioBuida />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <OrdresGaveta idGaveta={IdLectura} />
        </ScrollView>
      )}
    </Vista>
  );
}
