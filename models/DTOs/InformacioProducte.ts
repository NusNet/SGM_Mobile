export interface InformacioProducte{
    referencia:string,
    nom:string,
    estoc:number,

    gavetesProducte: InformacioGaveta[]

}

export interface InformacioGaveta{
    idGaveta:string,
    estatGaveta:enumEstatGaveta,
    idUbicacio:number,
    idPrestatgeria:number,
    columna:number,
    fila:number,
    estat: enumEstatUbicacio,

    quantitatProducte: number
}

export enum enumEstatGaveta{
    Correcte = 0,
    Error = 10,
    NoDisponible = 11,
    Trencada = 12,
}

export enum enumEstatUbicacio{
    Lliure = 1,
    Ocupada = 2,
    Reservada = 3,
    Recollint = 4,
    Error = 10, // Error sense especificar
    ErrorOcupada = 11, // La posició està ocupada quan hauria d'estar lliure
    ErrorBuida = 12, // La posició està buida quan hauria d'estar ocupada   
}