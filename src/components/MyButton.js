import {
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from "react-native";
import Colors, { colorsMovistar } from "../../constants/colors";

export default function MyButton({
  title,
  onPress,
  type = "primary",
  style,
  ...otherProps
}) {
  const theme = useColorScheme();

  const buttonStyle =
    theme === "light" && type === "primary"
      ? styles.primaryLight
      : theme === "light" && type === "secondary"
        ? styles.secondaryLight
        : theme === "dark" && type === "primary"
          ? styles.primaryDark
          : theme === "light" && type === "primaryMovistar"
            ? styles.primaryMovistarLight
            : theme === "dark" && type === "primaryMovistar"
              ? styles.primaryMovistarDark
              : theme === "light" && type === "secondaryMovistar"
                ? styles.secondaryMovistarLight
                : theme === "dark" && type === "secondaryMovistar"
                  ? styles.secondaryMovistarDark
                  : styles.secondaryDark;

  const textStyle =
    theme === "light" && type === "primary"
      ? Colors.light.background
      : theme === "light" && type === "secondary"
        ? Colors.light.text
        : theme === "dark" && type === "primary"
          ? Colors.dark.background
          : theme === "light" && type === "secondaryMovistar"
            ? colorsMovistar.movistar_green
            : theme === "dark" && type === "secondaryMovistar"
              ? colorsMovistar.movistar_blue_dark
              : Colors.light.background;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={[styles.buttonText, { color: textStyle }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryMovistarLight: {
    backgroundColor: colorsMovistar.movistar_green,
  },
  primaryMovistarDark: {
    backgroundColor: colorsMovistar.movistar_blue_dark,
  },
  secondaryMovistarLight: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colorsMovistar.movistar_green,
  },
  secondaryMovistarDark: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colorsMovistar.movistar_blue_dark,
  },
  primaryLight: {
    backgroundColor: Colors.light.text,
  },
  secondaryLight: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.light.text,
  },
  primaryDark: {
    backgroundColor: Colors.dark.text,
  },
  secondaryDark: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.dark.text,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
