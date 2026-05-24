import { Box, Typography, Divider } from '@mui/material';
import { ForecastDay } from '../services/weatherApi';

const glassCard = {
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(8px)',
  borderRadius: 3,
  border: '1px solid rgba(255,255,255,0.2)',
};

export default function ForecastCard({ days }: { days: ForecastDay[] }) {
  return (
    <Box sx={{ ...glassCard, p: 2, mt: 2 }}>
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7, mb: 1.5 }}>
        Próximos 5 dias
      </Typography>
      {days.map((day, i) => (
        <Box key={day.date}>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
            <Typography sx={{ width: 72, fontWeight: 600, fontSize: '0.9rem' }}>{day.date}</Typography>
            <span style={{ fontSize: '1.4rem', marginRight: 12 }}>{day.icon}</span>
            <Typography sx={{ flex: 1, fontSize: '0.8rem', opacity: 0.75, textTransform: 'capitalize' }}>
              {day.condition}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, fontWeight: 600, fontSize: '0.9rem' }}>
              <Typography component="span" sx={{ opacity: 0.55, fontWeight: 400, fontSize: '0.9rem' }}>{day.tempMin}°</Typography>
              <Typography component="span" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{day.tempMax}°</Typography>
            </Box>
          </Box>
          {i < days.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />}
        </Box>
      ))}
    </Box>
  );
}
