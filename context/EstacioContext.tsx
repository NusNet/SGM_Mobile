import { createContext, useContext, useState } from "react";

export interface EstacioContextProps {
    setIdLectura: (lectura:string|undefined) =>void,
    IdLectura?: string|undefined,
  }
export const EstacioContext = createContext<EstacioContextProps>({
    setIdLectura: (lectura:string|undefined) =>{},
    IdLectura:undefined
})

type Props={
    children:React.ReactNode;
}

export const EstacioProvider = ({children}:Props)=>{

    const [idLectura, setIdLectura] = useState<string|undefined>(undefined);


    const defaultTheme = {
        IdLectura: idLectura,
        setIdLectura: (lectura : string|undefined) =>setIdLectura(lectura)
    }

    return(
        <EstacioContext.Provider value={defaultTheme}>
            {children}
        </EstacioContext.Provider>
    )
}

export const useEstacioContext  = () =>useContext(EstacioContext)