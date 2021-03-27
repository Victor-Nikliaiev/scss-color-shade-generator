import React, { useState, useEffect } from "react";
import { ColorAndCopy } from "../interfaces";

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
  return (
    <article
      style={{ background: hex }}
      className="single-color"
      onClick={() => setIsCopied(true)}
    >
      <p>{weight}%</p>
      <p>{hex}</p>
      {isCopied && <p>copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
