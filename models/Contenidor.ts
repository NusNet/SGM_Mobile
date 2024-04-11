import { Producte } from "./Producte";

export interface Contenidor{
    id:string,
    quantitatEnUs:number,
    quantitatDisponible:number,
    quantitatReservada:number,

    producte:Producte
}