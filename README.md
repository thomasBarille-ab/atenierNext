# API Documentation

Notre API fournit un ensemble d'endpoints pour la gestion des films et des commentaires. Voici la liste des opérations disponibles via notre API.

## Commentaires

Opérations CRUD sur les commentaires associés à un film.

### Récupérer un commentaire par son ID

- **GET `/api/comments/{idComment}`** : Récupère les détails d'un commentaire spécifique en utilisant son ID unique.

### Ajouter un nouveau commentaire

- **POST `/api/comments/{idComment}`** : Ajoute un nouveau commentaire dans la base de données. Le corps de la requête doit contenir le contenu du commentaire et l'ID du film associé.

### Modifier un commentaire existant

- **PUT `/api/comments/{idComment}`** : Met à jour un commentaire existant en utilisant son ID unique. Le corps de la requête doit contenir les modifications à apporter.

### Supprimer un commentaire

- **DELETE `/api/comments/{idComment}`** : Supprime un commentaire spécifique en utilisant son ID unique.

### Récupérer tous les commentaires liés à un film spécifique

- **GET `/api/{idMovie}/comments`** : Récupère tous les commentaires associés à l'ID d'un film donné.

## Films

Opérations CRUD sur les films.

### Récupérer un film par son ID

- **GET `/api/movie/{idMovie}`** : Récupère les détails d'un film spécifique en utilisant son ID unique.

### Modifier un film existant

- **PUT `/api/movie/{idMovie}`** : Met à jour un film existant en utilisant son ID unique. Le corps de la requête doit contenir les modifications à apporter.

### Supprimer un film

- **DELETE `/api/movie/{idMovie}`** : Supprime un film spécifique en utilisant son ID unique.

### Récupérer tous les films

- **GET `/api/movies`** : Récupère une liste de tous les films disponibles dans la base de données.

### Ajouter un nouveau film

- **POST `/api/movies`** : Ajoute un nouveau film dans la base de données. Le corps de la requête doit contenir les données du nouveau film.

---

Pour interagir avec l'API, les clients peuvent utiliser des outils comme cURL ou Postman pour envoyer des requêtes HTTP vers les endpoints définis.


## Example app using MongoDB

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy your own

Once you have access to the environment variables you'll need, deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=with-mongodb&repository-name=with-mongodb&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-mongodb&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-mongodb with-mongodb-app
```

```bash
yarn create next-app --example with-mongodb with-mongodb-app
```

```bash
pnpm create next-app --example with-mongodb with-mongodb-app
```

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

#### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=with-mongodb&repository-name=with-mongodb&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-mongodb&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)

