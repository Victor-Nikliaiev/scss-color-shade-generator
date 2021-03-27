import React, { useState, useEffect } from "react";
import { ColorAndCopy } from "../interfaces";
import { LightenDarkenColor } from "lighten-darken-color";

const SingleColor = ({
  type,
  weight,
  hexColor,
  effectCopyFunction,
}: ColorAndCopy) => {
  const [isCopied, setIsCopied] = useState(false);
  const hex = `#${hexColor}`;

  useEffect(() => {
    effectCopyFunction(hex, setIsCopied);
  }, [isCopied, effectCopyFunction, hex]);

  const pColorStyle = {
    color: `${LightenDarkenColor(
      "#111111",
      type === "tint" ? 0 : weight + 100
    )}`,
    textShadow: `0.01rem 0.05rem ${LightenDarkenColor("#111111", weight)}`,
  };

  const pCopiedStyle = {
    background: "rgba(0, 7, 7, 0.472)",
  };

  return (
    <article
      style={{ background: hex }}
      className="single-color"
      onClick={() => setIsCopied(true)}
    >
      <p style={pColorStyle}>{weight}%</p>
      <p style={pColorStyle}>{hex}</p>
      <p
        className="p-copy"
        style={isCopied ? { ...pColorStyle, ...pCopiedStyle } : pColorStyle}
      >
        {isCopied ? "copied" : "copy?"}
      </p>
    </article>
  );
};

export default SingleColor;
