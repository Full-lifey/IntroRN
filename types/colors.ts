export type HexColor = `#${string}`;

export type Colors = {
  colorName: string;
  hexCode: HexColor;
};

export type ColorPalette = {
  paletteName: string;
  colors: Colors[];
};
