# Project: niux-parcelas

## Project Overview

This is a full-stack web application for managing "parcelas" (plots of land). It is built with a modern tech stack, including:

*   **Frontend:** Next.js 15 (with Turbopack) and React 19, written in TypeScript.
*   **Styling:** Tailwind CSS with `shadcn/ui` components.
*   **Backend:** The Next.js backend handles most of the logic, with a separate Express.js server (`redis-server`) that seems to be a simple placeholder or for a specific microservice.
*   **Database:** PostgreSQL with Prisma as the ORM for database management and migrations.
*   **Authentication:** NextAuth.js is used for handling user authentication and authorization, with role-based access control.
*   **Deployment:** The application is fully containerized with Docker and has Kubernetes deployment configurations.
*   **Caching:** Redis is used, likely for session storage or caching data.

The application features a dashboard for visualizing data related to the plots, including charts and an interactive map using Leaflet. It has a clear separation of concerns with dedicated directories for API routes, components, authentication logic, and database models.

## Building and Running

### Development

To run the application in development mode:

```bash
npm run dev
```

This will start the Next.js development server with Turbopack on [http://localhost:3000](http://localhost:3000).

### Production

To build and run the application in production mode:

1.  **Build the application:**
    ```bash
    npm run build
    ```

2.  **Start the production server:**
    ```bash
    npm run start
    ```

### Docker

The project includes a `docker-compose.yml` file to run the entire stack (Next.js app, Express server, and Redis) in containers.

```bash
docker-compose up --build
```

### Kubernetes

The `k8s` directory contains YAML files for deploying the application to a Kubernetes cluster. These were generated using `kompose` from the `docker-compose.yml` file.

## Development Conventions

*   **Linting:** To check for code quality and style issues, run:
    ```bash
    npm run lint
    ```

*   **Database Migrations:** Prisma is used for database migrations. To create a new migration, you would typically use `npx prisma migrate dev`. Migrations are stored in the `prisma/migrations` directory. The database schema is defined in `prisma/schema.prisma`.

*   **Authentication:** Authentication is handled by NextAuth.js. The configuration is in `src/auth.ts`, and middleware for protecting routes is in `src/middleware.ts`.

*   **API Routes:** API endpoints are defined in the `src/app/api` directory.

*   **UI Components:** Reusable UI components are located in `src/components/ui`. The project uses `shadcn/ui` which provides a set of accessible and customizable components.
