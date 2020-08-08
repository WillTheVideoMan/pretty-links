/**
 * The base line height, units in em;
 */
const baseLineHeight = 1.55

/**
 * The font scaling parameter. The size of each font is based from the root font size, multiplied by the scaling factor.
 */
const fontScale = 1.333

const TYPOGRAPHY = {
  fontFamily: {
    heading: "Fugaz One",
  },
  fontSize: {
    heading: {
      massive: `${Math.pow(fontScale, 4)}rem`,
    },
    body: {
      regular: "1rem",
    },
  },
  lineHeight: {
    heading: `${baseLineHeight - 0.3}`,
    body: `${baseLineHeight}`,
  },
}

const SPACING = {
  main: {
    major: `${baseLineHeight - 0.5}rem`,
    minor: 0,
  },
  accent: {
    major: `${(baseLineHeight - 0.5) * 3}rem`,
    minor: `${baseLineHeight - 0.5}rem`,
  },
}

module.exports = {
  TYPOGRAPHY,
  SPACING,
}
