# Student Event App
The purpose of this application is to allow students to find local events in their area. These can be published by Universities, student organizations or other venues.

## Projects

### API
Built on top of Hono

#### Technologies
- [oRPC](https://orpc.unnoq.com/)
- [Prisma](https://www.prisma.io/)
- [BetterAuth](https://www.better-auth.com/)
- [Scalar](https://scalar.com/)

### Mobile
Build in React Native for convenience (sharing types between backend and mobile).

#### Technologies
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)

## Developer setup

### Prerequisites
- Installed [NodeJS](https://nodejs.org/en) and [PNPM](https://pnpm.io/) on your system
- Set up [Expo development environment](https://docs.expo.dev/get-started/set-up-your-environment/) for android

### Setup script
Run this in the root folder of the project.
```bash
# Install dependencies
pnpm install

# Set up env files
cd apps/api && cp .env.example .env

# Generate prisma types
cd apps/api && pnpx prisma generate && pnpx prisma migrate dev
```

### Running the projects
This project uses [Turborepo](https://turborepo.com/) for faster and easier development and building.

```bash
# Run this in root to start API and mobile projects in pararell
turbo dev
```