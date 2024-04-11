import { TextProps, Text as DefaultText } from "react-native";
import { useTema } from "../../context/TemaProvider";
import React from "react";
import moment from "moment";

export type ToText = "normal" | "secundari" | "terciari";
export type PesText = "normal" | "negreta";
export type CustomTextProps = {
  mida?: number;
  to?: ToText;
  color?: string;
  pes?: PesText;
} & TextProps;

export function Text(props: CustomTextProps) {
  const { mida, to, color, pes, style, ...otherProps } = props;
  const { MIDES, COLORS } = useTema();
  var colorF: string = COLORS.text;
  if (color) colorF = color;
  else if (to) {
    switch (to) {
      case "normal":
        colorF = COLORS.text;
        break;
      case "secundari":
        colorF = COLORS.gris[500];
        break;
      case "terciari":
        colorF = COLORS.gris[600];
        break;
      default:
        break;
    }
  }

  const styleText = {
    fontFamily: "Exo2Regular",
    fontWeight: pes === "negreta" ? "bold" : "normal",
    fontSize: mida ?? MIDES.medium,
    color: colorF,

  } as const;
  return <DefaultText allowFontScaling={false} style={[styleText, style]} {...otherProps} />;
}

export interface CustomTitolProps {
  nivell?: number;
}
export type TitolProps = TextProps & CustomTitolProps;

export function Titol(props: TitolProps) {
  const { style, ...otherProps } = props;
  const { MIDES, COLORS } = useTema();
  const styleText = {
    fontFamily: "Exo2Regular",
    fontSize: MIDES.large,
    fontWeight: "bold",
    color: COLORS.text,
  } as const;
  return <DefaultText  allowFontScaling={false} style={[styleText, style]} {...otherProps} />;
}

export type DataTextProps = {
  format?:string
} & CustomTextProps& TextProps
export function DataText(props:DataTextProps){
  const { format = "DD/MM HH:mm", children, ...otherProps } = props;

  var primerChildren = React.Children.toArray(children)[0];
  if(React.isValidElement(primerChildren) && primerChildren.type !== "string")
      throw Error("El fill d'un DataTimeText ha de ser un string");
  var primerChildren = React.Children.toArray(children)[0]

  var dataString : string = primerChildren as string;
  let dataFormatejada = moment(dataString).format(format);

  return <Text  allowFontScaling={false} {...otherProps} >
    {dataFormatejada}
  </Text>
}
