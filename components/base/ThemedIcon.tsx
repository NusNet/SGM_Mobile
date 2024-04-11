import {
    AntDesign,
    Entypo,
    Feather,
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import { useTema } from "../../context/TemaProvider";
export enum IconType {
    MatetrialIcon,
    FontAweomseIcon,
    Ionicon,
    Feather,
    Octicons,
    AntDesign,
    MaterialCommunityIcons,
    Entypo,
    Foundation,
    FontAwesome6,
    FontAwesome5
  }
  
  export type IconaProp =
    | {
        type: IconType.MatetrialIcon;
        name: keyof typeof MaterialIcons.glyphMap;
        size?: number;
        color?: string;
      }
      | {
        type: IconType.FontAwesome6;
        name: keyof typeof FontAwesome6.glyphMap;
        size?: number;
        color?: string;
      }
      | {
        type: IconType.FontAwesome5;
        name: keyof typeof FontAwesome5.glyphMap;
        size?: number;
        color?: string;
      }
    | {
        type: IconType.FontAweomseIcon;
        name: keyof typeof FontAwesome.glyphMap;
        size?: number;
        color?: string;
      }
      | {
        type: IconType.Foundation;
        name: keyof typeof Foundation.glyphMap;
        size?: number;
        color?: string;
      }
      | {
        type: IconType.Entypo;
        name: keyof typeof Entypo.glyphMap;
        size?: number;
        color?: string;
      }
      | {
        type: IconType.AntDesign;
        name: keyof typeof AntDesign.glyphMap;
        size?: number;
        color?: string;
      }
    | {
        type: IconType.Octicons;
        name: keyof typeof Octicons.glyphMap;
        size?: number;
        color?: string;
      }
    | {
        type: IconType.Feather;
        name: keyof typeof Feather.glyphMap;
        size?: number;
        color?: string;
      }
      | {
        type: IconType.MaterialCommunityIcons;
        name: keyof typeof MaterialCommunityIcons.glyphMap;
        size?: number;
        color?: string;
      }
    | {
        type: IconType.Ionicon;
        name: keyof typeof Ionicons.glyphMap;
        size?: number;
        color?: string;
      }
    | {
      type: any;
      name:any;
      size:any;
      color:any;
    };

    export function Icona(icona: IconaProp) {
        const {COLORS} = useTema();
        return (
          <>
            {icona.type === IconType.FontAweomseIcon && (
              <FontAwesome
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
            {icona.type === IconType.MatetrialIcon && (
              <MaterialIcons
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
                  {icona.type === IconType.FontAwesome6 && (
              <FontAwesome6
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
            {icona.type === IconType.FontAwesome5 && (
        <FontAwesome5
          name={icona.name}
          size={icona.size ?? 20}
          style={{ color: icona.color ?? COLORS.text }}
        />
            )}
               {icona.type === IconType.AntDesign && (
              <AntDesign
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
             {icona.type === IconType.Entypo && (
              <Entypo
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
               {icona.type === IconType.Foundation && (
              <Foundation
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
             {icona.type === IconType.MaterialCommunityIcons && (
              <MaterialCommunityIcons
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
            {icona.type === IconType.Octicons && (
              <Octicons
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
            {icona.type === IconType.Feather && (
              <Feather
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text}}
              />
            )}
            {icona.type === IconType.Ionicon && (
              <Ionicons
                name={icona.name}
                size={icona.size ?? 20}
                style={{ color: icona.color ?? COLORS.text }}
              />
            )}
          </>
        );
      }
      