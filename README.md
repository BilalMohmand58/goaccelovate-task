# Next.js Todo Application

A fully functional and responsive Todo web application with authentication, database integration, and protected routes.

## Features

- User authentication with Google OAuth and email/password credentials using NextAuth.js
- Secure handling of user data
- Task management system with CRUD operations
- Real-time UI updates without page refreshes
- Protected routes for authenticated users only
- Responsive design for all device sizes
- Database integration with PostgreSQL via Prisma ORM

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static generation
- [PostgreSQL](https://www.postgresql.org/) - Powerful, open source object-relational database
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com/) - UI component library built on top of TailwindCSS
- [Jest](https://jestjs.io/) - JavaScript testing framework

## Installation and Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- PostgreSQL database

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret_here"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

4. Initialize the database:

```bash
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

To run tests using Jest:

```bash
npm test
# or
yarn test
```

## Code Execution Time Complexity

- **Task Addition**: O(1) - Adding a new task is a simple database insertion operation
- **Task Deletion**: O(1) - Deleting a task by ID is a direct database operation
- **Task Update**: O(1) - Updating a task by ID is a direct database operation
- **Task List Retrieval**: O(n) - Where n is the number of tasks belonging to the user

## Assumptions

- Each user has their own separate list of tasks
- Authentication tokens are stored securely in HttpOnly cookies
- The application is intended for personal use with a reasonable number of tasks per user
- All API endpoints validate user authentication before performing any database operations
- Form inputs are validated on both client and server sides

## Deployment

The application is deployed at [https://todo-app-example.vercel.app](https://todo-app-example.vercel.app)

## Screenshots

### Home Page

![Home Page](https://via.placeholder.com/800x450)

### Sign In Page

![Sign In Page](https://via.placeholder.com/800x450)

### Register Page

![Register Page](https://via.placeholder.com/800x450)

### Dashboard

![Dashboard](https://via.placeholder.com/800x450)

### Edit Todo Page

![Edit Todo Page](https://via.placeholder.com/800x450)

## Database Dump

A PostgreSQL database dump file is available in the `database` directory. To restore it:

```bash
psql -U username -d todo_app < database/dump.sql
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
