import { PasGaveta } from "./PasGaveta";

export interface Ordre {
  id: number;
  idOrdre: number;
  idComanda: number;
  tipus: enumTipusOrdre;
  estat: enumEstatOrdre;
  quantitatGavetes: number;
  data:string;
  dataInici:string;
  dataFi:string;
}

export enum enumTipusOrdre {
  EntradaProducte,
  SortidaProducte,
  Inventari = 10,
}
export enum enumEstatOrdre{
    Pendent,
    EnProces,
    Finalitzant,
    Finalitzat,
    Error,
    Cancellat
}

export interface OrdreComplet{
  id: number;
  idOrdre: number;
  idComanda: number;
  tipus: enumTipusOrdre;
  estat: enumEstatOrdre;
  data:string;
  dataInici:string;
  dataFi:string;

  passos:PasGaveta[]
}