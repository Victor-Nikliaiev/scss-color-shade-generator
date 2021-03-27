export interface Color {
  type: string;
  weight: number;
  readonly hex: string;
  hexColor: string;
}

export interface ColorsAndCopy {
  colors: Color[];
  effectCopyFunction?: EffectCopyFunction;
}

export type SetBoolState = React.Dispatch<React.SetStateAction<boolean>>;
type EffectCopyFunction = (
  str: string,
  setIsCopied: SetBoolState
) => () => void;

export interface ColorAndCopy extends Color {
  effectCopyFunction: EffectCopyFunction;
}
