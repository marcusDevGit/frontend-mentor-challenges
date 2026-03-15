import { useWeather } from "./hooks/useWeather";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { CurrentWeather } from "./components/CurrentWeather";
import {WeatherMetrics} from "./components/WeatherMetrics";
import {HourlyForecast} from "./components/HourlyForecast";
import {DailyForecast} from "./components/DailyForecast";
import "./weather-app.css";

// Como ainda não construímos os demais cards, vamos deixar os ícones
// já preparados para as telas de states.
import errorIcon from "./assets/images/icon-error.svg";
import loadingIcon from "./assets/images/icon-loading.svg";

export default function WeatherApp() {
  const {
    status,
    error,
    unit,
    location,
    currentWeather,
    dailyForecast,
    hourlyForecast,
    selectedDayIndex,
    setSelectedDayIndex,
    searchResult,
    searchStatus,
    searchError,
    searchLocation,
    selectedLocation,
    changeUnit,
    retry,
  } = useWeather();

  // Função Render para organizar os IFs
  function renderContent() {
    // Status 1: Ainda não buscou nada
    if (status === "idle") {
      return (
        <div className="wa-no-results">
          <p>
            Search for a city above to see the current weather and forecast.
          </p>
        </div>
      );
    }

    // Status 2: Carregando a API
    if (status === "loading") {
      return (
        <div className="wa-loading">
          <div className="wa-loading-dots">
            <span />
            <span />
            <span />
          </div>
          <p>Loading weather data...</p>
        </div>
      );
    }

    // Status 3: Erro na API (Ex: sem internet)
    if (status === "error") {
      return (
        <div className="wa-error">
          <img src={errorIcon} alt="Error" className="wa-error-icon" />
          <h2>Something went wrong</h2>
          <p>We couldn't fetch the weather data. {error}</p>
          <button className="wa-retry-btn" onClick={retry}>
            <img src={loadingIcon} alt="" />
            Try Again
          </button>
        </div>
      );
    }

    // Status 4: API respondeu, mas não veio cidade
    if (status === "loaded" && !currentWeather) {
      return (
        <div className="wa-no-results">
          <img src={errorIcon} alt="No Results" className="wa-error-icon" />
          <h2>No results found</h2>
          <p>We couldn't find any weather data for this location.</p>
        </div>
      );
    }

    // Status 5: Sucesso total
    return (
      <main className="wa-content">
        <div className="wa-weather-info-block">
          <CurrentWeather location={location} currentWeather={currentWeather} />
          <WeatherMetrics currentWeather={currentWeather} />
        </div>
        <DailyForecast
          dailyForecast={dailyForecast}
          selectedDayIndex={selectedDayIndex}
          onSelectDay={setSelectedDayIndex}
        />
        <HourlyForecast
          hourlyForecast={hourlyForecast}
          dailyForecast={dailyForecast}
          selectedDayIndex={selectedDayIndex}
          onSelectDay={setSelectedDayIndex}
        />
      </main>
    );
  }

  return (
    <div className="wa-wrapper">
      <div className="wa-container">

        {/* Fixos no topo */}
        <Header unit={unit} onChangeUnit={changeUnit} />
        <h1 className="wa-title">How's the sky looking today?</h1>

        <div className="wa-main">
          <SearchBar
            searchResults={searchResult}
            searchStatus={searchStatus}
            searchError={searchError}
            onSearch={searchLocation}
            onSelectLocation={selectedLocation}
          />

          {/* Aqui embaixo acontece a mágica do State */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
