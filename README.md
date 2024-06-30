
# 🍽 Food Explorer 🚀 Backend

Este projeto é o desafio final da trilha Explorer/Fullstack da Rocketseat. A proposta é criar uma aplicação fullstack web que simule o cardápio de um restaurante fictício.

Este é o repositório do backend da aplicação, para acessar o repositório do frontend [clique aqui](https://github.com/Leoz2s/food-explorer-frontend).

![App Preview](https://i.imgur.com/SyMNTAF.png)


### Estrutura do banco de dados 📝
![Database Screenshot](https://i.imgur.com/uTQQsjt.png)

[Link do diagrama](https://drawsql.app/teams/main-team-14/diagrams/food-explorer)


## Features ✨
- Criar um cadastro na aplicação (Cadastro de usuário no banco de dados);
- Fazer login (Autenticação na aplicação);
- Visualizar pratos;
- Busca de pratos pelo nome e por ingredientes;
- Visualizar ordens de pedidos e seus status.

Exclusivo para Customers (clientes):
- Favoritar pratos e visualizar a lista de pratos favoritos;
- Fazer check-out (Visualizar a soma de produtos e os valores, podendo excluir produtos do pedido e criar uma ordem de pedido).

Exclusivo para Admins (administradores):
- Criar pratos; Editar pratos; Excluir pratos.
- Alterar o status de uma ordem de pedido.


## Tech Stack & Dependências 🛠
- JavaScript - Node.js

Dependências:
- express - express-async-errors - cors - jsonwebtoken - bcryptjs - dotenv - cookie-parser - knex - sqlite - sqlite3 - multer - pm2 - jest


## Link do Deploy ☁
Deploy da aplicação: https://api-foodexplorer-6hcw.onrender.com (Não foi feito para ser acessado por meio de navegadores web).

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

## Testes 🏹

Para rodar os testes da aplicação feitos com Jest, use no terminal (dentro da aplicação) o prompt `npm test`. Os testes serão executados e será exibido o resultado dos mesmos.

## Arquivo com requisições para o Insomnia

No repositório existe o arquivo "Insomnia_Requests_FoodExplorer.json" que ao ser importado pelo [Insomnia](https://insomnia.rest/download), todas as requisições usadas na aplicação são transferidas para uma coleção no próprio Insomnia, onde ficarão disponíveis para seu uso.
