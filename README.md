# RNMSearch Web

Aplicação web desenvolvida em Next.js para explorar episódios da série Rick and Morty, com funcionalidades de listagem paginada e visualização detalhada de episódios, personagens e localizações.

## Descrição do Projeto

O RNMSearch Web é uma interface moderna e responsiva que consome uma API REST para exibir informações sobre episódios da série Rick and Morty. A aplicação oferece:

- Listagem paginada de episódios com informações básicas
- Visualização detalhada de cada episódio
- Exibição de personagens que aparecem em cada episódio
- Lista de localizações relacionadas aos episódios
- Design responsivo com tema claro e escuro
- Paleta de cores inspirada na série (verde esmeralda, ciano e roxo)

## Tecnologias Utilizadas

- **Next.js 16.0.1** - Framework React com Turbopack
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para requisições
- **Zod** - Validação de schemas e tipos
- **Sonner** - Sistema de notificações toast
- **Biome** - Linter e formatter

## Requisitos

- Node.js 22.21 ou superior
- npm ou yarn
- Backend da API rodando na porta 3001

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/leossb36/RNMSearch_web.git
cd RNMSearch_web
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto:
```env
API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

### Build de Produção
```bash
npm run build
npm start
```

### Usando Makefile
```bash
make build    # Builda o app
make run      # Iniciar o app
make lint     # Executar linter
```

## Estrutura de Pastas

```
RNMSearch_web/
├── public/
│   └── assets/
│       ├── temporada-1.jpg
│       ├── temporada-2.png
│       ├── temporada-3.jpg
│       ├── temporada-4.jpg
│       ├── temporada-5.webp
│       ├── temporada-6.jpeg
│       └── temporada-7.jpg
├── src/
│   ├── app/
│   │   ├── (pages)/
│   │   │   ├── episode/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Página de detalhes do episódio
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── button.tsx          # Componente de botão
│   │   │       ├── card.tsx            # Componente de card
│   │   │       ├── episode-detail.tsx  # Componente de detalhes do episódio
│   │   │       ├── home-page.tsx       # Componente da página inicial
│   │   │       ├── input.tsx           # Componente de input
│   │   │       ├── label.tsx           # Componente de label
│   │   │       └── navbar.tsx          # Barra de navegação
│   │   ├── style/
│   │   │   └── globals.css             # Estilos globais
│   │   ├── layout.tsx                  # Layout principal da aplicação
│   │   └── page.tsx                    # Página raiz
│   ├── hooks/                          # Hooks customizados
│   ├── lib/
│   │   ├── functions/
│   │   │   └── index.ts                # Funções utilitárias (getSeasonImage)
│   │   ├── api.ts                      # Configuração do Axios
│   │   ├── env.ts                      # Validação de variáveis de ambiente
│   │   └── utils.ts                    # Utilitários gerais
│   ├── schemas/
│   │   ├── index.ts                    # Exportação de schemas
│   │   ├── login.schema.ts             # Schema de login
│   │   └── reset-password.schema.ts    # Schema de reset de senha
│   └── utils/
│       ├── constant.ts                 # Constantes da aplicação
│       └── index.ts                    # Exportação de utilitários
├── biome.json                          # Configuração do Biome
├── components.json                     # Configuração de componentes
├── dockerfile                          # Dockerfile para containerização
├── makefile                            # Comandos make para automação
├── next.config.ts                      # Configuração do Next.js
├── package.json                        # Dependências e scripts
├── postcss.config.mjs                  # Configuração PostCSS
├── proxy.ts                            # Configuração de proxy
├── tailwind.config.js                  # Configuração Tailwind CSS
└── tsconfig.json                       # Configuração TypeScript
```

## Funcionalidades

### Listagem de Episódios
- Tabela responsiva com paginação
- Exibição de imagem da temporada
- Informações: código do episódio, nome, data de exibição
- Navegação entre páginas (anterior/próxima)
- Contador de itens totais e páginas

### Detalhes do Episódio
- Informações completas do episódio
- Grid de personagens com fotos, nome, espécie e status
- Lista de localizações com tipo e dimensão
- Botão de retorno para listagem

### Sistema de Imagens
- Mapeamento automático de temporadas para imagens locais
- Suporte a múltiplos formatos (jpg, jpeg, png, webp)
- Fallback para temporada 1 em caso de erro

## Endpoints da API

A aplicação consome os seguintes endpoints:

- `GET /api/integrations/episodes?page={page}` - Lista paginada de episódios
- `GET /api/integrations/episode/{id}` - Detalhes de um episódio específico

## Proxy e CORS

O Next.js está configurado para fazer proxy das requisições da API, evitando problemas de CORS:
- Cliente: `http://localhost:3000/api/*`
- Servidor: `http://localhost:3001/api/*`


## Observações

- Certifique-se de que o backend está rodando na porta 3001
- As imagens das temporadas devem estar em `/public/assets/`
- O projeto usa o Biome para linting e formatting

## Autor

**Leonardo Barreiros**

- GitHub: [@leossb36](https://github.com/leossb36)