import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import Home from './pages/Home';
import Comparacao from './pages/Comparacao';
import Chat from './pages/Chat';
import Sobre from './pages/Sobre';
import { WeatherTheme, getWeatherTheme } from './services/weatherApi';

type Tab = 'consultar' | 'comparar' | 'chat' | 'sobre';

const TABS: { id: Tab; label: string }[] = [
  { id: 'consultar',   label: 'Consultar'   },
  { id: 'comparar', label: 'Comparar' },
  { id: 'chat',     label: 'Chat IA'  },
  { id: 'sobre',    label: 'Sobre'    },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('consultar');
  const [theme, setTheme] = useState<WeatherTheme>(getWeatherTheme('01d'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        color: theme.textColor,
        backgroundImage: `url("${theme.imageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transition: 'color 0.6s ease',
        position: 'relative',
      }}
    >
      {/* Dark overlay */}
      <Box sx={{
        position: 'fixed',
        inset: 0,
        bgcolor: 'rgba(0,0,0,0.38)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: 'rgba(0,0,0,0.28)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        transition: 'background 0.6s ease',
      }}>
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 }, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WbSunnyRoundedIcon sx={{ color: theme.textColor }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.textColor }}>
              ClimaApp
            </Typography>
          </Box>
          <Box component="nav" sx={{ display: 'flex', gap: 0.5 }}>
            {TABS.map(({ id, label }) => (
              <Button
                key={id}
                onClick={() => setTab(id)}
                sx={{
                  color: theme.textColor,
                  fontWeight: tab === id ? 700 : 400,
                  bgcolor: tab === id ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 5 }}>
        {tab === 'consultar'   && <Home onThemeChange={setTheme} />}
        {tab === 'comparar' && <Comparacao />}
        {tab === 'chat'     && <Chat />}
        {tab === 'sobre'    && <Sobre />}
      </Container>
    </Box>
  );
}
