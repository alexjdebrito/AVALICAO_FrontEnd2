import { useState } from 'react';
import { Box, Typography } from '@mui/material';

interface Membro {
  nome: string;
  iniciais: string;
}

const MEMBROS: Membro[] = [
  { nome: 'Ana Julya Rodrigues Dionizio', iniciais: 'AR' },
  { nome: 'Alex Júlio de Brito',          iniciais: 'AB' },
];

function CardMembro({ nome, iniciais }: Membro) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        flex: 1,
        minWidth: 260,
        maxWidth: 320,
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 4,
        p: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        cursor: 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{
        width: 88,
        height: 88,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        border: '1px solid rgba(255,255,255,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 700,
        transition: 'transform 0.3s ease',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }}>
        {iniciais}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>
        {nome}
      </Typography>
    </Box>
  );
}

export default function Sobre() {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h2" gutterBottom>Equipe de Desenvolvimento</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 6, opacity: 0.8 }}>
        Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Front-end.
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
        {MEMBROS.map((m) => <CardMembro key={m.iniciais} {...m} />)}
      </Box>
    </Box>
  );
}
