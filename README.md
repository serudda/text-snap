<!--
* Contributors: @Zyruks, @Contributor2
* Last updated on: August 16, 2024
* Last updated by: @Zyruks
-->

![x](https://github.com/user-attachments/assets/9245fdb7-ef92-4807-9aa2-5bcda727d4d9)

![Build Status](https://github.com/serudda/text-snap/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
# Text Snap Monorepo Overview 🗂️

Welcome to **Text Snap**! This repository houses multiple services and applications that collectively form the core of our platform. Below is an overview of each application, along with instructions on how to get started.

## Table of Contents 📑

- [Prerequisites 🛠️](#prerequisites-🛠️)
- [Installation 🚀](#installation-🚀)
- [Environment Variables 🔑](#environment-variables-🔑)
- [General Setup ⚙️](#general-setup-⚙️)
- [Project Structure 📂](#project-structure-📂)
- [Utilities 🔧](#utilities-🔧)
- [License 📜](#license-📜)

---

## Prerequisites 🛠️

Before using this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.13.1)
- [pnpm](https://pnpm.io/) (version 9.9.0)

## Installation 🚀

To set up the project, clone the repository and install the dependencies:

```sh
git clone https://github.com/serudda/text-snap.git
cd text-snap
```

## Environment Variables 🔑

To run the project, you'll need to configure environment variables.

You need to add everything to `.env.local`, but only configure `OPENAI_API_KEY`.

Here's a sample configuration:

```sh
DATABASE_URL=http://localhost:3000

NEXTAUTH_SECRET=supersecret
NEXTAUTH_URL=http://localhost:3000

LEMON_SQUEEZY_URL=http://localhost:3000
LEMON_SQUEEZY_API_KEY=http://localhost:3000

TWITTER_CONSUMER_KEY=http://localhost:3000
TWITTER_CONSUMER_SECRET=http://localhost:3000

OPENAI_API_KEY=<YOUR-OPEN-AI-KEY>

NEXT_PUBLIC_POSTHOG_KEY=http://localhost:3000
NEXT_PUBLIC_POSTHOG_HOST=http://localhost:3000
```

## General Setup ⚙️

From the root of the project, you can run the following commands:

1. **Install dependencies**:

```sh
pnpm install
```

2. **Run DB Generate**:

```sh
pnpm db:generate
```

3. **Run build**:

```sh
pnpm build
```

4. **Run Development**:

```sh
pnpm dev
```

### Ports

- **Web Page**: [http://localhost:3000](http://localhost:3000)
- **Prisma Page**: [http://localhost:5556](http://localhost:5556)

## Project Structure 📂

### Apps

- **`apps/nextjs`**:Main App built with Nextjs.
- **`apps/payments`**: Manages payment processing

### Packages

- **`packages/ai`**: Contains OpenAI-related functionality. This package includes utilities for handling AI operations such as text formatting, language detection, grammar correction, and content improvement.

- **`packages/api`**: The API package, managing TRPC configuration and controllers for the backend.

- **`packages/auth`**: Manages authentication using NextAuth.

- **`packages/config`**: Contains configuration files and shared settings for the project.

- **`packages/db`**: Prisma-based database management package.

---

## Utilities 🔧

- **ESLint**: Linting tool to maintain code quality.
- **Prettier**: Code formatter for consistent code style.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
