import React, { useEffect, useState, useCallback } from "react";
import resetPasswordImage from "../assets/icons/random-password-generate.svg";
import { generatePassword } from "../utils/password";
import { debounce } from "lodash";

const PasswordGenerator = () => {
  const maxInputLength = 50;
  const [passwordLength, setPasswordLength] = useState(15);
  const [length, setLength] = useState(15);
  const [rangePercent, setRangePercent] = useState(0);
  const [rangePercentColor, setRangePercentColor] = useState(0);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [copyBtnText, setCopyBtnText] = useState("Copy");

  // Create a debounced version of the password generator
  const debouncedSetLength = useCallback(debounce(setPasswordLength, 500), []);

  const handleLengthChange = useCallback(
    (e, value) => {
      const length = value ? value : e.target.value;
      const rangePercent = (length / maxInputLength) * 100;
      let rangePercentColor = 0;
      if (rangePercent > 90) {
        rangePercentColor = 280;
      } else if (rangePercent > 80) {
        rangePercentColor = 250;
      } else if (rangePercent > 70) {
        rangePercentColor = 230;
      } else if (rangePercent > 50) {
        rangePercentColor = 170;
      } else if (rangePercent > 30) {
        rangePercentColor = 160;
      } else {
        rangePercentColor = 150;
      }
      setLength(length);
      setRangePercent(rangePercent);
      setRangePercentColor(rangePercentColor);
      debouncedSetLength(length);
    },
    [debouncedSetLength]
  );

  useEffect(() => {
    handleLengthChange(null, length);
  }, [length, handleLengthChange]);

  const analyzePasswordStrength = password => {
    let strengthScore = 0;

    // Check password length
    if (password.length >= 5) strengthScore++; // Bonus for length >= 8
    if (password.length >= 8) strengthScore++; // Bonus for length >= 12
    if (password.length >= 10) strengthScore++; // Bonus for length >= 16

    // Check for lowercase letters
    if (/[a-z]/.test(password)) strengthScore++;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strengthScore++;

    // Check for digits
    if (/\d/.test(password)) strengthScore++;

    // Check for special characters
    if (/[\W_]/.test(password)) strengthScore++;

    // Analyze score and return a strength category
    if (strengthScore <= 2) {
      return <div className="bg-danger px-2 py-1 rounded text-white">Very Weak</div>;
    } else if (strengthScore === 3) {
      return <div className="bg-warning px-2 py-1 rounded text-white">Weak</div>;
    } else if (strengthScore === 4) {
      return <div className="bg-info px-2 py-1 rounded text-white">Good</div>;
    } else if (strengthScore === 5) {
      return <div className="bg-success bg-gradient px-2 py-1 rounded text-white">Strong</div>;
    } else if (strengthScore >= 6) {
      return <div className="bg-success px-2 py-1 rounded text-white">Very Strong</div>;
    }
  };

  const handleGeneratePassword = (options = null) => {
    setIsGenerating(true);
    const maxLoop = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
    let count = 0;
    const intervalId = setInterval(() => {
      if (!options) {
        options = { includeUppercase, includeLowercase, includeNumbers, includeSymbols };
      }

      const generatedPassword = generatePassword(passwordLength, options);
      setPassword(generatedPassword);
      if (count < maxLoop) {
        count++;
      } else {
        setPasswordStrength(analyzePasswordStrength(generatedPassword));
        setIsGenerating(false);
        clearInterval(intervalId);
      }
    }, 100);
  };

  const handleCopyBtnClick = () => {
    navigator.clipboard.writeText(password);
    setCopyBtnText("Copied");
    setTimeout(() => {
      setCopyBtnText("Copy");
    }, 1000);
  };

  useEffect(() => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setIncludeUppercase(true);
    } else {
      handleGeneratePassword({ includeUppercase, includeLowercase, includeNumbers, includeSymbols });
    }
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleResetBtnClick = () => {
    handleGeneratePassword({ includeUppercase, includeLowercase, includeNumbers, includeSymbols });
  };

  return (
    <>
      <div className="row mb-3 mt-4 d-flex align-items-center">
        <div className="col-12 col-md-9">
          <div className={`input-group me-3 rounded-pill password-display ${isGenerating ? "changing" : ""}`}>
            <input type="text" className="form-control border-0 fs-4 font-monospace ls-2" value={password} readOnly />
            <span className="input-group-text bg-transparent border-0">{passwordStrength}</span>
            <span className="input-group-text bg-transparent border-0">
              <button title="Regenerate a new password instantly" className="btn p-0 btn-lg" onClick={handleResetBtnClick}>
                <img className="img-fluid" src={resetPasswordImage} style={{ width: "36px", height: "36px" }} alt="Generate strong and secure passwords with our easy-to-use Password Generator" />
              </button>
            </span>
          </div>
        </div>
        <div className="col-12 col-md-3 mt-5 mt-md-0 text-center text-md-start">
          <button title="Copy generated password to clipboard" className="btn btn-primary rounded-pill fw-bold px-5 btn-lg" onClick={handleCopyBtnClick}>
            {copyBtnText}
          </button>
        </div>
      </div>

      <div className="row fs-5 d-flex align-items-center my-5">
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-6 col-md-12 mb-3">Password length:</div>
            <div className="col-6 col-md-12 fw-4 fw-bold">{length}</div>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <input style={{ filter: `hue-rotate(${rangePercentColor}deg)` }} type="range" className="form-range custom-range-slider" id="customRange1" value={length} onChange={e => handleLengthChange(null, parseInt(e.target.value))} min={1} max={maxInputLength} />
          <div id="h4-container">
            <div id="h4-subcontainer">
              <h4
                style={{
                  transform: `translateX(-50%) scale(${1 + rangePercent / 100})`,
                  left: `${rangePercent}%`,
                }}
              >
                {length}
                <span
                  style={{
                    filter: `hue-rotate(-${rangePercentColor}deg)`,
                  }}
                ></span>
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="row fs-5 d-flex align-items-center">
        <div className="col-12 col-md-4 mb-3 mb-md-0">Characters used:</div>
        <div className="col-12 col-md-8">
          <div className="row px-3 px-md-0">
            <div className="col-3 form-check">
              <input className="form-check-input" type="checkbox" id="includeUppercase" checked={includeUppercase} onChange={e => setIncludeUppercase(e.target.checked)} />
              <label className="form-check-label fw-bold fw-4" htmlFor="includeUppercase">
                ABC
              </label>
            </div>
            <div className="col-3 form-check">
              <input className="form-check-input" type="checkbox" id="includeLowercase" checked={includeLowercase} onChange={e => setIncludeLowercase(e.target.checked)} />
              <label className="form-check-label fw-bold fw-4" htmlFor="includeLowercase">
                abc
              </label>
            </div>
            <div className="col-3 form-check">
              <input className="form-check-input" type="checkbox" id="includeNumbers" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} />
              <label className="form-check-label fw-bold fw-4" htmlFor="includeNumbers">
                123
              </label>
            </div>
            <div className="col-3 form-check">
              <input className="form-check-input" type="checkbox" id="includeSymbols" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} />
              <label className="form-check-label fw-bold fw-4" htmlFor="includeSymbols">
                #$&
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;
