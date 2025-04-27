# GraphQL Server

This is a GraphQL API server built with Apollo Server, Express, and TypeScript. It provides a robust backend for querying nodes and related data (e.g., actions, triggers, responses) with support for custom scalar types (`JSON`, `Long`), authentication via Bearer tokens, and CORS for cross-origin requests. The server reads data from JSON files and exposes a GraphQL endpoint for querying.

## Features

- **GraphQL API**: Powered by Apollo Server with a schema defined in `schema.graphql`.
- **Custom Scalars**: Supports `JSON` and `Long` scalars using `graphql-scalars`.
- **Authentication**: Requires a Bearer token (`AUTH_TOKEN`) for protected queries.
- **CORS**: Configured to allow requests from Apollo Studio (`https://studio-ui-deployments.apollographql.com`) and local development (`http://localhost:4000`).
- **TypeScript**: Strongly typed with TypeScript for better developer experience.
- **Logging**: Uses `winston` for logging server events and errors.
- **Environment Variables**: Configured with `dotenv` for managing `AUTH_TOKEN`, `PORT`, and `NODE_ENV`.
- **Data**: Reads from JSON files (`actions.json`, `nodeObjects.json`, `responses.json`, `triggers.json`, `resourceTemplates.json`).

## Prerequisites

- **Node.js**: Version 18.20.8 or higher.
- **npm**: For package management.
- **ngrok**: Optional, for exposing the local server to the internet (e.g., for Apollo Studio testing).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rahmansadaf46/graphql-server.git
   cd graphql-server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the project root with the following:
   ```env
   AUTH_TOKEN=my-secure-token-123456
   NODE_ENV=development
   PORT=4000
   ```
   - `AUTH_TOKEN`: Secret token for Bearer authentication.
   - `NODE_ENV`: Set to `development` to enable GraphQL Playground and introspection.
   - `PORT`: Port for the server (default: 4000).

4. **Verify Data Files**:
   Ensure the following JSON files exist in `src/data/`:
   - `actions.json`
   - `nodeObjects.json`
   - `responses.json`
   - `triggers.json`
   - `resourceTemplates.json`
   Ensure `src/schema/schema.graphql` exists with the GraphQL schema.

## Usage

### Build the Project

Compile TypeScript and copy data files to the `dist/` directory:
```bash
npm run build
```
This runs `tsc` and copies `src/data/*.json` and `src/schema/*.graphql` to `dist/`.

### Start the Server

Run the compiled server:
```bash
npm start
```

**Output**:
```
{"level":"info","message":"🚀 Server ready at http://localhost:4000/graphql","timestamp":"..."}
{"level":"info","message":"Bearer Token: my-secure-token-123456","timestamp":"..."}
```

### Development Mode

Run the server with `ts-node` for live reloading:
```bash
npm run dev
```

### Query the API

- **GraphQL Playground**: In development mode (`NODE_ENV=development`), access the playground at `http://localhost:4000/graphql`.

- **Example Query**:
  ```graphql
  query {
    node(nodeId: "6297172e70a0c165b989cd10") {
      _id
      name
      responses {
        _id
        name
      }
    }
  }
  ```

- **Headers**:
  ```json
  {
    "Authorization": "Bearer my-secure-token-123456"
  }
  ```

- **Expected Response**:
  ```json
  {
    "data": {
      "node": {
        "_id": "6297172e70a0c165b989cd10",
        "name": "User's Email",
        "responses": [
          {
            "_id": "6297189510f525833b1a9305",
            "name": "Get Email Response"
          }
        ]
      }
    }
  }
  ```

- **Using curl**:
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer my-secure-token-123456" \
    --data '{"query": "query { node(nodeId: \"6297172e70a0c165b989cd10\") { _id name responses { _id name } } }"}' \
    http://localhost:4000/graphql
  ```

## Project Structure

```
├── src/
│   ├── data/
│   │   ├── actions.json
│   │   ├── nodeObjects.json
│   │   ├── responses.json
│   │   ├── triggers.json
│   │   ├── resourceTemplates.json
│   ├── resolvers/
│   │   ├── query.ts
│   │   ├── action.ts
│   │   ├── trigger.ts
│   │   ├── nodeObject.ts
│   ├── schema/
│   │   ├── schema.graphql
│   ├── utils/
│   │   ├── auth.ts
│   │   ├── logger.ts
│   │   ├── errors.ts
│   ├── index.ts
├── dist/
├── .env
├── package.json
├── tsconfig.json
├── README.md
```

## Scripts

- `npm start`: Run the compiled server.
- `npm run build`: Compile TypeScript and copy data files.
- `npm run dev`: Run the server with `ts-node` for development.
- `npm test`: Run tests with Jest (if configured).

## Dependencies

- `apollo-server-express`: GraphQL server with Express integration.
- `express`: Web framework.
- `graphql`: GraphQL implementation.
- `graphql-scalars`: Custom scalar types (`JSON`, `Long`).
- `winston`: Logging library.
- `dotenv`: Environment variable management.
- `cors`: CORS middleware.

**Dev Dependencies**:
- `typescript`
- `ts-node`
- `jest`
- `ts-jest`
- `@types/*`
- `cpx`

## Notes

- **Authentication**: Ensure `AUTH_TOKEN` is set in `.env` and matches the `Authorization` header.
- **CORS**: Configured for Apollo Studio and local development. Update `origin` in `index.ts` for production.

## Troubleshooting

- **Server Fails to Start**:
  - Check `npm start` logs for errors.
  - Verify `.env` and data files exist.
  - Rebuild:
    ```bash
    rm -rf dist/ && npm run build
    ```

- **Authentication Errors**:
  - Ensure `Authorization: Bearer my-secure-token-123456` matches `AUTH_TOKEN` in `.env`.
  - Check `src/utils/auth.ts` for correct logic.

## Contributing

Contributions are welcome! Please:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/xyz`).
3. Commit changes (`git commit -m "Add xyz feature"`).
4. Push to the branch (`git push origin feature/xyz`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For issues or questions, open an issue on GitHub or contact the repository owner ([rahmansadaf46](https://github.com/rahmansadaf46)).
