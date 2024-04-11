import React from 'react'
import { View, useWindowDimensions } from 'react-native'


const CarouselItem = ({children} :{children:React.ReactNode}) => {

    const {width} = useWindowDimensions();

  return (
    <View style={{flex:1, justifyContent:"flex-start", alignItems:"stretch", width: width, }}>

        {children}
    </View>
  )
}

export default CarouselItem