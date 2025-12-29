import {
  Accordion,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItem,
  AccordionItemButton,
} from "react-accessible-accordion";
import { ForecastState } from "../../types/weather.types";
import { useSettings } from "../../context/SettingsContext";
import { formatTemperature } from "../../utils/temperature";
import { WEEK_DAYS } from "../../config/constants";
import "./forecast.css";

interface ForecastProps {
  data: ForecastState | null;
}

const Forecast = ({ data }: ForecastProps) => {
  const { temperatureUnit } = useSettings();

  if (!data || !data.data || !data.data.list || !Array.isArray(data.data.list)) {
    return null;
  }

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <div className="forecast-wrapper">
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded className="accordion">
        {data.data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {formatTemperature(item.main.temp_min, temperatureUnit)} /{" "}
                    {formatTemperature(item.main.temp_max, temperatureUnit)}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Wind Speed</label>
                  <label>{item.wind.speed} m/s</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Sea Level</label>
                  <label>{item.main.sea_level || 'N/A'} m</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Feels like</label>
                  <label>{formatTemperature(item.main.feels_like, temperatureUnit)}</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;
