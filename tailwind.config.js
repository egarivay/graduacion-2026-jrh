/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Negros
        ink: "#0A0A0C",
        carbon: "#121215",
        graphite: "#1C1C21",
        // Plateados
        silver: {
          DEFAULT: "#C7C9CC",
          light: "#E9EAEC",
          dark: "#8C8E92",
          muted: "#A8AAAE",
        },
        // Rosa palo
        rosa: {
          DEFAULT: "#D8A9B2",
          soft: "#EAD0D5",
          deep: "#C28C97",
          mist: "#F3E6E9",
        },
      },
      fontFamily: {
        display: ['"Cinzel"', "serif"],
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ['"Montserrat"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
        widest3: "0.5em",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.15" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
