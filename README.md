
# 🍽 Food Explorer 🚀 Backend

Este projeto é o desafio final da trilha Explorer/Fullstack da Rocketseat. A proposta é criar uma aplicação fullstack web que simule o cardápio de um restaurante fictício.

Este é o repositório do backend da aplicação, para acessar o repositório do frontend [clique aqui](https://github.com/Leoz2s/food-explorer-frontend).

![App Preview](https://i.imgur.com/SyMNTAF.png)
### Estrutura do banco de dados 📝

![Database Screenshot](https://i.imgur.com/dvp8Jlh.png)

[Link do diagrama](https://drawsql.app/teams/main-team-14/diagrams/food-explorer)


## Features ✨
- Criar um cadastro na aplicação; (Cadastro de usuário no banco de dados)
- Fazer login; (Autenticação na aplicação)
- Visualizar pratos. 
- Busca de pratos pelo nome e por ingredietes.

Exclusivo para Admin:
- Criar pratos; Editar pratos; Excluir pratos.



## Tech Stack & Dependências 🛠
- JavaScript - Node.js
Dependências:
- express - express-async-errors - cors - jsonwebtoken - bcryptjs - dotenv - cookie-parser - knex - sqlite - sqlite3 - multer - pm2


## Link do Deploy ☁
Deploy da aplicação: (https://api-foodexplorer-6hcw.onrender.com).

🔑 Credenciais para o login como um usuário Admin na aplicação:

- E-mail: leonardo@email.com / Senha: 123456



## Instalação de pré-requisitos 📦
[Node.js](https://nodejs.org/en) - Versão v20.11.0 ou superior.

[npm](https://www.npmjs.com/) - Versão 10.2.5 ou superior.
    
## Rodar projeto localmente 💻

1- Faça download do .zip do projeto ou faça Git Clone do repositório:
```bash
git clone https://github.com/Leoz2s/food-explorer-backend.git
```

2- Acesse a pasta do projeto por meio de um terminal e execute o seguinte comando:

```bash
  cd diretorio-do-projeto

  npm install
```
- Isso fará com que todas as dependências da aplicação sejam instaladas.

3- Para iniciar o backend localmente, insira os comandos abaixo:

```bash
  npm run migrate

  npm run dev
```
Com a aplicação rodando em seu ambiente local, ela está disponível para seu uso.



## Variáveis de ambiente

O projeto tem duas variáveis de ambiente, localizadas no arquivo .env na raiz do projeto (o repositório tem o arquivo exemplo .env.example que você pode usar). 

`AUTH_SECRET`

A variável AUTH_SECRET é usada para armazenar o segredo do token. 

`PORT`

A variável PORT é usado para definir a porta em que o projeto deve rodar.

## Arquivo com requisições para o Insomnia

No respositório existe o arquivo "Insomnia_Requests_FoodExplorer.json" que ao ser importado pelo [Insomnia](https://insomnia.rest/download), todas as requisições usadas na aplicação são transferidas para uma coleção no Insomnia, onde ficarão disponíveis para seu uso.
