"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

const themeOptions = {
    palette: {
        background: {
            default: "rgb(19 78 74))",
        },
        primary: {
            main: "#002c37",
        },
        text: {
            primary: "#92b7a6",
        },
    },
};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({ children }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
