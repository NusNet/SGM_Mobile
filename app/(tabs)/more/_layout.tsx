import { Vista } from '@/components/base/ThemedView'
import { useTema } from '@/context/TemaProvider'
import { Stack } from 'expo-router'
import React from 'react'

const MoreLayout = () => {
  const{ COLORS} = useTema()
  return (
    <Vista style={{flex:1, backgroundColor:COLORS.fonsBase}}>

    <Stack  screenOptions={{animation:"fade", contentStyle:{backgroundColor:COLORS.fonsBase}}} >
          <Stack.Screen  name="index" options={{headerShown:false, }} />
          <Stack.Screen name="InventariPage" options={{ headerShown: false }} />
          <Stack.Screen name="ProductesPage" options={{ headerShown: false }} />
          <Stack.Screen name="SuportPage" options={{ headerShown: false }} />
          <Stack.Screen name="ConfiguracioPage" options={{ headerShown: false }} />
          <Stack.Screen name="RegistreOrdresPage" options={{ headerShown: false }} />
          <Stack.Screen name="InformacioOrdre/[idOrdre]" options={{ headerShown: false }} />
          <Stack.Screen name="EdicioTecnicaPage" options={{ headerShown: false }} />

        </Stack>
    </Vista>
  )
}

export default MoreLayout