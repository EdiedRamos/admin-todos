# Admin Todos

## Development

Development steps to run the app

- Up the data base

```
docker compose up -d
```

### Environment Variable

- Configure .env

### Set seed content

- Just run `http://localhost:3000/api/v1/seed`

## Prisma (Initial configuration)

- Init prisma settings

```
npx prisma init
```

- Make migrations

```
npx prisma migration dev
```

- Generate client

```
npx prisma generate
```

## Dev Server

- Run the development mode

```
npm run dev
```
