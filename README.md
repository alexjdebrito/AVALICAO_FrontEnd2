# 🌤️ ClimaApp — Aplicativo de Consulta e Comparação de Clima

O **ClimaApp** é um aplicativo web, responsivo e de alta performance projetado para fornecer dados meteorológicos precisos em tempo real. Desenvolvido com uma arquitetura baseada em **React**, **TypeScript** e **Vite**, o sistema oferece uma experiência fluida para os usuários consultarem o clima de qualquer cidade do mundo ou realizarem comparações climáticas detalhadas entre duas regiões simultaneamente.

Este projeto foi construído como parte dos requisitos avaliativos para a disciplina de **TECNOLOGIA PARA FRONTEND AVANÇADO**.

---

## 💻 O que o projeto faz?

O aplicativo é dividido em três áreas de navegação principais:
1. **Consultar Clima:** Uma tela centralizada onde o usuário digita o nome de uma cidade e recebe instantaneamente informações detalhadas como temperatura em Celsius, descrição do tempo (ex: parcialmente nublado), umidade relativa do ar e velocidade do vento.
2. **Comparação de Clima:** Permite a entrada de duas cidades diferentes ao mesmo tempo. O sistema processa as requisições em paralelo e renderiza os dois cartões lado a lado, facilitando a análise visual das diferenças climáticas.
3. **Equipe de Desenvolvimento (Sobre):** Uma página dedicada a apresentar os integrantes do projeto através de cards customizados que utilizam microinterações visuais modernas para engajamento do usuário.

---

## 🛠️ O que ele usa para funcionar? (Tecnologias)

A pilha tecnológica foi selecionada visando máxima performance, tipagem segura e independência de bibliotecas pesadas que pudessem causar incompatibilidades de ambiente:

* **React 18:** Biblioteca principal para a criação da interface baseada em componentes reutilizáveis e gerenciamento de estados dinâmicos (`useState`, `useEffect`).
* **TypeScript:** Utilizado para garantir tipagem estática em toda a aplicação, aumentando a segurança do código (especialmente na modelagem dos dados de retorno da API).
* **Vite:** Ferramenta de build e servidor de desenvolvimento de última geração que entrega um hot-reload instantâneo durante o desenvolvimento.
* **OpenWeatherMap API:** Serviço global de meteorologia utilizado para fornecer dados climáticos mundiais e em tempo real.
* **HTML5 Nativo & CSS3 (Inline Styles Avançado):** Toda a estilização e animações foram concebidas nativamente através de JavaScript/TypeScript estruturado. Isso garante que os componentes sejam 100% isolados, eliminando conflitos de pacotes globais ou quebras de CSS no navegador.

---

## 🧠 Como ele funciona? (Estrutura e Lógica)

* **Integração Assíncrona:** A comunicação com a API externa é feita através do método nativo `fetch` usando estruturas `async/await` dentro de um serviço isolado (`weatherApi.ts`).
* **Arquitetura Baseada em Componentes:** O design dos cartões de exibição de clima foi abstraído no componente isolado `<WeatherCard />`, permitindo que ele seja utilizado tanto na tela de busca única quanto duplicado dinamicamente na tela de comparação.
* **Tratamento Resiliente de Erros:** O sistema intercepta erros HTTP em tempo real (como o erro de digitação de uma cidade inexistente ou falhas de credenciais). Em vez de travar a aplicação, o erro é capturado pelo bloco `try/catch` e renderizado em um componente de alerta vermelho amigável para o usuário.
* **Animações Fluidas por Estado:** Na tela "Sobre", o efeito visual de flutuação (*hover*) e mudança de sombra dos cards é controlado monitorando os eventos de mouse do React (`onMouseEnter` e `onMouseLeave`), modificando dinamicamente as propriedades CSS de transformação espacial (`translateY`) em milissegundos.

---

## 📂 Estrutura de Pastas

src/
├── components/      # Componentes globais reutilizáveis pela aplicação
│   └── WeatherCard.tsx
├── pages/           # Páginas principais que atuam como as views da SPA
│   ├── Home.tsx
│   ├── Comparacao.tsx
│   └── Sobre.tsx
├── services/        # Módulo isolado de comunicação com APIs externas
│   └── weatherApi.ts
├── App.tsx          # Componente raiz que centraliza o layout e o gerenciamento de rotas
└── main.tsx         # Ponto de entrada que inicializa e renderiza o React no DOM

## Pré-requisitos
  Certifique-se de ter instalado em sua máquina:
Node.js (Versão 18 ou superior recomendada)
npm (Gerenciador de pacotes que já acompanha a instalação do Node)
Um editor de código (Recomendado: VS Code)

  Instalar as Dependências
Com o terminal aberto na pasta raiz do projeto (onde fica o arquivo package.json), digite:
"npm install"
Esse comando vai ler a lista de dependências do manifesto e baixar de forma automatizada todas
as pastas essenciais do ecossistema do React e do TypeScript.

 Configurar a Chave de API
Para que o projeto realize as consultas, ele precisa de um token de acesso do provedor de clima.

Crie uma conta gratuita em **OpenWeatherMap**.
Acesse a aba My API Keys no seu painel e copie a chave gerada.

No seu editor de código, abra o arquivo src/services/weatherApi.ts.

Localize a linha contendo a constante API_KEY e insira o seu token entre as aspas:

"const API_KEY = 'COLE_AQUI_A_SUA_CHAVE_DA_API';"

   Executar o Aplicativo
Agora, basta iniciar o servidor local do Vite rodando o comando:

"npm run dev"

 END!
