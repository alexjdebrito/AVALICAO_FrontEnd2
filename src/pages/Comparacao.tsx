import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import { fetchWeather, WeatherData } from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';

export default function Comparacao() {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [data1, setData1] = useState<WeatherData | null>(null);
  const [data2, setData2] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city1.trim() || !city2.trim()) {
      setError('Por favor, insira o nome de duas cidades para comparar.');
      return;
    }
    setLoading(true);
    setError(null);
    setData1(null);
    setData2(null);
    try {
      const [res1, res2] = await Promise.all([fetchWeather(city1), fetchWeather(city2)]);
      setData1(res1);
      setData2(res2);
    } catch {
      setError('Falha ao comparar. Verifique se os nomes estão corretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>Comparação de Clima</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, opacity: 0.8 }}>
        Compare de forma simples e visual o clima de duas cidades.
      </Typography>

      <Box component="form" onSubmit={handleCompare} sx={{ maxWidth: 640, mx: 'auto', mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Cidade 1"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            disabled={loading}
            sx={{ flex: 1, minWidth: 180 }}
          />
          <CompareArrowsRoundedIcon sx={{ fontSize: 28, opacity: 0.6 }} />
          <TextField
            placeholder="Cidade 2"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            disabled={loading}
            sx={{ flex: 1, minWidth: 180 }}
          />
        </Box>
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Comparando...' : 'Comparar Cidades'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, maxWidth: 640, mx: 'auto', bgcolor: 'rgba(239,68,68,0.2)', color: '#fff', border: '1px solid rgba(239,68,68,0.5)', '& .MuiAlert-icon': { color: '#fca5a5' } }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {data1 && <Box sx={{ flex: 1, minWidth: 280 }}><WeatherCard data={data1} /></Box>}
        {data2 && <Box sx={{ flex: 1, minWidth: 280 }}><WeatherCard data={data2} /></Box>}
      </Box>
    </Box>
  );
}
