import { useTema } from '@/context/TemaProvider'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Carregant = ({padding, centrat}:{padding?:number, centrat?:boolean}) => {

    const{COLORS} = useTema()

  return (
    <View style={{flex:centrat?1:0, padding: padding?? 30, justifyContent:"center", alignItems:"center" }}>

    <ActivityIndicator size="large" color={COLORS.primari50} />
  </View>  )
}

export default Carregant