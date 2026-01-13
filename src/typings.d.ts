interface FontFaceDescriptors {
  family?: string;
  style?: string;
  weight?: string;
  stretch?: string;
  unicodeRange?: string;
  variant?: string;
  featureSettings?: string;
}

declare var FontFace: {
  prototype: FontFace;
  new (
    family: string,
    source: string | ArrayBuffer,
    descriptors?: FontFaceDescriptors
  ): FontFace;
};

interface FontFace {
  family: string;
  style: string;
  weight: string;
  stretch: string;
  unicodeRange: string;
  variant: string;
  featureSettings: string;
  status: string;
  load(): Promise<FontFace>;
  loaded: Promise<FontFace>;
}
