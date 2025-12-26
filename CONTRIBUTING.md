# Contributing to Ursly Agent

Thank you for your interest in contributing to Ursly Agent! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details**: OS, version, Node.js version, MongoDB version
- **Error messages** or logs

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Clear title and description**
- **Use case**: Why is this feature useful?
- **Proposed solution** (if you have one)
- **Alternatives considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Add tests** for new functionality
4. **Update documentation** as needed
5. **Ensure all tests pass**: `npm test`
6. **Run linting**: `npm run lint`
7. **Commit your changes** using [conventional commits](https://www.conventionalcommits.org/)
8. **Push to your fork** and submit a pull request

#### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Write clear commit messages
- Reference related issues
- Update documentation if needed
- Ensure CI checks pass

## Development Setup

### Prerequisites

- **Node.js**: 24.x or later
- **npm**: 10.x or later
- **MongoDB**: 7.0 or later
- **Docker & Docker Compose**: For running services locally
- **Ollama**: (Optional) For local LLM inference

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Usrly-Agent.git
cd Usrly-Agent

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Start Docker services
npm run docker:up

# Start development servers
npm run dev:all
```

## Coding Standards

### TypeScript/NestJS

- Use TypeScript for all new code
- Follow NestJS style guide and patterns
- Use dependency injection
- Implement proper error handling
- Write self-documenting code

### React

- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Prefer named exports
- Keep components focused and reusable

### Testing

- Write tests for new features
- Aim for good test coverage
- Use descriptive test names
- Test edge cases
- Mock external dependencies

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(agents): add context window rotation

Implement automatic context window rotation when threshold
is reached. Includes summarization of old context.

Closes #123
```

```
fix(auth): resolve JWT token expiration issue

JWT tokens were expiring prematurely due to incorrect clock
skew handling. Fixed by adding proper time synchronization.

Fixes #456
```

## Project Structure

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
└── docker-compose.yml   # Docker services
```

## Questions?

- **GitHub Issues**: [Open an issue](https://github.com/stonyp90/Usrly-Agent/issues/new)
- **Discussions**: [GitHub Discussions](https://github.com/stonyp90/Usrly-Agent/discussions)

Thank you for contributing to Ursly Agent! 🎉
