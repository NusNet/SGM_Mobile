import React from 'react'
import { BottomSheetModal,  } from "@gorhom/bottom-sheet";
import { useTema } from '@/context/TemaProvider';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import CustomBackdrop from './CustomBackdrop';
import { SharedValue } from 'react-native-reanimated';

const CustomBottomSheetModal = ({innerRef, onRequestDismiss, children, snapPoints, initialSnapPointIndex}
  :{innerRef: React.RefObject<BottomSheetModalMethods>, onRequestDismiss: () =>void, children:React.ReactNode, 
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]> | Readonly<(string | number)[] | SharedValue<(string | number)[]>> | undefined,
  initialSnapPointIndex?:  number | undefined}) => {

  const { esFosc, COLORS, MIDES } = useTema();

  return (
    <BottomSheetModal
    ref={innerRef}
    index={initialSnapPointIndex ?? 0}
    style={{borderTopColor:COLORS.gris[600], borderWidth: esFosc? 1:0, flex:1, borderRadius:10}}
    handleIndicatorStyle={{backgroundColor:COLORS.gris[500]}}
    handleStyle={{backgroundColor:COLORS.fonsBase, borderRadius:10 }}
    backgroundStyle={{backgroundColor:COLORS.fonsBase, flex:1}}
    backdropComponent={(props) => (
      <CustomBackdrop
        {...props}
        onRequestDismiss={onRequestDismiss}
      />
    )}
    snapPoints={snapPoints ?? ["65%"]} 
  >
        

      {children}


  </BottomSheetModal>
  )
}

export default CustomBottomSheetModal