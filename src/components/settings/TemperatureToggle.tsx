import { useSettings } from "../../context/SettingsContext";
import "./TemperatureToggle.css";

const TemperatureToggle = () => {
  const { temperatureUnit, setTemperatureUnit } = useSettings();

  return (
    <div className="temperature-toggle-container">
      <div
        className="temperature-toggle"
        role="group"
        aria-label="Temperature unit selection"
      >
        <button
          className={`toggle-option ${temperatureUnit === "celsius" ? "active" : ""}`}
          onClick={() => setTemperatureUnit("celsius")}
          aria-pressed={temperatureUnit === "celsius"}
          aria-label="Celsius"
        >
          °C
        </button>
        <button
          className={`toggle-option ${temperatureUnit === "fahrenheit" ? "active" : ""}`}
          onClick={() => setTemperatureUnit("fahrenheit")}
          aria-pressed={temperatureUnit === "fahrenheit"}
          aria-label="Fahrenheit"
        >
          °F
        </button>
        <div
          className={`toggle-slider ${temperatureUnit === "fahrenheit" ? "right" : "left"}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default TemperatureToggle;
