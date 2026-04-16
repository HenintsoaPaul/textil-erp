# Textil ERP

Textil ERP is a modern Enterprise Resource Planning system specifically tailored for textile businesses. 

Built with Angular, it provides a robust, responsive, and intuitive interface for daily business operations.

## Features & Modules

- **Home/Dashboard**: Provides a central overview of metrics and quick actions.
- **Product Management**: Create, edit, and keep track of your product catalog.
- **Inventory & Stock Management**: Monitor, update, and review the lifecycle of stock through comprehensive historical auditing.
- **Quotation System**: Easily generate, review, and manage professional quotations for your clients.

## Architecture

The project is structured into modular feature sets (`src/app/features/*`):
- [Home](./src/app/features/home/README.md)
- [Product](./src/app/features/product/README.md)
- [Inventory](./src/app/features/inventory/README.md)
- [Quotation](./src/app/features/quotation/README.md)

## Technology Stack

- **Framework**: Angular
- **Styling**: Tailwind CSS
- **Testing**: Jasmine & Karma

## Getting Started

### Development server

To start a local development server, run:

```bash
npm run dev
# or
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4201/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics, run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

### Running tests

- **Unit tests**: Run `ng test` to execute unit tests with Karma.
- **End-to-End tests**: Run `ng e2e` to execute end-to-end tests.
