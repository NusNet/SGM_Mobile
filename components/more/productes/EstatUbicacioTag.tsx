import { Text } from '@/components/base/ThemedText';
import { useTema } from '@/context/TemaProvider';
import { enumEstatUbicacio } from '@/models/DTOs/InformacioProducte'
import React from 'react'

const EstatUbicacioTag = ({estat, midaText}:{estat:enumEstatUbicacio, midaText?:number}) => {

    const {COLORS,MIDES} = useTema();

var color:string ="";

    switch (estat) {
        case enumEstatUbicacio.Lliure:
          color = COLORS.exit;
          break;
        case enumEstatUbicacio.Ocupada:
          color = COLORS.alerta;
          break;
        case enumEstatUbicacio.Reservada:
          color = COLORS.alertaGroc;
    
          break;
        case enumEstatUbicacio.Recollint:
          color = COLORS.link;
    
          break;
        case enumEstatUbicacio.ErrorBuida:
            case enumEstatUbicacio.ErrorOcupada:
        case enumEstatUbicacio.Error:
          color = COLORS.error;
    
          break;
        default:
          break;
      }
  return (
    <Text color={color} mida={midaText ?? MIDES.medium}>{enumEstatUbicacio[estat]}</Text>
  )
}

export default EstatUbicacioTag