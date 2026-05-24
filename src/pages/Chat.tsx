import { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

interface Message {
  sender: 'user' | 'gemini';
  text: string;
}

const GEMINI_API_KEY = 'AIzaSyDK9zto4Ti2JFZiR5xUqUz6V5pPua2mRXE';

const INITIAL: Message = {
  sender: 'gemini',
  text: 'Olá! Sou o assistente do ClimaApp. Posso te ajudar com dúvidas sobre clima, previsões e muito mais.',
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      // URL corrigida de v1beta para v1 para aceitar o modelo gemini-2.5-flash
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: userText }] }] }),
        }
      );
      
      if (!res.ok) throw new Error(`Erro status: ${res.status}`);
      
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'gemini', text: data.candidates[0].content.parts[0].text }]);
    } catch (error) {
      console.error("Erro na integração com o Gemini:", error);
      setMessages(prev => [...prev, { sender: 'gemini', text: 'Desculpe, não consegui processar sua mensagem. Tente novamente.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h2" gutterBottom>Conversar com a IA</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, opacity: 0.8 }}>
        Tire suas dúvidas sobre o clima, previsões ou qualquer outro assunto.
      </Typography>

      {/* Message list */}
      <Box sx={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 3,
        p: 2,
        height: 400,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        mb: 2,
      }}>
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 2.5,
              px: 1.75,
              py: 1.25,
              maxWidth: '80%',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}
          >
            {msg.text}
          </Box>
        ))}
        {loading && (
          <Box sx={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 1, opacity: 0.7 }}>
            <CircularProgress size={14} sx={{ color: 'inherit' }} />
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>Gemini está pensando...</Typography>
          </Box>
        )}
      </Box>

      {/* Input */}
      <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', gap: 1.5 }}>
        <TextField
          fullWidth
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !input.trim()} endIcon={<SendRoundedIcon />}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
}