# 🌐 Community Platform — Frontend

An Angular 15 Single-Page Application (SPA) for a community-driven Q&A and resource-sharing platform. Features a modular component architecture, JWT-based route protection via Angular Guards, reactive state management with RxJS, and a clean Bootstrap 5 UI with Bootstrap Icons.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Pages & Routes](#-pages--routes)
- [Getting Started](#-getting-started)
- [Architecture Overview](#-architecture-overview)
- [Key Design Decisions](#-key-design-decisions)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 15 |
| Language | TypeScript 4.9 |
| UI Library | Bootstrap 5.3 |
| Icons | Bootstrap Icons 1.11 |
| Reactive Programming | RxJS 7.8 |
| HTTP Client | Angular HttpClient |
| Routing | Angular Router |
| Forms | Angular Reactive / Template-driven Forms |
| Build Tool | Angular CLI 15 |
| Testing | Karma + Jasmine |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/                  # Feature components (14 total)
│   │   │   ├── landing-page/            # Public home / hero page
│   │   │   ├── login/                   # Login form
│   │   │   ├── register/                # Registration form
│   │   │   ├── home/                    # Authenticated dashboard
│   │   │   ├── community-create/        # Create new community form
│   │   │   ├── community-details/       # View community + members + resources
│   │   │   ├── update-community/        # Edit community details
│   │   │   ├── discussion/              # Single discussion view + comments + voting
│   │   │   ├── discussion-create/       # Create discussion form
│   │   │   ├── resource-upload/         # Upload/link resource form
│   │   │   ├── search-filter/           # Search across communities/discussions
│   │   │   ├── notifications/           # User notification center
│   │   │   ├── update-profile/          # Edit profile + upload picture
│   │   │   └── admin-panel/             # Admin moderation dashboard
│   │   ├── guards/
│   │   │   └── auth.guard.ts            # Route protection (CanActivate)
│   │   ├── services/
│   │   │   ├── auth.service.ts          # Auth state, login, register, logout
│   │   │   ├── community.service.ts     # Community API calls
│   │   │   ├── notification.service.ts  # Notification API calls
│   │   │   └── resource.service.ts      # Resource API calls
│   │   ├── models/                      # TypeScript interfaces for type safety
│   │   ├── app-routing.module.ts        # Centralized route definitions
│   │   ├── app.module.ts                # Root NgModule
│   │   ├── app.component.ts             # Root component + nav logic
│   │   ├── app.component.html           # Shell layout + navbar
│   │   └── app.component.css            # Global shell styles
│   ├── index.html                       # App entry HTML
│   ├── main.ts                          # Angular bootstrap
│   └── styles.css                       # Global styles
├── angular.json                         # Angular CLI workspace config
├── tsconfig.json                        # TypeScript compiler config
└── package.json
```

---

## ✨ Features

### 🔐 Authentication Flow
- **Register** — creates an account; redirects to login on success
- **Login** — posts credentials to the backend, stores the returned **JWT in `localStorage`**, and updates a `BehaviorSubject<boolean>` to reactively reflect auth state across the app
- **Logout** — clears token and reactive state, redirects to landing page
- **Auth Guard (`CanActivate`)** — intercepts navigation to protected routes; unauthenticated users are redirected to `/login` automatically

### 🏡 Landing Page
- Public-facing hero page for unauthenticated visitors
- Entry point to register or log in

### 🏠 Home Dashboard
- Authenticated users' main view after login
- Displays communities, discussions, and quick navigation

### 🏘 Community Management
- **Browse** all public communities
- **Create** a new community with name, description, and public/private visibility toggle
- **View community details** — members list, discussions, and shared resources
- **Join** a community — triggers a notification to the community creator
- **Edit** community name, description, and visibility (owner only)
- **Upload banner image** for a community

### 💬 Discussions
- **Create** a discussion within a specific community — notifies all community members automatically
- **View** a discussion with full comment thread
- **Add comments** directly in the discussion view
- **Upvote / Downvote** discussions with a single click
- Discussion author and community name resolved via Mongoose populate (displayed with username)

### 📦 Resource Sharing
- **Upload** a file resource or share an external **URL link**
- Select resource type: `article`, `video`, `file`, `document`, `other`
- Add descriptive **tags** for discoverability
- Resources are scoped to a specific community
- Community members can **download** uploaded files

### 🔔 Notifications
- Dedicated notifications page showing all user-specific alerts
- Mark notifications as **read**
- **Delete** individual notifications
- Sorted by most recent (newest first)

### 🔍 Search & Filter
- Search across communities and discussions

### 👤 Profile Management
- Update **username** and **bio**
- Upload a **profile picture**
- View communities the user is part of

### 🛡 Admin Panel
- Role-based access — only users with `isAdmin: true` can access `/admin`
- **Delete inappropriate resources** (flagged by keyword filter)
- **Delete discussions and auto-ban** the offending author
- **Manually ban users** with a required reason field

---

## 🗺 Pages & Routes

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | `LandingPageComponent` | ❌ |
| `/login` | `LoginComponent` | ❌ |
| `/register` | `RegisterComponent` | ❌ |
| `/home` | `HomeComponent` | ✅ |
| `/communities` | `CreateCommunityComponent` | ✅ |
| `/communities/:communityId` | `CommunityDetailsComponent` | ✅ |
| `/discussion/:communityId` | `CreateDiscussionComponent` | ✅ |
| `/discussions/:discussionId` | `DiscussionComponent` | ✅ |
| `/search` | `SearchFilterComponent` | ✅ |
| `/upload` | `ResourceUploadComponent` | ✅ |
| `/notifications` | `NotificationsComponent` | ✅ |
| `/updateProfile` | `UpdateProfileComponent` | ❌ |
| `/updateCommunity` | `UpdateCommunityComponent` | ❌ |
| `/admin` | `AdminPanelComponent` | ✅ |
| `**` | Redirects to `/home` | — |

> ✅ = Protected by `AuthGuard`

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Angular CLI v15 (`npm install -g @angular/cli@15`)
- Backend API running on `http://localhost:3000` (see backend README)

### Installation

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will be served at **`http://localhost:4200`** with live reload enabled.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` folder.

### Run Tests

```bash
npm test
```

Runs unit tests via **Karma** and **Jasmine** in a Chrome browser.

---

## 🏗 Architecture Overview

### Module Structure
The application uses a single **`AppModule`** with `HttpClientModule`, `FormsModule`, `ReactiveFormsModule`, and `RouterModule` imported at the root level. All 14 components are declared in `AppModule`.

### Service Layer
Angular services handle all HTTP communication with the backend and hold shared application state:

| Service | Responsibility |
|---------|----------------|
| `AuthService` | Login, register, logout; `BehaviorSubject<boolean>` for reactive auth state; admin role check via `localStorage` |
| `CommunityService` | CRUD operations and membership for communities |
| `NotificationService` | Fetch, mark-as-read, and delete notifications |
| `ResourceService` | Share and retrieve resources |

All services use Angular's `HttpClient` with the backend base URL `http://localhost:3000/api`.

### Authentication Flow (Frontend)
```
User submits login form
    → AuthService.login() → POST /api/auth/login
        → JWT token stored in localStorage
        → BehaviorSubject<boolean> set to true
        → Router.navigate(['/home'])

Protected route access
    → AuthGuard.canActivate()
        → AuthService.isLoggedIn() checks BehaviorSubject value
            → true  → allow navigation
            → false → Router.navigate(['/login'])
```

### HTTP Authorization
Every protected API call attaches the stored JWT token in the `Authorization` header:
```
Authorization: Bearer <token_from_localStorage>
```

---

## 🔑 Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| `BehaviorSubject` for auth state | Allows any component to reactively subscribe to login/logout changes without polling |
| `AuthGuard` on protected routes | Prevents unauthenticated URL access; handles redirect at the router level |
| Services per domain | Keeps components thin; separates HTTP concerns from view logic |
| Bootstrap 5 + Bootstrap Icons | Rapid, consistent UI with no custom CSS overhead for layout |
| TypeScript interfaces in `models/` | Enforces type safety on API response shapes across the entire codebase |
| `localStorage` for token | Simple persistence across page refreshes; cleared on logout |

---

## 🔗 Backend Integration

This frontend is designed to work exclusively with the **Community Platform Backend API**.

- Backend must be running at: `http://localhost:3000`
- CORS is enabled on the backend for all origins in development
- All API routes follow the pattern: `http://localhost:3000/api/<domain>`

See the [Backend README](../backend/README.md) for setup instructions.

---

## 🧑‍💻 Author

Built as a Capstone Project demonstrating full-stack Angular + Node.js development skills.
