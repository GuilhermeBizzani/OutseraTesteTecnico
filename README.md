# OutseraTesteTecnico

> Teste Técnico para a empresa Outsera - API REST para Golden Raspberry Awards

## 📋 Sobre o Projeto

Este projeto é uma API REST desenvolvida em Node.js com TypeScript para gerenciar dados do Golden Raspberry Awards (prêmio de piores filmes do ano). A aplicação lê um arquivo CSV contendo informações sobre os filmes indicados e vencedores, armazena os dados em um banco de dados SQLite em memória e disponibiliza endpoints REST para consulta, focado no maior e menor intervalo entre prêmios de um mesmo produtor.

## 🚀 Tecnologias Utilizadas

- **Runtime**: Node.js (>= 10.15.3)
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **Banco de Dados**: SQLite (em memória) via `better-sqlite3`
- **ORM**: TypeORM
- **Parser CSV**: `csv-parse`
- **Logging**: Morgan com rotating file streams
- **Testes**: Jest + Supertest (testes de integração)

### Sobre as Bibliotecas de Teste

- **Jest**: Framework de testes JavaScript com suporte nativo a TypeScript via `ts-jest`. Utilizado para executar os testes de integração com configuração simplificada.
- **Supertest**: Biblioteca para testes de APIs HTTP. Permite simular requisições HTTP aos endpoints da aplicação sem a necessidade de subir um servidor real.
- **SQLite (better-sqlite3)**: Banco de dados em memória que não requer configuração externa. Ideal para testes de integração, pois cada teste pode ter seu próprio banco de dados isolado e limpo.

## 📁 Estrutura do Projeto

```
OutseraTesteTecnico/
├── data/
│   └── Movielist.csv            # Arquivo CSV com dados dos filmes
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração do banco de dados (SQLite em memória)
│   ├── models/
│   │   └── Movie.ts             # Entidade Movie (TypeORM)
│   ├── services/
│   │   ├── database.service.ts  # Operações de banco de dados (CRUD, queries)
│   │   ├── csv.service.ts       # Parsing e importação do CSV
│   │   └── movies.service.ts    # Lógica de negócio dos filmes
│   ├── controllers/
│   │   └── movies.controller.ts # Handlers das rotas de filmes
│   ├── routes/
│   │   ├── index.ts             # Router principal
│   │   └── movies.ts            # Router de filmes (endpoints da API)
│   ├── types/
│   │   └── index.d.ts           # Definições de tipos TypeScript
│   ├── constants.ts             # Constantes da aplicação
│   ├── util.ts                  # Funções utilitárias
│   └── index.ts                 # Ponto de entrada da aplicação
├── tests/
│   ├── integration/
│   │   └── producers-intervals.test.ts   # Testes de integração do endpoint /producers-intervals
│   ├── helpers/
│   │   └── testDb.ts            # Utilitários para testes (setup/teardown do banco)
│   └── setup.ts                 # Configuração global dos testes
├── jest.config.js               # Configuração do Jest
└── package.json
```

## 🔧 Pré-requisitos

- Node.js >= 10.15.3
- Yarn

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/GuilhermeBizzani/OutseraTesteTecnico
cd OutseraTesteTecnico

# Instale as dependências
yarn
```

## ▶️ Como Executar

### Modo Desenvolvimento

```bash
yarn start
```

O servidor será iniciado em `http://localhost:3000`

### Build para Produção

```bash
yarn build
```

### Executar em Produção

```bash
# Iniciar
yarn start-prod

# Parar
yarn stop-prod -- <id>
```

## 🧪 Testes

O projeto possui testes de integração completos.

### Executar Testes

```bash
# Executar todos os testes
yarn test

# Executar testes em modo watch (re-executa ao alterar arquivos)
yarn test:watch

# Executar testes com relatório de cobertura
yarn test:coverage
```

### Cobertura de Testes

Os testes de integração cobrem:

- ✅ Endpoint `GET /movies/producers-intervals` - Intervalos de vitórias dos produtores
- ✅ Validação de estrutura de dados das respostas
- ✅ Casos extremos (banco de dados vazio, etc.)

## 🌐 Endpoints da API

Base URL: `http://localhost:3000`

### 1. Listar Todos os Filmes

```http
GET /movies
```

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "year": 1980,
      "title": "Can't Stop the Music",
      "studios": "Associated Film Distribution",
      "producers": "Allan Carr",
      "winner": true
    }
  ]
}
```

### 2. Obter Intervalos de Vitórias dos Produtores

```http
GET /movies/producers-intervals
```

Retorna os produtores com os maiores e menores intervalos entre vitórias consecutivas.

**Resposta:**
```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

## 📄 Formato do Arquivo CSV

O arquivo CSV deve estar localizado em `data/Movielist.csv` e seguir o seguinte formato:

```csv
year;title;studios;producers;winner
1980;Can't Stop the Music;Associated Film Distribution;Allan Carr;yes
1980;Cruising;Lorimar Productions, United Artists;Jerry Weintraub;
```

**Colunas:**
- `year`: Ano de lançamento do filme
- `title`: Título do filme
- `studios`: Estúdios de produção (podem ser múltiplos, separados por vírgula)
- `producers`: Produtores do filme (podem ser múltiplos, separados por vírgula ou "and")
- `winner`: "yes" para vencedores, vazio para indicados

**Observação:** O CSV utiliza ponto e vírgula (`;`) como delimitador.

## ✨ Funcionalidades

- ✅ Banco de dados SQLite em memória (não requer servidor de banco externo)
- ✅ Importação automática do CSV na inicialização
- ✅ API RESTful com TypeScript
- ✅ Endpoint especial para análise de intervalos de vitórias de produtores
- ✅ Separação de responsabilidades (routes, controllers, services, models)
- ✅ Testes de integração com Jest e Supertest
- ✅ Banco de dados isolado para testes

## 📝 Licença

MIT
