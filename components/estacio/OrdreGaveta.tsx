import { PutAccioRealitzada } from "@/accessos/OrdreAcces";
import { useEstacioContext } from "@/context/EstacioContext";
import { useTema } from "@/context/TemaProvider";
import { Accio } from "@/models/Accio";
import { AccioProducteRealitzat } from "@/models/DTOs/AccioProducteRealitzat";
import { OrdreComplet, enumEstatOrdre, enumTipusOrdre } from "@/models/Ordre";
import { PasGaveta, enumEstatPas } from "@/models/PasGaveta";
import React, { useState } from "react";
import { Vista } from "../base/ThemedView";
import AccioInventariTargeta from "./AccioInventariTargeta";
import AccioTargeta from "./AccioTargeta";
import PassosOrdreList from "./PassosOrdreList";

const OrdreGaveta = ({
  ordre,
  onRequestEntrarGaveta,
}: {
  ordre: OrdreComplet;
  onRequestEntrarGaveta: (idGaveta: string) => void;
}) => {
  const { COLORS, MIDES } = useTema();
  const { IdLectura } = useEstacioContext();
  const [pasSeleccionat, setpasSeleccionat] = useState<PasGaveta | undefined>();

  const accioRealitzada = async (accio: Accio) => {
    try {
      var obj: AccioProducteRealitzat = {
        IdAccio: accio.id,
        IdEstacio: "EM1",
        IdGaveta: IdLectura ?? "",
        IdOrdre: ordre.id,
        IdProducte: accio.producte.referencia,
        Quantitat: accio.quantitat,
      };

      await PutAccioRealitzada(obj, accio.tipus);
      var accioneta = ordre.passos.find((p) => p.accions[0].id === accio.id)
        ?.accions[0];
      if (accioneta) accioneta.estat = enumEstatPas.Finalitzat;
      accio.estat = enumEstatPas.Finalitzat;
    } catch (err) {
      console.log("ERROR put accio realitzada", err);
    }
  };
  return (
    <Vista style={{ flex: 1 }} gap={MIDES.medium}>
      <PassosOrdreList
        tipusOrdre={ordre.tipus}
        passos={ordre.passos}
        onPasSeleccionat={(pas) => setpasSeleccionat(pas)}
      />
      {pasSeleccionat && (
        <Vista style={{ paddingHorizontal: MIDES.xSmall }}>
          {ordre.tipus === enumTipusOrdre.Inventari ? (
            <AccioInventariTargeta
              accio={pasSeleccionat.accions[0]}
              contenidor={pasSeleccionat.contenidor}
              onRequestEntrarGaveta={onRequestEntrarGaveta}
            />
          ) : (
            <AccioTargeta
              accio={pasSeleccionat.accions[0]}
              contenidor={pasSeleccionat.contenidor}
              onAccioRealitzada={accioRealitzada}
              onRequestEntrarGaveta={onRequestEntrarGaveta}
            />
          )}
        </Vista>
      )}
    </Vista>
  );
};

export default OrdreGaveta;
