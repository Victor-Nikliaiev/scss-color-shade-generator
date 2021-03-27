import React, { useState, useRef, useEffect } from "react";
import Values from "values.js";
import SingleColor from "./components/SingleColor";
import ScssCode from "./components/ScssCode";
import { Color, SetBoolState } from "./interfaces";
import ParticleBackground from "./components/ParticleBackground";

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
  const focusRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    focusRef.current.focus();
  }, []);

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
      <ParticleBackground />
      <section className="main">
        <div className="test"></div>
        <header>
          <h1 className="main__title">SCSS Color shade generator</h1>
          <div className="outline"></div>
          <form onSubmit={handleOnSubmit}>
            <div className="main__input-group">
              <input
                ref={focusRef}
                type="text"
                value={color}
                onChange={handleOnChange}
                className={`main__textInput ${error ? "error" : ""}`}
              ></input>
              <input
                className="main__paletteInput"
                type="color"
                value={color}
                onChange={handleOnChange}
              ></input>
              <button className="btn btn__generate" type="submit">
                generate
              </button>
            </div>
          </form>
        </header>

        <section className="col-var-container">
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
        </section>
      </section>
    </>
  );
}

export default App;
