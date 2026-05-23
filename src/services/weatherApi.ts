export interface WeatherData {
  name: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  rawIcon: string;
  timezoneOffset: number;
}

export interface ForecastDay {
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: string;
}

export interface WeatherTheme {
  gradient: string;
  imageUrl: string;
  textColor: string;
}

const API_KEY = '58528f231ceb5f9785597d221729ddc4';

function getEmojiIcon(iconCode: string): string {
  if (iconCode.startsWith('01')) return '☀️';
  if (iconCode.startsWith('02')) return '⛅';
  if (iconCode.startsWith('03') || iconCode.startsWith('04')) return '☁️';
  if (iconCode.startsWith('09') || iconCode.startsWith('10')) return '🌧️';
  if (iconCode.startsWith('11')) return '⛈️';
  if (iconCode.startsWith('13')) return '❄️';
  if (iconCode.startsWith('50')) return '🌫️';
  return '🌡️';
}

export function getWeatherTheme(iconCode: string): WeatherTheme {
  if (iconCode.startsWith('01d')) return {
    gradient: 'linear-gradient(160deg, #74b9ff 0%, #0984e3 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1600&q=80',
    textColor: '#fff',
  };
  if (iconCode.startsWith('01n')) return {
    gradient: 'linear-gradient(160deg, #2d3436 0%, #0a0a2e 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1651959976896-3b5f2eb1e179?w=1600&q=80',
    textColor: '#fff',
  };
  if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) return {
    gradient: 'linear-gradient(160deg, #b2bec3 0%, #636e72 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=1600&q=80',
    textColor: '#fff',
  };
  if (iconCode.startsWith('09') || iconCode.startsWith('10')) return {
    gradient: 'linear-gradient(160deg, #4a6fa5 0%, #2d3a4a 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1530743373890-f3c506b0b5b1?w=1600&q=80',
    textColor: '#fff',
  };
  if (iconCode.startsWith('11')) return {
    gradient: 'linear-gradient(160deg, #2d3436 0%, #1a1a2e 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1600&q=80',
    textColor: '#fff',
  };
  if (iconCode.startsWith('13')) return {
    gradient: 'linear-gradient(160deg, #dfe6e9 0%, #b2bec3 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1600&q=80',
    textColor: '#1e293b',
  };
  if (iconCode.startsWith('50')) return {
    gradient: 'linear-gradient(160deg, #b2bec3 0%, #747d8c 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1580207868427-f019836acf26?w=1600&q=80',
    textColor: '#fff',
  };
  return {
    gradient: 'linear-gradient(160deg, #74b9ff 0%, #0984e3 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1600&q=80',
    textColor: '#fff',
  };
}

function mapWeatherData(data: any): WeatherData {
  return {
    name: data.name,
    temp: Math.round(data.main.temp),
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    icon: getEmojiIcon(data.weather[0].icon),
    rawIcon: data.weather[0].icon,
    timezoneOffset: data.timezone,
  };
}

function parseForecast(data: any): ForecastDay[] {
  const days: Record<string, { temps: number[]; condition: string; icon: string }> = {};

  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    if (date.toDateString() === new Date().toDateString()) continue;

    const key = date.toISOString().split('T')[0];
    if (!days[key]) {
      days[key] = { temps: [], condition: item.weather[0].description, icon: item.weather[0].icon };
    }
    days[key].temps.push(item.main.temp);
    if (date.getHours() >= 11 && date.getHours() <= 14) {
      days[key].condition = item.weather[0].description;
      days[key].icon = item.weather[0].icon;
    }
  }

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return Object.entries(days)
    .slice(0, 5)
    .map(([dateStr, info]) => {
      const d = new Date(dateStr + 'T12:00:00');
      return {
        date: `${weekDays[d.getDay()]}, ${d.getDate()}`,
        tempMin: Math.round(Math.min(...info.temps)),
        tempMax: Math.round(Math.max(...info.temps)),
        condition: info.condition,
        icon: getEmojiIcon(info.icon),
      };
    });
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const sanitizedCity = encodeURIComponent(city.trim());
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${sanitizedCity}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    if (response.status === 404) throw new Error('Cidade não encontrada. Verifique a grafia e tente novamente.');
    if (!response.ok) throw new Error('Erro ao conectar com o serviço de clima.');
    return mapWeatherData(await response.json());
  } catch (error: any) {
    throw new Error(error.message || 'Falha ao buscar dados climáticos.');
  }
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar clima da localização atual.');
  return mapWeatherData(await response.json());
}

export async function fetchForecast(city: string): Promise<ForecastDay[]> {
  const sanitizedCity = encodeURIComponent(city.trim());
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${sanitizedCity}&appid=${API_KEY}&units=metric&lang=pt_br`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar previsão do tempo.');
  return parseForecast(await response.json());
}

export async function fetchForecastByCoords(lat: number, lon: number): Promise<ForecastDay[]> {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar previsão da localização atual.');
  return parseForecast(await response.json());
}
