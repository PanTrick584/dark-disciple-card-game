import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./styles/language-selector.scss"

export const LanguageSelector = () => {
  // const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { language, setLanguage } = useContext(AppContext);

  const languages = [
    { code: "en", label: "English" },
    { code: "pl", label: "Polski" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
  ];

  const handleLanguageChange = (event) => {
    const selectedCode = event.target.value;
    setLanguage(selectedCode);

    console.log(`Language changed to: ${selectedCode}`);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Choose a language:</label>
      <select
        className="button"
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// export default LanguageSelector;