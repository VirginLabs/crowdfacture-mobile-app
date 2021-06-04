import React, {createContext, useRef, useState} from "react";
import {Animated, Easing, StatusBar} from "react-native";

export const ThemeContext = createContext('');

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("Light");
    const [loading, setLoading] = useState(true);
    const animationValue = useRef(new Animated.Value(0)).current;
    const toggleTheme = () => {
        if (theme === "Light") {
            setTheme("Dark");
            StatusBar.setBarStyle("light-content");
        } else {
            setTheme("Light");
            StatusBar.setBarStyle("dark-content");
        }
    };

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};