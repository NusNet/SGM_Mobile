export interface AccioProducteModQuantitat{
    IdAccio:string,
    IdEstacio:string,
    NovaQuantitat:number,
    VellaQuantitat:number,
    TipusCanvi:enumTipusCanviQuantitat
}

export enum enumTipusCanviQuantitat{
    Voluntari,
    DiferenciaEstoc
}