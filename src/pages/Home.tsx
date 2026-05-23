import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

import {
  fetchWeather,
  fetchForecast,
  getWeatherTheme,
  WeatherData,
  ForecastDay,
  WeatherTheme,
} from '../services/weatherApi';

import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';

interface Props {
  onThemeChange: (theme: WeatherTheme | null) => void;
}

export default function Home({ onThemeChange }: Props) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] =
    useState<WeatherData | null>(null);

  const [forecast, setForecast] =
    useState<ForecastDay[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSearch = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!city.trim()) return;

    setLoading(true);

    setError(null);

    setWeatherData(null);

    setForecast([]);

    onThemeChange(null);

    try {
      const [data, forecastDays] =
        await Promise.all([
          fetchWeather(city),
          fetchForecast(city),
        ]);

      setWeatherData(data);

      setForecast(forecastDays);

      onThemeChange(
        getWeatherTheme(data.rawIcon)
      );
    } catch (err: any) {
      setError(
        err.message ||
          'Erro ao buscar dados.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '32px auto',
        padding: '0 16px',
        fontFamily: 'sans-serif',
      }}
    >
      <Typography
        variant="h2"
        style={{ fontSize: '2rem' }}
      >
        Consultar Clima
      </Typography>

      <Typography
        variant="body1"
        style={{
          textAlign: 'center',
          color: 'inherit',
          marginBottom: '32px',
        }}
      >
        Descubra as condições climáticas atuais
        de qualquer cidade.
      </Typography>

      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <TextField
          fullWidth
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          disabled={loading}
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Buscando...'
            : 'Buscar'}
        </Button>
      </form>

      {error && (
        <div
          style={{
            padding: '16px',

            background:
              'rgba(239,68,68,0.2)',

            border:
              '1px solid rgba(239,68,68,0.5)',

            color: '#fff',

            borderRadius: '8px',

            marginBottom: '24px',

            backdropFilter: 'blur(4px)',
          }}
        >
          {error}
        </div>
      )}

      {weatherData && (
        <WeatherCard data={weatherData} />
      )}

      {forecast.length > 0 && (
        <ForecastCard days={forecast} />
      )}
    </div>
  );
}