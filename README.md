# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## How to deviler a new feature from entity creation to deployment ?

1. Create the entity in the database: `./src/modules/post/post.schema.ts`
2. Add the entity to the schema: `./src/server/db/schema.ts`
3. Map the entity to the Kysely Database interface: `./src/server/db/index.ts`
4. Create the service: `./src/modules/post/post.service.ts`
5. Create the api route: `./src/modules/post/post.route.ts`
6. Add the api route to the root router: `./src/server/api/root.ts`
7. Create the frontend components: `./src/modules/post/components/my-component.tsx`
8. Deploy the feature

## Why dockerization and tls on localhost ?

[“Dev/prod parity” is the 12-factor principles that concern us here](https://12factor.net/dev-prod-parity)

## Features

### Authentik

Authentik is an open-source Identity Provider that can be used to authenticate users.

#### Setup

1. Run `npm run authentik:setup` to create the initial user.
2. Use the wizards button to create a new application with a provider. Setup using the explicit authentication flow.

### Shadcn

Shadcn is a library of pre-built headlesscomponents that can be used to build the UI.

Run `npx shadcn@canary add your_component` to install the component.

## Todo

- [x] Add Authentik as an auth provider
- [x] Implement Kysely for database access
- [x] Implement paraglide for i18n
- [x] Implement cursor rules
- [ ] Implement basic todo model
- [ ] Implement react-hook-form
- [ ] Implement Shadcn form components
- [ ] Add Cypress tests
- [ ] Implement S3 service
- [ ] Implement Brevo service
- [ ] Implement features folder
- [ ] Implement ACL
- [ ] Implement merge request CI tests
- [ ] Implement Pulumi deployment
- [ ] Implement Logs (JSON and pretty)
- [ ] Implement env injection thanks to infisical cli

## Usefull links

### Core

- [folder architecture](https://www.youtube.com/watch?v=xyxrB2Aa7KE)
- [permissions](https://www.youtube.com/watch?v=5GG-VUvruzE)
- [T3 Stack](https://create.t3.gg/)
- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)

### Database

- [Drizzle](https://orm.drizzle.team/)
- [Kysely](https://kysely.dev/)

### UI

- [Shadcn](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Auth

- [Authentik](https://docs.authentik.io/)
- [NextAuth.js](https://next-auth.js.org/)

### Infrastructure

- [Docker](https://www.docker.com/)
- [Pulumi](https://www.pulumi.com/)
- [Infisical](https://infisical.com/)

### Testing

- [Cypress](https://www.cypress.io/)
- [CCTDD: Cypress Component Test Driven Design](https://muratkerem.gitbook.io/cctdd)

### Other

- [React Hook Form](https://react-hook-form.com/)

