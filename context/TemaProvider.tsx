import React, {createContext, useEffect, useState, useContext, PropsWithChildren} from "react";
import COLORS from "@/constants/Tema/Colors";
import OMBRES from "@/constants/Tema/Ombres";
import MIDES from "@/constants/Tema/Mides";
import { useColorScheme } from "react-native";

export const TemaContext = createContext({
    COLORS: COLORS.clar,
    OMBRES: OMBRES.light,
    MIDES: MIDES.normal,
    esFosc: false,
    setTema: (scheme:string) =>{},

})

type Props = {
    children: React.ReactNode;
  };
  
export const TemaProvider= ({  children }: Props) =>{

    const colorScheme = useColorScheme(); // dark, light, null
    const [isDark, setisDark] = useState(colorScheme == 'dark');
    useEffect(()=>{
        setisDark(colorScheme == "dark")
    }, [colorScheme])

    const defaultTheme = {
        esFosc: isDark,
        COLORS: isDark ? COLORS.fosc : COLORS.clar,
        OMBRES: isDark ? OMBRES.dark: OMBRES.light,
        MIDES: MIDES.normal,
        setTema: (scheme : string) =>setisDark(scheme  === 'fosc')
    }

    return(
        <TemaContext.Provider value={defaultTheme}>
            {children}
        </TemaContext.Provider>
    )
}

export const useTema = () => useContext(TemaContext);