import { useTema } from "@/context/TemaProvider";
import { Pressable, PressableProps, ViewProps,
    View as DefaultView, } from "react-native";

export interface CustomTargetaProps {
    clicable?: boolean;
    color?:string
  }
  export type TargetaProps = ViewProps & CustomTargetaProps & PressableProps;
  export function Targeta(props: TargetaProps) {
    const { color, style, ...otherProps } = props;
    const { COLORS, MIDES } = useTema();
    const backgroundColor = color ?? COLORS.fonsTargeta;
  
    const styleContainer = {
      padding: MIDES.medium,
      borderRadius: MIDES.xxSmall,
      backgroundColor: backgroundColor,
      borderWidth:1,
      borderColor: "transparent"
    } as any
    const styleWidget = {
      justifyContent: "space-between",
      alignItems: "stretch",
  
    } as const;
  
    if (props.clicable) {
      return (
        <Pressable {...otherProps}
         style={({pressed}) =>
          
          [styleContainer, styleWidget, { opacity: pressed? 0.5 : 1,
            // borderColor: pressed? COLORS.gris[400] : "transparent"
          }, style ]
          
          }>
          <DefaultView style={[styleWidget]} {...otherProps} />
        </Pressable>
      );
    } else return <DefaultView style={[styleContainer, styleWidget, style]} {...otherProps} />;
  }
  