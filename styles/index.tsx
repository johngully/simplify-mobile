import { baseUnit, borders, colors, spacing, typography } from "./tokens";

export {
  baseUnit, colors, spacing, typography
}

export const buttons = {
  button: {
    backgroundColor: colors.dark,
    borderRadius: borders.radius,
    paddingHorizontal: baseUnit*2,
    paddingVertical: baseUnit,
  },
  buttonText: {
    color: colors.lightest,
    fontSize: typography.standard,
    fontWeight: typography.weight.standard,
    textAlign: "center"
  },
  buttonGhostButton: {
    backgroundColor: "transparent",
    borderColor: borders.color,
    borderWidth: borders.width,
    borderRadius: borders.radius,
    paddingHorizontal: baseUnit*2,
    paddingVertical: baseUnit,
  },
  buttonGhostButtonText: {
    color: colors.dark, 
    fontSize: typography.standard,
    fontWeight: typography.weight.standard,
    textAlign: "center"
  },
};

export const containers = {
  container: {
    flex: 1,
    backgroundColor: colors.lightest,
    alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: "stretch",
  },
  containerWithHeaderOffset: {
    flex: 1,
    backgroundColor: colors.lightest,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "stretch",
    marginTop: spacing.extraLarge*-1 // offset for the header
  },
  containerForWebView: {
    flex: 1,
    alignSelf: "stretch",
  }

};

export const text = {
  text: {
    fontSize: typography.standard,
    fontWeight: typography.weight.standard,
  },
  textTitle: {
    fontSize: typography.title,
    fontWeight: typography.weight.bold,
  },
  textTitleLarge: {
    fontSize: typography.titleLarge,
    fontWeight: typography.weight.standard,
  },
};

export const all = { 
  ...containers, 
  ...buttons,
  ...text,
}
