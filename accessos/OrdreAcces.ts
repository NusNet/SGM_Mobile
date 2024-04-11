import { useAPIFetch } from "@/hooks/useAPIFetch";
import { Ordre, OrdreComplet } from "@/models/Ordre";
import { URL_SERVIDOR } from "./SERVER_CONFIG";
import { AccioProducteRealitzat } from "@/models/DTOs/AccioProducteRealitzat";
import doRequest from "@/hooks/doAPIRequest";
import { enumTipusAccio } from "@/models/Accio";
import { AccioProducteModQuantitat } from "@/models/DTOs/AccioProducteModQuantitat";
import { OrdreInventariAdd } from "@/models/DTOs/OrdreInventariAdd";
import { InformacioOrdres } from "@/models/DTOs/InformacioOrdres";
import moment from "moment";

const URL_CONTROLLER = "api/v1/Mobile/";
const URL_GAVETA_CONTROLLER = "api/v1/gaveta/";
const URL_ORDRE_CONTROLLER = "api/v1/OrdreRecanvi/";
const URL_ORDREINVENTARI_CONTROLLER = "api/v1/OrdreInventari/";

export function GetOrdresActuals() {
  const { data, isLoading, error, refetch } = useAPIFetch<Ordre[]>(
    `${URL_SERVIDOR}${URL_CONTROLLER}ordres/actuals`
  );

  return {
    ordresActuals: data,
    isLoadingOrdresActuals: isLoading,
    errorOrdresActuals: error,
    refetchOrdresActuals: refetch,
  };
}

export function GetOrdresGaveta(idGaveta: string) {
  const { data, isLoading, error, refetch } = useAPIFetch<OrdreComplet[]>(
    `${URL_SERVIDOR}${URL_CONTROLLER}ordres/gaveta/${idGaveta}`
  );

  return {
    ordresGaveta: data,
    isLoadingOrdresGaveta: isLoading,
    errorOrdresGaveta: error,
    refetchOrdresGaveta: (nouIdGaveta: string) =>
      refetch(`${URL_SERVIDOR}${URL_CONTROLLER}ordres/gaveta/${nouIdGaveta}`),
  };
}

export type OrdresLlistaFiltre = "Dia" | "Setmana" | "Mes" | "Històric";
export function GetOrdresLlista(filtre: OrdresLlistaFiltre) {
  function ObtenirDates(filtre: OrdresLlistaFiltre): string {
    var dataInici = "";
    var dataFi = "";
    switch (filtre) {
      case "Dia":
        dataInici = moment().startOf("day").format("YYYYMMDDHHmmss");
        dataFi = moment().endOf("day").format("YYYYMMDDHHmmss");
        break;
      case "Setmana":
        dataInici = moment()
          .subtract(7, "days")
          .startOf("day")
          .format("YYYYMMDDHHmmss");
        dataFi = moment().endOf("day").format("YYYYMMDDHHmmss");
        break;

      case "Mes":
        dataInici = moment()
          .subtract(30, "days")
          .startOf("day")
          .format("YYYYMMDDHHmmss");
        dataFi = moment().endOf("day").format("YYYYMMDDHHmmss");
        break;

      default:
        dataInici = moment()
          .subtract(365, "days")
          .startOf("day")
          .format("YYYYMMDDHHmmss");
        dataFi = moment().endOf("day").format("YYYYMMDDHHmmss");
        break;
    }
    return `${dataInici}/${dataFi}`;
  }

  const { data, isLoading, error, refetch } = useAPIFetch<Ordre[]>(
    `${URL_SERVIDOR}${URL_ORDRE_CONTROLLER}llista/${ObtenirDates(filtre)}`
  );

  return {
    ordres: data,
    isLoadingOrdres: isLoading,
    errorOrdres: error,
    refetchOrdres: (filtre: OrdresLlistaFiltre) =>
      refetch(
        `${URL_SERVIDOR}${URL_ORDRE_CONTROLLER}llista/${ObtenirDates(filtre)}`
      ),
  };
}

export function GetFullOrdre(idOrdre: number) {
  const { data, isLoading, error, refetch } = useAPIFetch<OrdreComplet>(
    `${URL_SERVIDOR}${URL_CONTROLLER}ordres/${idOrdre}`
  );

  return {
    ordre: data,
    isLoadingOrdre: isLoading,
    errorOrdre: error,
    refetchOrdre: (nouIdOrdre: number) =>
      refetch(`${URL_SERVIDOR}${URL_ORDRE_CONTROLLER}${idOrdre}`),
  };
}

export async function PutAccioRealitzada(
  accio: AccioProducteRealitzat,
  tipus: enumTipusAccio
) {
  var url: string = `${URL_SERVIDOR}${URL_GAVETA_CONTROLLER}${
    tipus === enumTipusAccio.IntroduirProducte
      ? "AfegirProducte"
      : "TreureProducte"
  }`;

  var eps = await doRequest<any>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accio),
  });
}

export async function PutEditarQuantitatAccio(
  modDto: AccioProducteModQuantitat
) {
  var url: string = `${URL_SERVIDOR}${URL_GAVETA_CONTROLLER}ModificarAccio`;

  var eps = await doRequest<any>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modDto),
  });
}

export async function PutExecutarOrdre(idOrdre: number) {
  var url: string = `${URL_SERVIDOR}${URL_ORDRE_CONTROLLER}executar/${idOrdre}`;

  var eps = await doRequest<any>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PostNouInventari(nouInventari: OrdreInventariAdd) {
  var url: string = `${URL_SERVIDOR}${URL_ORDREINVENTARI_CONTROLLER}general`;

  var eps = await doRequest<any>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nouInventari),
  });
}

export function GetOrdresResum() {
  const { data, isLoading, error, refetch } = useAPIFetch<InformacioOrdres>(
    `${URL_SERVIDOR}${URL_ORDRE_CONTROLLER}Informacio`
  );

  return {
    resumOrdres: data,
    isLoadingResumOrdres: isLoading,
    errorResumOrdres: error,
    refetchResumOrdres: refetch,
  };
}

export async function DeleteCancellarOrdre(idOrdre:number){
  var url: string = `${URL_SERVIDOR}${URL_ORDRE_CONTROLLER}cancellacio/${idOrdre}`;

  var eps = await doRequest<any>(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}