import { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { WeatherData } from '../services/weatherApi';

function useCityTime(timezoneOffset: number) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const utcMs = Date.now() + new Date().getTimezoneOffset() * 60_000;
      const d = new Date(utcMs + timezoneOffset * 1_000);
      setTime(d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezoneOffset]);
  return time;
}

function getUtcLabel(offsetSeconds: number) {
  const mins = offsetSeconds / 60;
  const h = Math.floor(Math.abs(mins) / 60);
  const m = Math.abs(mins) % 60;
  const sign = mins >= 0 ? '+' : '-';
  return m > 0 ? `UTC${sign}${h}:${String(m).padStart(2, '0')}` : `UTC${sign}${h}`;
}

const glassCard = {
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(8px)',
  borderRadius: 3,
  border: '1px solid rgba(255,255,255,0.2)',
  color: 'inherit',
};

export default function WeatherCard({ data }: { data: WeatherData }) {
  const time = useCityTime(data.timezoneOffset);
  const utcLabel = getUtcLabel(data.timezoneOffset);

  return (
    <Box sx={{ ...glassCard, p: 3 }}>
      {/* City + clock */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{data.name}</Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}>
            {time}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', opacity: 0.6 }}>{utcLabel}</Typography>
        </Box>
      </Box>

      {/* Temp + condition */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <span style={{ fontSize: '3rem' }}>{data.icon}</span>
        <Box>
          <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{data.temp}°C</Typography>
          <Typography sx={{ opacity: 0.75, textTransform: 'capitalize', mt: 0.5 }}>{data.condition}</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mb: 2 }} />

      {/* Stats */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        {[
          { label: '💧 Umidade', value: `${data.humidity}%` },
          { label: '💨 Vento',   value: `${data.windSpeed} km/h` },
        ].map(({ label, value }) => (
          <Box key={label} sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.8rem', opacity: 0.65 }}>{label}</Typography>
            <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
