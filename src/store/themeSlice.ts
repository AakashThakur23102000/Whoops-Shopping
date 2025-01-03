import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';


export type ThemeModeType = 'light' | 'dark' | 'systemLight' | 'systemDark'
export type ThemeColorsType = {
    error: string,
    success: string,
    warning: string,
    white: string,
    black: string,
    placeHolderColor: string,
    primary100: string,
    primary300: string,
    primary500: string,
    primary800: string,
    primary1000: string

};

const lightThemeColors: ThemeColorsType = {
    error: '#FF0000',
    success: '#00C851',
    warning: '#FF8800',
    white: '#FFFFFF',
    black: 'black',
    placeHolderColor: "#8e8e8e",
    primary100: "#6936F5",
    primary300: "#7C4DF2",
    primary500: "#8E64EF",
    primary800: "#B2487F",
    primary1000: "#a02e68"

}
const darkThemeColors: ThemeColorsType = {
    error: '#FF0000',
    success: '#00C851',
    warning: '#FF8800',
    white: 'black',
    black: '#FFFFFF',
    placeHolderColor: "#8e8e8e",
    primary100: "#6936F5",
    primary300: "#7C4DF2",
    primary500: "#8E64EF",
    primary800: "#B2487F",
    primary1000: "#a02e68"

}


function fetchSystemTheme() {
    var colorScheme = Appearance.getColorScheme()
    if (colorScheme === 'dark') {
        return 'systemDark';
    } else {
        return 'systemLight';
    }
}


var firstAppliedTheme = fetchSystemTheme();

const initialState: { themeMode: ThemeModeType, colors: any, isSystemModeEnabled: boolean } = {
    themeMode: firstAppliedTheme === "systemDark" ? "dark" : 'light',
    colors: firstAppliedTheme === "systemDark" ? darkThemeColors : lightThemeColors,
    isSystemModeEnabled: true
};


const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<ThemeModeType>) => {
            if (action.payload === 'systemLight') {
                state.isSystemModeEnabled = true;
                state.themeMode = "light";
                state.colors = lightThemeColors;
            } else if (action.payload === 'systemDark') {
                state.isSystemModeEnabled = true;
                state.themeMode = "dark";
                state.colors = darkThemeColors;
            } else {
                state.isSystemModeEnabled = false;
                state.themeMode = action.payload;
                state.colors = action.payload === "dark" ? darkThemeColors : lightThemeColors;
            }
        },
    },
});


export const { setThemeMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;




