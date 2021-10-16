import React, { useState } from "react";
import { SketchPicker } from "react-color";

export default function ColorPicker({setColorValue, colorValue}) {

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handlePickClick = (e) => {
    e.preventDefault();
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleColorChange = color => {
    setColorValue(color.hex);
  };

    return (
      <div className="color-picker">
        <button className="color-picker__button" onClick={e => handlePickClick(e)}>
          Choose Color
        </button>
        {displayColorPicker && (
          <div className="color-picker__popover position-absolute">
            <SketchPicker
              color={colorValue}
              onChange={(color) => handleColorChange(color)}
            />
          </div>
        )}
      </div>
    );
  }

