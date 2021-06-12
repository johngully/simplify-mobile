const lightThemeColors = {
  dark: "#222f3e",
  medium: "#576574",
  lightest: "#ffffff",
};
const darkThemeColors = {
  dark: "#ffffff",
  medium: "#576574",
  lightest: "#222f3e",
};

const baseUnit = 8;
const baseBorderWidth = 1;
const baseSpacingSize = 8;
const baseFontSize = 16;
const colors = lightThemeColors;
// const colors = darkThemeColors;

export const borders = {
  radius: baseUnit,
  color: colors.medium,
  style: "solid",
  width: baseBorderWidth,
};

export const spacing = {
  small: baseSpacingSize/2,
  standard: baseSpacingSize,
  medium: baseSpacingSize*3,
  large: baseSpacingSize*6,
};

export const typography = {
  content: baseFontSize,
  small: baseFontSize/2,
  standard: baseFontSize,
  title: baseFontSize*2,
  titleLarge: baseFontSize*4,
  weight: {
    light: "200",
    standard: "400",
    bold: "700",
  },
};

export { baseUnit, colors };