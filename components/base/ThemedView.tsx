import {
  View as DefaultView,
  FlexAlignType,
  ViewProps
} from "react-native";
import { useTema } from "../../context/TemaProvider";

export type FlexJustifyType =
  | "space-between"
  | "center"
  | "flex-end"
  | "flex-start"
  | "space-around"
  | "space-evenly";

export interface CustomVistaProps {
  justify?: FlexJustifyType,
  align?: FlexAlignType,
  gap?: number 
}
export type VistaProps = ViewProps & CustomVistaProps;
export function HVista(props: VistaProps) {
  const { style, ...otherProps } = props;

  const stylePagina = {
    flexDirection: "row",
    alignItems: props.align,
    //flexWrap: "wrap",
    overflow:"hidden",
    justifyContent: props.justify,
    gap: props.gap ?? 0,
  } as const;
  return <DefaultView style={[stylePagina, style]} {...otherProps} />;
}
export function Vista(props: VistaProps) {
  const { style, ...otherProps } = props;

  const stylePagina = {
    flexDirection: "column",
    alignItems:  props.align ,
    //flexWrap: "wrap",
    overflow:"hidden",
    justifyContent: props.justify,
    gap: props.gap ?? 0,
  } as const;
  return <DefaultView style={[stylePagina, style]} {...otherProps} />;
}

export type SeparadorProps = {vertical?:boolean, color?:string, marge?:number, percentOcupacio?:string} & ViewProps
export function Separador(props: SeparadorProps){
  const { COLORS, MIDES } = useTema();

  const {vertical = false, color, marge,percentOcupacio,  style, ...otherProps} = props;
  const styleSeparador = {
    height: vertical? percentOcupacio ?? "95%": 1,
    alignSelf:"center",
    width: vertical? 1: percentOcupacio ??"95%",
    marginVertical: marge ?? MIDES.xSmall,
    backgroundColor: color ?? COLORS.gris[700],
    borderRadius:3
  } as ViewProps["style"];
  return <DefaultView style={[styleSeparador, style]} {...otherProps} />;
}

