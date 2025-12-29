import { createContext, useContext, ReactNode } from "react";
import { TemperatureUnit } from "../types/weather.types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TEMPERATURE_CONFIG } from "../config/constants";

interface SettingsContextType {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [temperatureUnit, setTemperatureUnit] = useLocalStorage<TemperatureUnit>(
    TEMPERATURE_CONFIG.STORAGE_KEY,
    TEMPERATURE_CONFIG.DEFAULT_UNIT
  );

  return (
    <SettingsContext.Provider value={{ temperatureUnit, setTemperatureUnit }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
