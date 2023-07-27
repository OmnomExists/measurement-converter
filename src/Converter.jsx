import React, { useState } from "react";

const conversionFunctions = {
  length: {
    meters: (value) => value * 1,
    feet: (value) => value * 3.28084,
    inches: (value) => value * 39.3701,
    yards: (value) => value * 1.09361,
    kilometers: (value) => value / 1000,
    miles: (value) => value / 1609.34,
  },
  weight: {
    kilograms: (value) => value * 1,
    pounds: (value) => value * 2.20462,
    ounces: (value) => value * 35.27396,
  },
  volume: {
    liters: (value) => value * 1,
    milliliters: (value) => value * 1000,
    gallons: (value) => value / 3.78541,
  },
};

const Converter = () => {
  const [value, setValue] = useState("");
  const [fromGroup, setFromGroup] = useState("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [convertedValue, setConvertedValue] = useState("");
  const [error, setError] = useState("");

  const handleValueChange = (e) => {
    setValue(e.target.value);
    setError("");
  };

  const handleFromGroupChange = (e) => {
    const newGroup = e.target.value;
    setFromGroup(newGroup);
    setError("");

    // Reset the fromUnit and toUnit states to the first unit of the new group
    setFromUnit(Object.keys(conversionFunctions[newGroup])[0]);
    setToUnit(Object.keys(conversionFunctions[newGroup])[0]);
  };

  const handleFromUnitChange = (e) => {
    setFromUnit(e.target.value);
    setError("");
  };

  const handleToUnitChange = (e) => {
    setToUnit(e.target.value);
    setError("");
  };

  const handleConvert = () => {
    if (
      conversionFunctions[fromGroup] &&
      conversionFunctions[fromGroup][fromUnit] &&
      conversionFunctions[fromGroup][toUnit]
    ) {
      const converted = conversionFunctions[fromGroup][toUnit](
        parseFloat(value) / conversionFunctions[fromGroup][fromUnit](1)
      );
      setConvertedValue(converted.toFixed(2));
      setError("");
    } else {
      setError(
        "Invalid conversion. Please select units from the same measurement group."
      );
      setConvertedValue("");
    }
  };

  return (
    <div className="converter">
      <h1>Measurement Unit Converter</h1>
      <div className="input-group">
        <select value={fromGroup} onChange={handleFromGroupChange}>
          {Object.keys(conversionFunctions).map((group) => (
            <option key={group} value={group}>
              {group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <input type="number" value={value} onChange={handleValueChange} />
        <select value={fromUnit} onChange={handleFromUnitChange}>
          {Object.keys(conversionFunctions[fromGroup] || {}).map((unit) => (
            <option key={unit} value={unit}>
              {unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <input type="text" value={convertedValue} readOnly />
        <select value={toUnit} onChange={handleToUnitChange}>
          {Object.keys(conversionFunctions[fromGroup] || {}).map((unit) => (
            <option key={unit} value={unit}>
              {unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleConvert}>Convert</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Converter;
