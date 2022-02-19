import {StyleSheet, TouchableOpacityProps} from "react-native";
import React, {useContext} from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import {GenericTouchableProps} from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";

import ThemeContext from "../../lib/contexts/ThemeContext";

export default function AppButton(
  props: TouchableOpacityProps & GenericTouchableProps,
) {
  const {children, style} = props;
  const {colors, isDark} = useContext(ThemeContext);
  return (
    <TouchableOpacity
      {...props}
      style={StyleSheet.flatten([
        styles.container,
        {backgroundColor: isDark ? colors.secondary : colors.primary},
        style,
      ])}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
