import { useAPIFetch } from "@/hooks/useAPIFetch";
import { Ordre } from "@/models/Ordre";
import { URL_SERVIDOR } from "./SERVER_CONFIG";
import { Estacio } from "@/models/Estacio";
import doRequest from "@/hooks/doAPIRequest";
import { ModificarEstocInventari } from "@/models/DTOs/ModificarEstoc";

const URL_CONTROLLER = 'api/v1/Mobile/'
const URL_ESTACIO_CONTROLLER = 'api/v1/EstacioManual/'
const URL_GAVETA_CONTROLLER = 'api/v1/Gaveta/'

export function GetEstacio(idEstacio:string){

    const {data, isLoading, error, refetch} = useAPIFetch<Estacio>(`${URL_SERVIDOR}${URL_CONTROLLER}estacio/${idEstacio}`);

    return {
        estacio: data,
        isLoadingEstacio : isLoading,
        errorEstacio: error,
        refetchEstacio: refetch
      };
}

export async function PutEntrarGaveta(idEstacio:string){
  var url:string = `${URL_SERVIDOR}${URL_ESTACIO_CONTROLLER}EntrarGaveta/${idEstacio}`;

  var eps = await doRequest<any>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PutModificarEstoc(dto : ModificarEstocInventari){
  var url:string = `${URL_SERVIDOR}${URL_GAVETA_CONTROLLER}ModificarEstoc`;

  var eps = await doRequest<any>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });
}