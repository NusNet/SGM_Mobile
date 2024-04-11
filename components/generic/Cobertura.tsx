import React from "react";
import { Vista } from "../base/ThemedView";
import { ViewProps } from "react-native";

export type CoberturaProps={
  colorFons?: string,
  opacitat?:number
}&ViewProps

export const Cobertura = ({colorFons="black", opacitat=0.5, children, style, ...otherProps }: CoberturaProps) => {
  return (
    <Vista
      style={[
        {
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 1,
          backgroundColor: "transparent",
        },
        style,
      ]}
    >
      <Vista
        style={{ flex: 1, position: "relative" }}
        align="center"
        justify="center"
      >
        <Vista
          style={{
            flex: 1,
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: colorFons,
            opacity: opacitat,
          }}
        ></Vista>
        <Vista
          style={{
            marginBottom: 0,
            paddingHorizontal: 15,
            paddingVertical: 6,
            borderRadius: 5,
          }}
          align="center"
        >
          {children}
        </Vista>
      </Vista>
    </Vista>
  );
};
