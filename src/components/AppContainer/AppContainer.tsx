import * as React from "react";
import {
  makeStyles,
  shorthands,
  FluentProvider,
  tokens,
  webLightTheme,
} from "@fluentui/react-components";

const fluentProviderStyles = {
  height: "100%",
  backgroundColor: tokens.colorNeutralBackground2,
};

const useStyles = makeStyles({
  container: {
    position: "relative",
    height: "100%",
    ...shorthands.padding("10px"),
    boxSizing: "border-box",
  },
});

export const AppContainer: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [theme, setTheme] = React.useState(webLightTheme);

  const styles = useStyles();

  return (
    <FluentProvider theme={theme} style={fluentProviderStyles}>
      <div className={styles.container}>{props.children}</div>
    </FluentProvider>
  );
};
