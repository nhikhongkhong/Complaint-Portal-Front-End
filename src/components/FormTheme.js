import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
//import { lightBlue } from "@material-ui/core/colors";
//import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#c00" }
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      'sans-serif',
    ].join(','),
  }
});

export default function FormTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
