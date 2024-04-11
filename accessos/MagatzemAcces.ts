import { useAPIFetch } from "@/hooks/useAPIFetch";
import { URL_SERVIDOR } from "./SERVER_CONFIG";
import { InformacioOcupacio } from "@/models/DTOs/InformacioOcupacio";

const URL_MAGATZEM_CONTROLLER = 'api/v1/magatzem/'


export function GetUbicacionsResum(){

  const {data, isLoading, error, refetch} = useAPIFetch<InformacioOcupacio>(`${URL_SERVIDOR}${URL_MAGATZEM_CONTROLLER}Informacio`);

  return {
      resumUbicacions: data,
      isLoadingResumUbicacions : isLoading,
      errorResumUbicacions: error,
      refetchResumUbicacions: refetch
    };
}