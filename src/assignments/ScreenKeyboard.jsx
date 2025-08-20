import { useState, useEffect, useRef } from "react";
import "./ScreenKeyboard.css";

const ScreenKeyboard = () => {
  const [text, setText] = useState("");
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const textareaRef = useRef(null);

  const keys = [
    [
      "~",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
      "Backspace",
    ],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"],
    [
      "CapsLock",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ":",
      '"',
      "Enter",
    ],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift"],
    ["Ctrl", "Alt", "Space", "Alt", "Ctrl"],
  ];

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleKeyDown = (e) => {
      let key = e.key;
      if (key === " ") key = "Space";
      if (key === "Control") key = "Ctrl";
      setPressedKeys((prev) => new Set([...prev, key.toUpperCase()]));
    };

    const handleKeyUp = (e) => {
      let key = e.key;
      if (key === " ") key = "Space";
      if (key === "Control") key = "Ctrl";
      setPressedKeys((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(key.toUpperCase());
        return newKeys;
      });
    };

    textarea.addEventListener("keydown", handleKeyDown);
    textarea.addEventListener("keyup", handleKeyUp);
    textarea.focus();

    return () => {
      textarea.removeEventListener("keydown", handleKeyDown);
      textarea.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const isPressed = (key) => {
    if (key === "Space") return pressedKeys.has("SPACE");
    return pressedKeys.has(key.toUpperCase());
  };

  const getKeyClass = (key) => {
    let className = "key";
    if (isPressed(key)) className += " pressed";

    if (key === "Backspace") className += " backspace";
    else if (key === "Tab") className += " tab";
    else if (key === "CapsLock") className += " caps";
    else if (key === "Enter") className += " enter";
    else if (key === "Shift") className += " shift";
    else if (key === "Space") className += " space";
    else if (key === "Ctrl" || key === "Alt") className += " modifier";

    return className;
  };

  return (
    <div className="keyboard-container">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-area"
        placeholder="Start typing..."
      />

      <div className="keyboard">
        {keys.map((row, i) => (
          <div key={i} className="keyboard-row">
            {row.map((key, j) => (
              <div key={j} className={getKeyClass(key)}>
                {key === "Space" ? "" : key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenKeyboard;
