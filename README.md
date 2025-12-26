<div align="center">

<img src="apps/web/public/logo.svg" alt="Ursly Agent Logo" width="80" height="80" style="max-width: 100%; height: auto;" />

# Ursly Agent

### AI Agent Orchestration Platform

**Build, deploy, and manage AI agents with enterprise-grade architecture.**

✅ **Production-Ready**: Comprehensive security, monitoring, and scalability features.

<br />

[![CI](https://github.com/stonyp90/Usrly-Agent/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/stonyp90/Usrly-Agent/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square)](LICENSE)

[![macOS](https://img.shields.io/badge/platform-macOS-lightgrey?style=flat-square&logo=apple)](https://github.com/stonyp90/Usrly-Agent/actions)
[![Windows](https://img.shields.io/badge/platform-Windows-blue?style=flat-square&logo=windows)](https://github.com/stonyp90/Usrly-Agent/actions)
[![Linux](https://img.shields.io/badge/platform-Linux-orange?style=flat-square&logo=linux)](https://github.com/stonyp90/Usrly-Agent/actions)

<br />

[Features](#-features) · [Quick Start](#-quick-start) · [Contributing](#-contributing) · [License](#-license)

</div>

---

## 🎯 What Is Ursly Agent?

**Ursly Agent** is a platform for building, deploying, and managing AI agents at scale. Whether you're creating chatbots, automation workflows, or intelligent assistants, Ursly Agent provides the infrastructure you need.

### Key Benefits

- 🤖 **Easy Agent Creation**: Build AI agents with custom prompts and models
- ⚡ **High Performance**: Real-time communication with WebSockets
- 🔐 **Enterprise Security**: Built-in authentication and authorization
- 📊 **Full Visibility**: Monitor agents, tasks, and system health
- 🔄 **Multi-Model Support**: Works with Ollama, OpenAI, and more
- 🖥️ **Multiple Interfaces**: Web UI, Desktop app, and API

---

## ✨ Features

### 🤖 Agent Management

Create and configure AI agents with custom prompts, models, and capabilities. Start, stop, and monitor agents in real-time.

### 📋 Task Orchestration

Execute complex workflows with multi-step tasks, scheduling, and dependency management. Track progress in real-time.

### 🔄 Real-Time Updates

Get live updates for agent status, task progress, and system events via WebSockets.

### 🔍 Model Integration

- **Ollama**: Native support for local LLM inference
- **OpenAI-Compatible**: Works with OpenAI-compatible APIs
- **Custom Providers**: Extensible architecture for your own models

### 🔐 Security & Access Control

- **Authentication**: Keycloak OIDC integration
- **Authorization**: Fine-grained permissions and roles
- **Audit Logging**: Comprehensive logging for compliance
- **Multi-Tenant**: Organization-level isolation

### 📊 Monitoring & Observability

- Real-time metrics and dashboards
- Comprehensive audit logs
- Health checks and status monitoring
- Task tracking and history

---

## 🚦 Quick Start

### For Users

1. **Start Services**: Run `npm run docker:up` to start all services
2. **Access Web UI**: Open http://localhost:4200
3. **Login**: Use Keycloak credentials (default: admin/admin)
4. **Create Agent**: Build your first AI agent
5. **Execute Tasks**: Run tasks and monitor progress

### For Developers

<details>
<summary><b>Click to expand technical setup</b></summary>

#### Prerequisites

- **Node.js**: 24.x or later
- **MongoDB**: 7.0 or later
- **Docker & Docker Compose**: For running services locally
- **Ollama**: (Optional) For local LLM inference

#### Installation

```bash
# Clone the repository
git clone https://github.com/stonyp90/Usrly-Agent.git
cd Usrly-Agent

# Install dependencies
npm install

# Configure environment
cp env.example .env
# Edit .env with your configuration

# Start Docker services
npm run docker:up

# Start development servers
npm run dev:all
```

#### Access Points

- **Web UI**: http://localhost:4200
- **API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/docs
- **Keycloak**: http://localhost:8080 (admin/admin)

#### Development Scripts

```bash
# Development
npm run dev:all          # Start all services
npm run start:api        # Start API server
npm run start:web        # Start web UI

# Testing
npm test                 # Run all tests
npm run e2e              # E2E tests

# Building
npm run build            # Build all projects
```

#### Tech Stack

- **Backend**: NestJS + TypeScript
- **Frontend**: React + TypeScript
- **Database**: MongoDB
- **Auth**: Keycloak
- **Communication**: gRPC + WebSockets
- **Build**: Nx Monorepo

</details>

---

## 🏗️ Architecture

Ursly Agent follows **Clean Architecture** principles with Domain-Driven Design:

- **Domain Layer**: Core business logic (independent of frameworks)
- **Application Layer**: Use cases and business workflows
- **Infrastructure Layer**: Database, external services, adapters
- **Presentation Layer**: Web UI, Desktop app, REST API

This architecture ensures:

- ✅ Testability: All layers testable in isolation
- ✅ Maintainability: Clear separation of concerns
- ✅ Scalability: Easy to extend and modify
- ✅ Security: Enterprise-grade security built-in

---

## 🧪 Testing

The platform includes comprehensive testing:

- **Unit Tests**: Domain logic and use cases
- **Integration Tests**: API endpoints and services
- **E2E Tests**: Full system tests with Testcontainers
- **Code Quality**: ESLint, Prettier, Husky hooks

Run tests with:

```bash
npm test        # Unit tests
npm run e2e      # E2E tests
```

---

## 🚀 Production Deployment

### Docker Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

### Production Checklist

- ✅ Use strong, randomly generated secrets
- ✅ Configure HTTPS/SSL certificates
- ✅ Use managed MongoDB or secure self-hosted instance
- ✅ Configure production Keycloak realm
- ✅ Restrict CORS origins to production domains
- ✅ Set up monitoring and logging

---

## 📡 API Documentation

The REST API is fully documented with OpenAPI/Swagger:

- **Development**: http://localhost:3000/api/docs
- **Production**: `https://api.ursly.io/api/docs`

### Authentication

All API requests require JWT tokens from Keycloak:

```bash
# Get token
curl -X POST http://localhost:8080/realms/agent-orchestrator/protocol/openid-connect/token \
  -d "client_id=agent-api" \
  -d "username=user@example.com" \
  -d "password=password" \
  -d "grant_type=password"

# Use token
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/agents
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with tests
4. **Run tests**: `npm test && npm run lint`
5. **Commit**: `git commit -m 'feat: add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation as needed
- Use conventional commits
- Ensure all tests pass

---

## 🔒 Security

We take security seriously. Please review our [Security Policy](./SECURITY.md) before reporting vulnerabilities.

**⚠️ Important**: Do not report security vulnerabilities through public GitHub issues. Use:

- **Email**: [security@ursly.io](mailto:security@ursly.io)
- **GitHub Security Advisory**: [Report via Security tab](https://github.com/stonyp90/Usrly-Agent/security/advisories/new)

---

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0).

See [LICENSE](./LICENSE) for details.

**Note**: AGPL-3.0 requires that if you modify and run this software on a server, you must make the source code available to users who interact with it over a network.

---

## 🆘 Support

- **Website**: [ursly.io](https://ursly.io)
- **GitHub**: [github.com/stonyp90/Usrly-Agent](https://github.com/stonyp90/Usrly-Agent)
- **Issues**: [Report a bug](https://github.com/stonyp90/Usrly-Agent/issues/new)
- **Discussions**: [GitHub Discussions](https://github.com/stonyp90/Usrly-Agent/discussions)

---

<div align="center">

**Built with ❤️ by [Anthony Paquet](https://www.linkedin.com/in/anthony-paquet-94a31085/)**

[⭐ Star us on GitHub](https://github.com/stonyp90/Usrly-Agent) · [🐛 Report Issues](https://github.com/stonyp90/Usrly-Agent/issues)

</div>
