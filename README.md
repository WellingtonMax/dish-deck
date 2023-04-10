# README

## API Dishdeck
API Dishdeck é uma aplicação para gerenciar produtos e categorias de produtos em um restaurante.

A API permite que os administradores do restaurante acessem o sistema, criem, atualizem e excluam categorias e produtos.

## Tecnologias Utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- JsonWebToken
- Bcrypt
- Dotenv
- Express Validator

## Instalação
1. Clone o repositório.
2. Execute `npm install` para instalar as dependências.
3. Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente.
4. Execute `npm start` para iniciar o servidor.

## Endpoints
A API Dishdeck oferece os seguintes endpoints:

### Autenticação
- POST `/api/auth/register`: cria uma nova conta de administrador.
- POST `/api/auth/login`: faz login na conta de administrador e recebe um token JWT.

### Categorias
- GET `/api/categories`: lista todas as categorias de produtos.
- GET `/api/categories/:id`: obtém uma categoria pelo ID.
- POST `/api/categories`: cria uma nova categoria.
- PUT `/api/categories/:id`: atualiza uma categoria existente.
- DELETE `/api/categories/:id`: exclui uma categoria.

### Produtos
- GET `/api/products`: lista todos os produtos.
- GET `/api/products/:id`: obtém um produto pelo ID.
- POST `/api/products`: cria um novo produto.
- PUT `/api/products/:id`: atualiza um produto existente.
- DELETE `/api/products/:id`: exclui um produto.

## Middleware
- `authMiddleware`: verifica se o usuário está autenticado e tem permissão para acessar determinado endpoint.

## Exemplo de uso
Para criar uma nova categoria, faça uma requisição POST para `http://localhost:3000/api/categories` com o seguinte corpo:

    {
    "name": "Bebidas",
    "parent": null
    }

##Você deve estar autenticado e incluir o token JWT no header Authorization.

Para criar um novo produto, faça uma requisição POST para http://localhost:3000/api/products com o seguinte corpo:

    {
    "name": "Coca-Cola",
    "qty": 1,
    "price": 5,
    "categories": ["6175b2f5d5c6ac9d3c327e39"]
    }


##Você deve estar autenticado e incluir o token JWT no header Authorization.

## 🤝 Autor:
API Dishdeck foi desenvolvida por 
---
# Back-end Dev
<table>
     <td align="center">
      <a href="https://github.com/WellingtonMax">
        <img src="https://avatars.githubusercontent.com/u/83736385?v=4" width="100px;" alt="Foto do Wellington"/><br>
        <sub>
          <b>Wellington L. Maximiniano</b>
        </sub>
      </a>
    </td>
  </tr>
</table>.
