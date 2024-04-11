import { Text } from '@/components/base/ThemedText';
import { useTema } from '@/context/TemaProvider';
import { enumEstatGaveta, enumEstatUbicacio } from '@/models/DTOs/InformacioProducte'
import React from 'react'
const EstatGavetaTag =  ({estat, midaText}:{estat:enumEstatGaveta, midaText?:number}) =>  {
    const {COLORS,MIDES} = useTema();

var color:string ="";

    switch (estat) {
        case enumEstatGaveta.Correcte:
          color = COLORS.exit;
          break;
        case enumEstatGaveta.NoDisponible:
          color = COLORS.alerta;
          break;
        case enumEstatGaveta.Trencada:
          color = COLORS.error;
    
          break;
        default:
          break;
      }
  return (
    <Text color={color} mida={midaText ?? MIDES.medium}>{enumEstatGaveta[estat]}</Text>
  )
}

export default EstatGavetaTag