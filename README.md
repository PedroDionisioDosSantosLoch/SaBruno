# SaBruno

Projeto final de Full Stack (SENAI) — um sistema de gestão escolar com autenticação,
controle de acesso por papéis (roles) e CRUD completo de alunos, turmas, matrículas e notas.

## Tecnologias

**Front-end**
- React 19 + Vite
- React Router DOM
- Axios
- Tailwind CSS

**Back-end**
- Node.js + Express
- MySQL + Sequelize (ORM)
- JWT (autenticação)
- bcrypt (hash de senha)
- Joi (validação de dados)
- CORS

## Estrutura do projeto

```
SaBruno/
├── Back/
│   ├── config/         # conexão com o banco de dados
│   ├── controllers/    # lógica de cada entidade
│   ├── middleware/      # autenticação, roles e validação
│   ├── models/          # models do Sequelize
│   ├── routes/          # rotas do Express
│   └── server.js
├── src/                 # front-end (React)
│   ├── components/
│   ├── context/          # AuthContext (login/token)
│   ├── pages/
│   └── services/         # chamadas à API (axios)
├── .env                  # variáveis de ambiente (não versionado)
└── package.json
```

## Como rodar o projeto

### 1. Pré-requisitos
- Node.js instalado
- MySQL Server rodando localmente (ex: via MySQL Workbench/Installer)

### 2. Instalar as dependências
Na raiz do projeto:
```bash
npm install
```

### 3. Criar o banco de dados
No MySQL, crie um schema (banco) vazio chamado `escoladb`. As tabelas são
criadas automaticamente pelo Sequelize na primeira vez que o servidor sobe.

### 4. Configurar o `.env`
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo,
ajustando usuário/senha do seu MySQL local:

```
DB_NAME=escoladb
DB_USER=root
DB_PASSWORD=senai
DB_HOST=localhost

JWT_SECRET=SEGREDO_SUPER_SECRETO

VITE_API_URL=http://localhost:3001
```

### 5. Rodar o back-end
```bash
node Back/server.js
```
O servidor sobe em `http://localhost:3001`.

### 6. Rodar o front-end
Em outro terminal:
```bash
npm run dev
```
O front sobe em `http://localhost:5173` (padrão do Vite).

### 7. Criar o primeiro usuário
Como ainda não existe tela de cadastro no front, crie o primeiro usuário
via Postman/Thunder Client:

```
POST http://localhost:3001/users/register
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@sabruno.com",
  "password": "123456",
  "role": "admin"
}
```

Depois disso, faça login normalmente pela tela do front.

## Autenticação e papéis (roles)

O sistema tem três papéis: `admin`, `professor` e `aluno`. No login, o
back-end gera um token JWT contendo o `id` e a `role` do usuário. Esse
token deve ser enviado no header das requisições protegidas:

```
Authorization: Bearer <token>
```

Algumas rotas exigem role específica (ex: listar ou remover usuários só
funciona para `admin`), validado pelo `roleMiddleware`.

## Rotas da API

### Usuários (`/users`)
| Método | Rota | Protegida? | Descrição |
|---|---|---|---|
| POST | `/users/register` | Não | Cria um novo usuário |
| POST | `/users/login` | Não | Autentica e retorna o token JWT |
| GET | `/users` | Sim (admin) | Lista todos os usuários |
| GET | `/users/:id` | Sim | Busca um usuário por id |
| PUT | `/users/:id` | Sim | Atualiza um usuário |
| DELETE | `/users/:id` | Sim (admin) | Remove um usuário |

### Alunos (`/students`)
| Método | Rota | Protegida? | Descrição |
|---|---|---|---|
| GET | `/students` | Não | Lista todos os alunos |
| GET | `/students/:id` | Não | Busca um aluno por id |
| POST | `/students` | Sim | Cria um aluno |
| PUT | `/students/:id` | Não | Atualiza um aluno |
| DELETE | `/students/:id` | Não | Remove um aluno |

### Turmas (`/classes`)
CRUD completo, mesmo padrão das rotas acima.

### Matrículas (`/enrollments`)
CRUD completo — cada registro liga um `studentId` a um `classId`.

### Notas (`/grades`)
CRUD completo — cada registro liga um `studentId` a uma `nota` (0 a 10).

## Autores

Projeto em grupo — SENAI, Full Stack.