import { useState, useEffect } from "react";
import "./ScreenKeyboard.css";

const ScreenKeyboard = () => {
  const [text, setText] = useState("");
  const [pressedKeys, setPressedKeys] = useState([]);

  const keys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Enter"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["Space"],
  ];

  useEffect(() => {
    const onKeyDown = (event) => {
      let keyName = event.key;

      if (keyName === " ") keyName = "Space";
      if (keyName === "Backspace") keyName = "Backspace";
      if (keyName === "Enter") keyName = "Enter";

      keyName = keyName.toUpperCase();

      if (!pressedKeys.includes(keyName)) {
        setPressedKeys([...pressedKeys, keyName]);
      }
    };

    const onKeyUp = (event) => {
      let keyName = event.key;

      if (keyName === " ") keyName = "Space";
      if (keyName === "Backspace") keyName = "Backspace";
      if (keyName === "Enter") keyName = "Enter";

      keyName = keyName.toUpperCase();

      setPressedKeys(pressedKeys.filter((key) => key !== keyName));
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  });

  const isKeyPressed = (key) => {
    return pressedKeys.includes(key.toUpperCase());
  };

  return (
    <div className="container">
      <h1>Custom Keyboard</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing here..."
        className="text-area"
      />

      <div className="keyboard">
        {keys.map((row, rowNumber) => (
          <div key={rowNumber} className="row">
            {row.map((key) => (
              <div
                key={key}
                className={`key ${isKeyPressed(key) ? "pressed" : ""}`}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenKeyboard;
