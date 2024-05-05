
# Food Explorer 🚀 Backend

Este projeto é o desafio final da trilha Explorer/Fullstack da Rocketseat. A proposta é criar uma aplicação fullstack que simule o cardápio de um restaurante. 

Este é o repositório do backend da aplicação, para acessar o repositório do frontend [clique aqui](https://github.com/Leoz2s/food-explorer-frontend). Layout:
[Figma do projeto](https://www.figma.com/community/file/1196874589259687769/food-explorer-v2).

## Features
- Criar um cadastro na aplicação; (Cadastro de usuário no banco de dados)
- Fazer login; (Autenticação na aplicação)
- Visualizar pratos. 
- Busca de pratos pelo nome e por ingredietes.

Exclusivo para Admin:
- Criar pratos; Editar pratos; Excluir pratos.



## Tech Stack & Dependências
- JavaScript - Node.js
Dependências:
- express - express-async-errors - cors - jsonwebtoken - bcryptjs - dotenv - cookie-parser - knex - sqlite - sqlite3 - multer - pm2


### Estrutura do banco de dados

![Database Screenshot](https://i.imgur.com/dvp8Jlh.png)


## Link do Deploy

Caso queira acessar a aplicação diretamente pelo deploy: (https://api-foodexplorer-6hcw.onrender.com).


## Instalação

Você precisa ter o Node.js instalado para rodar esta aplicação: https://nodejs.org/en

Tendo o Node.js instalado, faça download do projeto ou faça Git Clone. Acessando a pasta do projeto por meio de um terminal executa o seguinte comando:

```bash
  cd diretorio-do-projeto
  npm install
```
Isso fará com que todas as dependências da aplicação sejam instaladas.
    
## Rodar projeto localmente

Para iniciar nosso backend localmente, insira o comando abaixo:

```bash
  npm run dev
```
Com o backend rodando podemos começar a acessar seus recursos.


## Variáveis de ambiente

O projeto tem duas variáveis de ambiente, localizadas no arquivo .env, a variável AUTH_SECRET é usada para armazenar o segredo do nosso token, enquanto PORT é usado para definir a porta em que o projeto deve rodar.

`AUTH_SECRET`

`PORT`

