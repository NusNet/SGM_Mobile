import { createContext, useContext, useState } from "react";

export enum RolUsuari {
  Basic,
  Admin,
}

export interface RolContextProps {
  setRol: (rol: RolUsuari | undefined) => void;
  rol: RolUsuari | undefined;
  esAdmin:boolean;
}
export const RolContext = createContext<RolContextProps>({
  setRol: (rol: RolUsuari | undefined) => {},
  rol: undefined,
  esAdmin:false,
});

export const RolProvider = ({ children }: { children: React.ReactNode }) => {

    const [rolEps, setRolEps] = useState<RolUsuari|undefined>(undefined);
    
    const [esAdmin, setEsAdmin] = useState<boolean>(false)
    const defaultRol = {
        rol: rolEps,
        setRol: (rol : RolUsuari|undefined) => {setRolEps(rol); setEsAdmin(rol === RolUsuari.Admin)},
        esAdmin : esAdmin
    }

    return(
        <RolContext.Provider value={defaultRol}>
            {children}
        </RolContext.Provider>
    )
}
export const useRolContext = () => useContext(RolContext);
