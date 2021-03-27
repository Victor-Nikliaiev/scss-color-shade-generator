import React, { useState } from "react";
import Values from "values.js";
import SingleColor from "./components/SingleColor";
import ScssCode from "./components/ScssCode";
import { Color, SetBoolState } from "./interfaces";

function App() {
  const getColorWithHex = (colors: Color[]): Color[] => {
    let hexColored = colors.map((color) => {
      color.hexColor = color.hex;
      return color;
    });
    return hexColored;
  };
  const [color, setColor] = useState<string>("#f1257a");
  const [error, setError] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);

  const setPaletteColors = (): Color[] | undefined => {
    try {
      const clr = getColorWithHex(new Values(color).all(10));
      return clr;
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  if (colors.length === 0) {
    let cls = setPaletteColors();
    if (cls) {
      setColors(cls);
    }
  }

  const effectCopyFunction = (str: string, setIsCopied: SetBoolState) => {
    navigator.clipboard.writeText(str);
    const time = setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError(false);
    setColor(e.target.value);
  };

  const handleOnSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    let cls = setPaletteColors();
    if (cls) {
      setColors(cls);
    }
  };
  return (
    <>
      <h1>SCSS Color shade generator</h1>
      <form onSubmit={handleOnSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={color}
            onChange={handleOnChange}
            className={`${error && "error"}`}
          ></input>
          <input type="color" value={color} onChange={handleOnChange}></input>
          <button type="submit">submit</button>
        </div>
      </form>
      {colors.length > 0 && (
        <ScssCode colors={colors} effectCopyFunction={effectCopyFunction} />
      )}
      {colors.length > 0 && (
        <section className="colors-container">
          {colors.map((color) => {
            return (
              <SingleColor
                key={Math.floor(Math.random() * Date.now())}
                {...color}
                effectCopyFunction={effectCopyFunction}
              />
            );
          })}
        </section>
      )}
    </>
  );
}

export default App;
