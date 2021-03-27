import { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ColorsAndCopy } from "../interfaces";

const ScssCode = ({ colors, effectCopyFunction }: ColorsAndCopy) => {
  const [isCopied, setIsCopied] = useState(false);

  let colorsArray: string[] = colors.map((color, index) => {
    if (color.type === "base") {
      return `$color-base: #${color.hexColor};`;
    }
    return `$color-${index + 1}: #${color.hexColor};`;
  });
  let str = `${colorsArray.join("\n")}`;

  useEffect(() => {
    effectCopyFunction!(str, setIsCopied);
  }, [isCopied, effectCopyFunction, str]);

  return (
    <div className="scss-variables">
      <h2>CSS Variables</h2>
      <button onClick={() => setIsCopied(() => true)}>copy to clipboard</button>
      <SyntaxHighlighter
        language="scss"
        style={atelierCaveLight}
        showLineNumbers={true}
      >
        {str}
      </SyntaxHighlighter>
    </div>
  );
};

export default ScssCode;
