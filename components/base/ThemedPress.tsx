import {
  Pressable,
  PressableProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTema } from "../../context/TemaProvider";
import { Text } from "./ThemedText";
import { HVista } from "./ThemedView";
import { Icona, IconaProp } from "./ThemedIcon";

export interface CustomBotoFlotantProps {
  color?: string;
}
export type BotoFlotantProps = CustomBotoFlotantProps &
  TouchableOpacityProps &
  PressableProps;
export function BotoFlotant(props: BotoFlotantProps) {
  const { COLORS, MIDES } = useTema();
  const { disabled, style, color, ...otherProps } = props;
  const styleButo = {
    backgroundColor: color ?? COLORS.primari,
    borderRadius: MIDES.small,
    paddingVertical: MIDES.small,
    paddingHorizontal: MIDES.large,
    elevation: disabled ? 0 : 5,
    margin: MIDES.xxSmall,
    opacity: disabled ? 0.2 : 1,
    alignItems: "center",
  } as any;

  return (
    <TouchableOpacity
      disabled={disabled}
      {...otherProps}
      style={[styleButo, style]}
    ></TouchableOpacity>
  );
}
export interface CustomBotoProps {
  color?: string;
}
export type BotoProps = CustomBotoProps &
  TouchableOpacityProps &
  PressableProps;
export function Boto(props: BotoProps) {
  const { COLORS, MIDES } = useTema();
  const { disabled, style, color, ...otherProps } = props;
  const styleButo = {
    backgroundColor: color ?? COLORS.primari,
    borderRadius: 6,
    padding: MIDES.mini,
    opacity: disabled ? 0.2 : 1,
    alignItems: "center",
  } as any;

  return (
    <TouchableOpacity
      disabled={disabled}
      {...otherProps}
      style={[styleButo, style]}
    ></TouchableOpacity>
  );
}

export interface CustomBotoOpcionsProps {
  icon: IconaProp;
}
export type BotoOpcionsProps = CustomBotoOpcionsProps &
  TouchableOpacityProps &
  PressableProps;
export function BotoOpcions(props: BotoOpcionsProps) {
  const { COLORS, MIDES } = useTema();
  const { icon, style, ...otherProps } = props;
  const styleButo = {
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 1.2,
    borderColor: COLORS.gris[400],
    padding: 8,
  };

  return (
    <TouchableOpacity {...otherProps} style={[styleButo, style]}>
      <Icona type={icon.type} name={icon.name} />
    </TouchableOpacity>
  );
}

export type BotoTextMenuProps = PressableProps & {
  icon?: IconaProp;
  text: string;
  textSize?: number;
};
export function BotoTextMenu(props: BotoTextMenuProps) {
  const { COLORS, MIDES } = useTema();
  const { icon, text, textSize, ...otherProps } = props;

  return (
    <Pressable
      {...otherProps}
      style={({ pressed }) => [
        {
          backgroundColor: "transparent",
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 20,
        },
      ]}
    >
      {({ pressed }) => (
        <HVista gap={MIDES.large} align="center">
          {icon && (
            <Icona
              type={icon.type}
              name={icon.name}
              size={icon.size}
              color={icon.color}
            />
          )}
          <Text
            style={{
              color: pressed ? COLORS.primari : COLORS.text,
              fontSize: textSize ?? MIDES.large,
            }}
          >
            {text}
          </Text>
        </HVista>
      )}
    </Pressable>
  );
}

export type PressionableProps = PressableProps & {
  pressedColor?:string
  opacity?:number,
  pressedOpacity?:boolean
};
export function Pressionable(props: PressionableProps) {
  const { COLORS, MIDES } = useTema();
  const { children, style, pressedOpacity , ...otherProps } = props;

  return (
    <Pressable
      {...otherProps}
      style={({ pressed }) => [
        {
          opacity: props.pressedOpacity ?? true ? (pressed ? props.opacity ?? 0.5:1) : 1 ,
          backgroundColor: props.pressedColor ? pressed ? props.pressedColor : "transparent" : "transparent",
          borderRadius: 6,
        },
        style 
      ] as any}
    >
      {children}
    </Pressable>
  );
}
