# 🌤️ Weather App

Desafio nível **Intermediate** do [Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).

## Funcionalidades

- Busca de cidade em tempo real (debounce de 300ms, mínimo 2 caracteres)
- Dropdown de busca com estados visuais:
  - Search in progress
  - Not found
  - Error
- Clima atual com cidade, data, temperatura e ícone
- Métricas adicionais: Feels like, Humidity, Wind e Precipitation
- Previsão diária de 7 dias (seleção de dia)
- Previsão por hora do dia selecionado (lista reduzida para 8 horários)
- Seleção de unidades (Metric/Imperial)
- Layout responsivo: Mobile (375px), Tablet (768px), Desktop (1440px)

## Tecnologias

- React + Vite
- CSS puro (mobile-first)
- Custom Hook (`useWeather`)
- Open-Meteo API (Geocoding + Forecast)

## Arquitetura

```text
weather-app/
├── hooks/
│   └── useWeather.js           ← Busca, transformação de dados e estados da tela
├── utils/
│   └── weatherCodes.js         ← Mapeamento de códigos climáticos e formatações
├── components/
│   ├── Header.jsx              ← Logo + menu de unidades
│   ├── SearchBar.jsx           ← Busca em tempo real + dropdown de estados/resultados
│   ├── CurrentWeather.jsx      ← Card principal do clima atual
│   ├── WeatherMetrics.jsx      ← Cards de métricas (4 colunas)
│   ├── DailyForecast.jsx       ← Grade de previsão diária (7 dias)
│   └── HourlyForecast.jsx      ← Previsão horária por dia selecionado
├── weather-app.jsx             ← Componente principal (orquestra estados)
└── weather-app.css             ← Layout global e breakpoints
```

## Observações Técnicas

- A API Open-Meteo exige `wind_speed_unit=kmh` para métrico.
- A UI exibe `km/h`, mas o parâmetro enviado para API é `kmh`.

## Como rodar

Na raiz do projeto:

```bash
npm install
npm run dev
```

Rota local do desafio:

```text
http://localhost:5173/#/weather-app
```