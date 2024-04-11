import { Accio } from "./Accio";
import { Contenidor } from "./Contenidor";

export interface PasGaveta {
  id: string;
  estat: enumEstatPas,
  accioInicial: enumTipusAccioInicial,
  accioFinal: enumTipusAccioFinal,

  contenidor: Contenidor,

  accions: Accio[]

}

export enum enumTipusAccioInicial {
  RecollirGaveta,
  IntroduirGavetaNova,
}
export enum enumTipusAccioFinal {
  GuardarGaveta,
  EliminarGaveta,
}

export enum enumEstatPas{
  Pendent,
  EnProces,
  Finalitzant,
  Finalitzat,
  Cancellat,
  Error
}