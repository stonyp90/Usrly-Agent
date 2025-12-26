# Ursly Agent Platform

AI agent orchestration platform built with modern technologies.

## Overview

Ursly Agent is a clean architecture AI agent orchestration platform that enables you to build, deploy, and manage AI agents with ease.

## Architecture

- **Web UI**: React-based frontend for managing agents
- **API**: NestJS backend with REST and WebSocket support
- **gRPC Service**: High-performance gRPC service for agent communication
- **Agent Desktop**: Tauri-based desktop application
- **Shared Libraries**: Reusable core libraries for agent management

## Quick Start

```bash
# Install dependencies
npm install

# Start all services
npm run dev:all

# Or start individually
npm run start:api    # API server
npm run start:grpc   # gRPC service
npm run start:web    # Web UI
npm run start:agent  # Desktop app
```

## Development

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build all projects
npm run build
```

## Docker

```bash
# Start all services with Docker Compose
npm run docker:up

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

## Projects

- `apps/web` - React web application
- `apps/api` - NestJS API server
- `apps/grpc` - gRPC service
- `apps/agent-desktop` - Tauri desktop app
- `libs/agent-core` - Agent core library
- `libs/audit-logger` - Audit logging
- `libs/shared` - Shared types and utilities

## Documentation

See [agents.md](./agents.md) for detailed architecture and development documentation.
