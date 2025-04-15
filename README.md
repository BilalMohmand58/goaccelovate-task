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

## Deployment

The application is deployed at [https://todo-app-example.vercel.app](https://todo-app-example.vercel.app)

## Screenshots

### Home Page

![Home Page](/public/img/home.png)

### Sign In Page

![Sign In Page](/public/img/signin.png)

### Register Page

![Register Page](/public/img/register.png)

### Dashboard

![Dashboard](/public/img/dashboard.png)

### Edit Todo Page

![Edit Todo Page](/public/img/edit.png)

### Oauth Page

![Edit Todo Page](/public/img/oauth.png)


```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
