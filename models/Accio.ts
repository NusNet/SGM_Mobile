import { Contenidor } from "./Contenidor";
import { enumEstatOrdre } from "./Ordre";
import { enumEstatPas } from "./PasGaveta";
import { Producte } from "./Producte";

export interface Accio{
    id:string,
    tipus: enumTipusAccio,
    estat: enumEstatPas,
    producte: Producte,
    quantitat: number,
    quantitatEfectuada:number,
}

export enum enumTipusAccio{
    IntroduirProducte,
    TreureProducte,
    Recompte
}