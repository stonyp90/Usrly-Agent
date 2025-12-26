<div align="center">

# Ursly Agent

### AI Agent Orchestration Platform

**Build, deploy, and manage AI agents with enterprise-grade architecture.**

✅ **Enterprise-Ready**: Production-tested with comprehensive security, monitoring, and scalability features.

[![CI](https://github.com/stonyp90/Usrly-Agent/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/stonyp90/Usrly-Agent/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square)](https://github.com/stonyp90/Usrly-Agent/actions)
[![License](https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Keycloak](https://img.shields.io/badge/Keycloak-23.0-blue?style=flat-square)](https://www.keycloak.org/)

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing) • [License](#license)

</div>

---

## Overview

**Ursly Agent** is a production-ready AI agent orchestration platform built with clean architecture principles. It enables organizations to build, deploy, and manage AI agents at scale with enterprise-grade security, real-time communication, and comprehensive monitoring.

### Key Highlights

- 🏗️ **Clean Architecture**: Domain-Driven Design with Ports & Adapters pattern
- 🔐 **Enterprise Security**: Keycloak OIDC integration with entitlement-based authorization
- ⚡ **High Performance**: gRPC for agent communication, WebSockets for real-time updates
- 🎯 **Multi-Model Support**: Integration with Ollama and other LLM providers
- 📊 **Comprehensive Monitoring**: Real-time metrics, audit logging, and task tracking
- 🖥️ **Cross-Platform**: Web UI, Desktop app (Tauri), and API-first design
- 🔄 **Event-Driven**: Domain events for decoupled, scalable architecture

---

## Features

### Core Capabilities

- **Agent Management**: Create, configure, and manage AI agents with custom prompts and models
- **Task Orchestration**: Execute complex multi-step tasks with dependency management
- **Real-Time Communication**: WebSocket-based updates for agent status, task progress, and events
- **Model Integration**: Support for Ollama, OpenAI-compatible APIs, and custom model providers
- **Context Management**: Automatic context window management with rotation and summarization
- **Audit & Compliance**: Comprehensive audit logging for all agent actions and system events

### Security & Access Control

- **OIDC Authentication**: Keycloak integration with JWT tokens
- **Entitlement-Based Authorization**: Fine-grained permissions (RBAC, ABAC, ReBAC)
- **System Groups**: Admin, Developer, Operator, and Viewer roles
- **Organization Scoping**: Multi-tenant support with organization-level isolation

### Developer Experience

- **TypeScript First**: Full type safety across the stack
- **Nx Monorepo**: Efficient builds with affected detection
- **Comprehensive Testing**: Unit, integration, and E2E tests
- **API Documentation**: OpenAPI/Swagger documentation
- **Hot Reload**: Fast development with watch mode

---

## Prerequisites

- **Node.js**: 24.x or later
- **npm**: 10.x or later
- **MongoDB**: 7.0 or later
- **Docker & Docker Compose**: For running services locally
- **Ollama**: (Optional) For local LLM inference

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/stonyp90/Usrly-Agent.git
cd Usrly-Agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit `.env` with your configuration (see [Configuration](#configuration) below).

### 4. Start Services with Docker Compose

```bash
# Start all services (Keycloak, MongoDB, Ollama, API, Web)
npm run docker:up

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

### 5. Start Development Servers

```bash
# Start all services (API, gRPC, Web)
npm run dev:all

# Or start individually:
npm run start:api    # API server (http://localhost:3000)
npm run start:grpc   # gRPC service (localhost:50051)
npm run start:web    # Web UI (http://localhost:4200)
npm run start:agent  # Desktop app (Tauri)
```

### 6. Access the Application

- **Web UI**: http://localhost:4200
- **API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/docs
- **Keycloak**: http://localhost:8080 (admin/admin)

**⚠️ Security Note**: Default Keycloak credentials are for development only. Change them in production!

---

## Configuration

### Environment Variables

Key configuration options (see `env.example` for full list):

```bash
# Keycloak
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=agent-orchestrator
KEYCLOAK_CLIENT_ID=agent-api

# MongoDB
MONGODB_URI=mongodb://admin:password@localhost:27017/agent-orchestrator?authSource=admin

# Ollama
OLLAMA_URL=http://localhost:11434

# API
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200,http://localhost:1420

# Security
AGENT_TOKEN_SECRET=your-secret-key-minimum-32-characters-long
AGENT_TOKEN_EXPIRY=300
```

### Keycloak Setup

The platform uses Keycloak for authentication. Default credentials:

- **Admin Username**: `admin`
- **Admin Password**: `admin`
- **Realm**: `agent-orchestrator`

**⚠️ Important**: Change default credentials in production!

### MongoDB Setup

MongoDB is used for persistent storage. Default connection:

- **Host**: `localhost:27017`
- **Database**: `agent-orchestrator`
- **Auth**: Enabled (configure in `.env`)

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Ursly Agent Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web UI     │  │  Desktop App │  │   REST API   │      │
│  │   (React)    │  │   (Tauri)    │  │   (NestJS)   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                  │
│                    ┌───────▼────────┐                         │
│                    │  Domain Layer  │                         │
│                    │  (Clean Arch)  │                         │
│                    └───────┬────────┘                         │
│                            │                                  │
│  ┌──────────────┐  ┌───────▼────────┐  ┌──────────────┐      │
│  │   MongoDB    │  │  gRPC Service  │  │   Keycloak   │      │
│  │  (Storage)   │  │  (Ollama)      │  │   (Auth)     │      │
│  └──────────────┘  └────────────────┘  └──────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
ursly-agent/
├── apps/
│   ├── api/              # NestJS REST API
│   ├── grpc/             # gRPC service for Ollama
│   ├── web/              # React web application
│   └── agent-desktop/    # Tauri desktop app
├── libs/
│   ├── agent-core/       # Core agent logic
│   ├── audit-logger/     # Audit logging
│   └── shared/          # Shared types & utilities
├── keycloak/            # Keycloak realm & themes
├── docker-compose.yml   # Docker services
└── agents.md            # Detailed documentation
```

### Domain Architecture

The platform follows Domain-Driven Design with bounded contexts:

- **Agent Domain**: Agent lifecycle, configuration, execution
- **Task Domain**: Task creation, scheduling, execution
- **Model Domain**: LLM model management and integration
- **Audit Domain**: Event logging and compliance
- **Entitlement Domain**: Authorization and permissions

---

## Development

### Available Scripts

```bash
# Development
npm run dev:all          # Start all services
npm run start:api        # Start API server
npm run start:web        # Start web UI
npm run start:grpc       # Start gRPC service
npm run start:agent      # Start desktop app

# Testing
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run e2e              # E2E tests

# Code Quality
npm run lint             # Lint all projects
npm run lint:fix         # Fix linting issues

# Building
npm run build            # Build all projects
npm run build:api        # Build API
npm run build:web        # Build web UI
npm run build:agent      # Build desktop app

# Docker
npm run docker:up        # Start Docker services
npm run docker:down      # Stop Docker services
npm run docker:logs      # View logs
npm run docker:build    # Build Docker images
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests for specific project
nx test api
nx test web

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run e2e
```

### Code Style

The project uses:

- **ESLint**: For code linting
- **Prettier**: For code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files

---

## Production Deployment

### Docker Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Environment Configuration

For production, ensure:

1. **Strong Secrets**: Use secure, randomly generated secrets
2. **HTTPS**: Configure SSL/TLS certificates
3. **Database**: Use managed MongoDB or secure self-hosted instance
4. **Keycloak**: Configure production realm with proper security settings
5. **CORS**: Restrict CORS origins to production domains
6. **Monitoring**: Set up logging and monitoring (e.g., Prometheus, Grafana)

### Health Checks

- **API Health**: `GET /health`
- **gRPC Health**: gRPC health check service
- **Keycloak**: `GET http://keycloak:8080/health`

---

## API Documentation

### REST API

The REST API is documented using OpenAPI/Swagger:

- **Development**: http://localhost:3000/api/docs
- **Production**: `https://api.ursly.io/api/docs`

### Authentication

All API requests require authentication via JWT tokens:

```bash
# Get token from Keycloak
curl -X POST http://localhost:8080/realms/agent-orchestrator/protocol/openid-connect/token \
  -d "client_id=agent-api" \
  -d "username=user@example.com" \
  -d "password=password" \
  -d "grant_type=password"

# Use token in requests
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/agents
```

### Example API Calls

```bash
# List agents
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/agents

# Create agent
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Agent","model":"llama3","prompt":"You are a helpful assistant"}' \
  http://localhost:3000/api/agents

# Execute agent
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}' \
  http://localhost:3000/api/agents/{id}/execute
```

---

## Troubleshooting

### Common Issues

#### Services Won't Start

```bash
# Check Docker services
docker-compose ps

# View logs
docker-compose logs [service-name]

# Restart services
docker-compose restart
```

#### MongoDB Connection Issues

- Verify MongoDB is running: `docker-compose ps keycloak-db`
- Check connection string in `.env`
- Ensure authentication credentials are correct

#### Keycloak Authentication Fails

- Verify Keycloak is accessible: `curl http://localhost:8080/health`
- Check realm configuration in `keycloak/realms/`
- Verify client IDs match in `.env`

#### Port Conflicts

If ports are already in use:

- **3000**: Change `PORT` in `.env`
- **4200**: Change Vite port in `apps/web/vite.config.ts`
- **8080**: Change Keycloak port in `docker-compose.yml`

### Getting Help

- **Documentation**: See [agents.md](./agents.md) for detailed docs
- **Issues**: [GitHub Issues](https://github.com/stonyp90/Usrly-Agent/issues)
- **Discussions**: [GitHub Discussions](https://github.com/stonyp90/Usrly-Agent/discussions)

---

## Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with tests
4. **Run tests**: `npm test && npm run lint`
5. **Commit**: `git commit -m 'feat: add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use conventional commits
- Ensure all tests pass before submitting

---

## Projects

| Project              | Description                | Port  |
| -------------------- | -------------------------- | ----- |
| `apps/web`           | React web application      | 4200  |
| `apps/api`           | NestJS REST API            | 3000  |
| `apps/grpc`          | gRPC service for Ollama    | 50051 |
| `apps/agent-desktop` | Tauri desktop application  | -     |
| `libs/agent-core`    | Core agent logic library   | -     |
| `libs/audit-logger`  | Audit logging library      | -     |
| `libs/shared`        | Shared types and utilities | -     |

---

## Documentation

- **[Architecture Documentation](./agents.md)**: Comprehensive architecture and development guide
- **[API Documentation](http://localhost:3000/api/docs)**: OpenAPI/Swagger docs
- **[Keycloak Setup](./keycloak/realms/README.md)**: Keycloak realm configuration

---

## License

This project is licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0).

See [LICENSE](./LICENSE) for details.

### License Summary

- ✅ **Commercial Use**: Allowed
- ✅ **Modification**: Allowed
- ✅ **Distribution**: Allowed
- ✅ **Patent Use**: Allowed
- ✅ **Private Use**: Allowed
- ❌ **Sublicensing**: Not allowed
- ❌ **Liability**: No warranty provided

**Note**: AGPL-3.0 requires that if you modify and run this software on a server, you must make the source code available to users who interact with it over a network.

---

## Support

- **Website**: [ursly.io](https://ursly.io)
- **GitHub**: [github.com/stonyp90/Usrly-Agent](https://github.com/stonyp90/Usrly-Agent)
- **Issues**: [Report a bug](https://github.com/stonyp90/Usrly-Agent/issues/new)
- **Discussions**: [GitHub Discussions](https://github.com/stonyp90/Usrly-Agent/discussions)

---

## Acknowledgments

Inspired by and built with:

- [Botpress](https://github.com/botpress/botpress) - Open-source hub for GPT/LLM Agents
- [LangChain](https://github.com/langchain-ai/langchain) - Framework for LLM applications
- [CrewAI](https://github.com/joaomdmoura/crewAI) - Framework for orchestrating AI agents
- [Dify](https://github.com/langgenius/dify) - LLM app development platform
- [Flowise](https://github.com/FlowiseAI/Flowise) - Drag & drop UI for LLM flows

---

<div align="center">

**Built with ❤️ by [Anthony Paquet](https://www.linkedin.com/in/anthony-paquet-94a31085/)**

[⭐ Star us on GitHub](https://github.com/stonyp90/Usrly-Agent) • [📖 Read the Docs](./agents.md) • [🐛 Report Issues](https://github.com/stonyp90/Usrly-Agent/issues)

</div>
