# HireHub Onboarding Portal

A comprehensive employee onboarding portal built with Angular 17+ that streamlines the hiring and onboarding process for organizations.

## Tech Stack

- **Framework:** Angular 17+ (Standalone Components)
- **Language:** TypeScript
- **Styling:** Plain CSS
- **Storage:** localStorage / sessionStorage (no backend required)
- **Build Tool:** Angular CLI

## Features

- **Admin Dashboard** — Manage onboarding tasks, view employee progress, and configure workflows
- **Employee Portal** — New hires can complete onboarding steps, upload documents, and track progress
- **Task Management** — Create, assign, and track onboarding tasks with status updates
- **Document Management** — Upload and manage onboarding documents
- **Progress Tracking** — Visual progress indicators for each onboarding step
- **Authentication** — Role-based access control (Admin / Employee)
- **Responsive Design** — Works across desktop and mobile devices
- **Persistent State** — All data persisted via localStorage/sessionStorage

## Folder Structure

```
src/
├── app/
│   ├── components/          # Shared/reusable components
│   │   ├── header/
│   │   ├── sidebar/
│   │   ├── footer/
│   │   └── ...
│   ├── pages/               # Route-level page components
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── admin/
│   │   ├── employee/
│   │   ├── tasks/
│   │   ├── documents/
│   │   └── not-found/
│   ├── services/            # Injectable services
│   │   ├── auth.service.ts
│   │   ├── employee.service.ts
│   │   ├── task.service.ts
│   │   ├── document.service.ts
│   │   └── storage.service.ts
│   ├── guards/              # Route guards
│   │   ├── auth.guard.ts
│   │   └── admin.guard.ts
│   ├── models/              # TypeScript interfaces and types
│   │   ├── user.model.ts
│   │   ├── task.model.ts
│   │   ├── employee.model.ts
│   │   └── document.model.ts
│   ├── pipes/               # Custom pipes
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/                  # Static assets (images, icons)
├── environments/            # Environment configuration
│   ├── environment.ts
│   └── environment.prod.ts
├── styles.css               # Global styles
├── index.html
└── main.ts
```

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Angular CLI** >= 17.x

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hirehub-onboarding-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### 4. Build for Production

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### 5. Run Tests

```bash
ng test
```

## Admin Credentials

Use the following credentials to log in as an administrator:

| Field    | Value   |
|----------|---------|
| Username | `admin` |
| Password | `admin` |

## Deployment (Vercel)

### Option 1: Vercel CLI

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Build the project:

```bash
ng build
```

3. Deploy:

```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Configure the build settings:
   - **Framework Preset:** Other
   - **Build Command:** `ng build`
   - **Output Directory:** `dist/hirehub-onboarding-portal/browser`
   - **Install Command:** `npm install`
4. Click **Deploy**

### Vercel Configuration

A `vercel.json` file is included in the project root to handle SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Environment Configuration

Environment-specific settings are managed in the `src/environments/` directory:

- `environment.ts` — Development configuration
- `environment.prod.ts` — Production configuration

## Contributing

This is a private project. Please contact the project maintainer for contribution guidelines.

## License

**Private** — All rights reserved. This project is proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited.