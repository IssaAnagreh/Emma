import React, {useContext, useMemo, ReactNode} from "react";
import {StyleSheet, Text, TextStyle} from "react-native";

import ThemeContext from "../../lib/contexts/ThemeContext";

export default function AppText({
  children,
  style,
  bold,
  medium,
  thin,
  light,
}: {
  children?: string | undefined | string[];
  style?: TextStyle | TextStyle[];
  bold?: boolean;
  medium?: boolean;
  thin?: boolean;
  light?: boolean;
}) {
  const {isDark, colors} = useContext(ThemeContext);

  const fontWeight = useMemo(() => {
    return bold
      ? "bold"
      : medium
      ? "400"
      : thin
      ? "200"
      : light
      ? "100"
      : "300";
  }, [bold, medium, thin, light]);

  return (
    <Text
      style={StyleSheet.flatten([
        styles.container,
        {
          color: isDark ? colors.light : colors.dark,
          fontWeight,
        },
        style,
      ])}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
  },
});
