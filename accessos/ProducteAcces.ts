import { useAPIFetch } from "@/hooks/useAPIFetch";
import { Producte } from "@/models/Producte";
import { URL_SERVIDOR } from "./SERVER_CONFIG";
import { InformacioProducte } from "@/models/DTOs/InformacioProducte";
import { ResumProductes } from "@/models/DTOs/ResumProductes";

const URL_CONTROLLER = 'api/v1/Mobile/'
const URL_PRODUCTE_CONTROLLER = 'api/v1/producte/'

export function GetProductesInventari(){

    const {data, isLoading, error, refetch} = useAPIFetch<Producte[]>(`${URL_SERVIDOR}${URL_PRODUCTE_CONTROLLER}SenseInventari`);

    return {
        productesInventari: data,
        isLoadingProductesInventari : isLoading,
        errorProductesInventari: error,
        refetchProductesInventari: refetch
      };
}

export function GetProductesEnEstoc(){

  const {data, isLoading, error, refetch} = useAPIFetch<Producte[]>(`${URL_SERVIDOR}${URL_PRODUCTE_CONTROLLER}EnEstoc`);

  return {
      productesEnEstoc: data,
      isLoadingEnEstoc : isLoading,
      errorProductesEnEstoc: error,
      refetchProductesEnEstoc: refetch
    };
}

export function GetInformacioProducte(producteReferencia:string){

  const {data, isLoading, error, refetch} = useAPIFetch<InformacioProducte>(`${URL_SERVIDOR}${URL_PRODUCTE_CONTROLLER}${producteReferencia}/Informacio`);

  return {
      informacioProducte: data,
      isLoadingInformacioProducte : isLoading,
      errorInformacioProducte: error,
      refetchInformacioProducte: refetch
    };
}

export function GetProductesResum(){

  const {data, isLoading, error, refetch} = useAPIFetch<ResumProductes>(`${URL_SERVIDOR}${URL_PRODUCTE_CONTROLLER}Informacio`);

  return {
      resumProductes: data,
      isLoadingResumProductes : isLoading,
      errorResumProductes: error,
      refetchResumProductes: refetch
    };
}