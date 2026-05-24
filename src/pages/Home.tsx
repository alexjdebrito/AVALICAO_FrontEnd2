import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';
import {
  fetchWeather, fetchWeatherByCoords,
  fetchForecast, fetchForecastByCoords,
  getWeatherTheme, WeatherData, ForecastDay, WeatherTheme,
} from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';

interface Props {
  onThemeChange: (theme: WeatherTheme) => void;
}

export default function Home({ onThemeChange }: Props) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyResults = (data: WeatherData, days: ForecastDay[]) => {
    setWeatherData(data);
    setForecast(days);
    onThemeChange(getWeatherTheme(data.rawIcon));
  };

  useEffect(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setLocating(false);
        setLoading(true);
        try {
          const [data, days] = await Promise.all([
            fetchWeatherByCoords(coords.latitude, coords.longitude),
            fetchForecastByCoords(coords.latitude, coords.longitude),
          ]);
          setCity(data.name);
          applyResults(data, days);
        } catch { /* silent — user can search manually */ }
        finally { setLoading(false); }
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [data, days] = await Promise.all([fetchWeather(city), fetchForecast(city)]);
      applyResults(data, days);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h2" gutterBottom>Consultar Clima</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, opacity: 0.8 }}>
        Descubra as condições climáticas atuais de qualquer cidade.
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading || locating}
        />
        <Button type="submit" disabled={loading || locating} startIcon={<SearchRoundedIcon />}>
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </Box>

      {locating && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3, opacity: 0.8 }}>
          <MyLocationRoundedIcon fontSize="small" />
          <Typography variant="body2">Detectando sua localização...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(239,68,68,0.2)', color: '#fff', border: '1px solid rgba(239,68,68,0.5)', '& .MuiAlert-icon': { color: '#fca5a5' } }}>
          {error}
        </Alert>
      )}

      {weatherData && <WeatherCard data={weatherData} />}
      {forecast.length > 0 && <ForecastCard days={forecast} />}
    </Box>
  );
}
