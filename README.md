# DishDeck API

**Restaurant menu and catalog API · Node.js / TypeScript / Express / MongoDB**

DishDeck is a historical backend learning project for managing restaurant product categories and products. It includes a MongoDB data model, request validation, and a JWT-based login flow. The project is maintained here as an **educational code sample**, not a production deployment.

## What you can inspect

| Area | Implementation |
| --- | --- |
| Authentication | Registration and login endpoints, bcrypt password hashing, JWT verification middleware |
| Categories | List, fetch by ID, create, update, and delete |
| Products | List, fetch by ID, create, update, and delete |
| Data layer | Mongoose models backed by MongoDB |
| HTTP | Express routes and validation using `express-validator` |

Source entry point: [`src/index.ts`](src/index.ts). The implementation is organized under [`src/authentication`](src/authentication), [`src/category`](src/category), [`src/product`](src/product), and [`src/config`](src/config).

## Run locally

Requirements: Node.js, npm, and a locally running or reachable MongoDB instance.

```bash
npm install
cp .env.example .env
npm start
```

On Windows, copy `.env.example` to `.env` manually. Set `MONGODB_URI`, `DB_NAME`, and a unique `JWT_SECRET` in your local environment. The server defaults to port `3000`.

### Routes in source

- `POST /api/auth/register` — create an account.
- `POST /api/auth/login` — authenticate and receive a token.
- `GET /api/categories`, `GET /api/categories/:id` — read categories.
- `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id` — modify categories.
- `GET /api/products`, `GET /api/products/:id` — read products.
- `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id` — modify products.

Where required, the API expects a bearer token in the `Authorization` header. See the route modules to verify the exact middleware currently applied.

## Security and maintenance notes

This is **not production-ready**. In particular, the registration handler currently accepts a `role` field from the request body, which should not be trusted for real permission assignment. Before deployment, review authorization across all routes, input validation, token/session lifecycle, error handling, secrets, dependency versions, integration tests, and database configuration. The source has not been revalidated against current production security standards in this documentation update.

Use `.env.example` as a template only; never commit real credentials. The local `.env` is ignored by Git.

## Portfolio

See [Freelance Solutions Portfolio](https://github.com/WellingtonMax/freelance-solutions-portfolio) for newer, explicitly scoped demonstrations and their verification instructions.
