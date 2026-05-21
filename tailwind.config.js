module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        ink: {
          DEFAULT: "#0D0D0D",
          soft: "#1A1A1A",
          muted: "#2D2D2D",
        },
        paper: {
          DEFAULT: "#F7F4EF",
          warm: "#EDE8DF",
          card: "#FAFAF8",
        },
        accent: {
          DEFAULT: "#E8572A",
          hover: "#D14520",
          muted: "#F5C4B5",
        },
        sage: {
          DEFAULT: "#4A7C59",
          light: "#B5CFBC",
          muted: "#E8F0EA",
        },
        amber: {
          warm: "#C9882A",
          light: "#F5DFB5",
          muted: "#FAF0DC",
        },
      },
      animation: {
        "flip-in": "flipIn 0.4s ease-out",
        "flip-out": "flipOut 0.4s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        flipIn: {
          "0%": { transform: "rotateY(-90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" },
        },
        flipOut: {
          "0%": { transform: "rotateY(0deg)", opacity: "1" },
          "100%": { transform: "rotateY(90deg)", opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
