/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        textColor: {
            primary: "#fff",
            secondary: "#b3b3b3",
            default: "#000000",
        },
        backgroundColor: {
            signature: "rgb(74, 222, 128)",
            default: "#000000",
            primary: "#ffff",
            base: "#121212",
            "base-highlight": "#1a1a1a",
            "tinted-base": "hsl(0deg 0% 100% / 7%)",
            "tinted-highlight": "hsl(0deg 0% 100% / 10%)",
            "elevated-base": "#181818",
            "elevated-highlight": "#282828",
            "tinted-focus": "#ffff",
            transparent: "transparent",
        },
        extend: {},
    },
    plugins: [],
};
