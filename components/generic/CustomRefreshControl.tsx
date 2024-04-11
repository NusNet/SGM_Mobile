import { useTema } from "@/context/TemaProvider";
import React from "react";
import {
  RefreshControl, RefreshControlProps,

} from "react-native";

class CustomRefreshControl extends RefreshControl {

  constructor(props:RefreshControlProps ){
    super(props);
  }

  render() {
    const { COLORS, MIDES } = useTema();

    return (
      <RefreshControl
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        colors={[COLORS.primari50]}
        progressBackgroundColor={COLORS.fonsTargeta}
        tintColor={COLORS.primari50}
      />
    );
  }
}

export default CustomRefreshControl;
