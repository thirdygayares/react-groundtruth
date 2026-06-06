# Step 1: Fix routes folder

routes should look like this:

```txt
src/
  routes/
    __root.tsx
    index.tsx
    about.tsx
    users/
      index.tsx
      $userId.tsx
```


---

# Step 2: `src/routes/__root.tsx`

```tsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <hr />

      <Outlet />
    </div>
  )
}
```

This is  main layout.

---

# Step 3: `src/routes/index.tsx`

This is home route.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return <h1>Home Page</h1>
}
```

Or use existing page:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@pages/home/HomePage'

export const Route = createFileRoute('/')({
  component: HomePage,
})
```

---

# Step 4: `src/routes/about.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '@pages/about/AboutPage'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
```

`AboutPage.tsx` can be simple:

```tsx
export function AboutPage() {
  return <h1>About Page</h1>
}
```

---

# Step 5: `src/routes/users/index.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { UsersPage } from '@pages/users/UsersPage'

export const Route = createFileRoute('/users/')({
  component: UsersPage,
})
```


```tsx
export function UsersPage() {
  return (
    <>
      <h1>User Page</h1>
    </>
  )
}
```

---

# Step 6: `src/routes/users/$userId.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { UserDetailsPage } from '@pages/users/UserDetailsPage'

export const Route = createFileRoute('/users/$userId')({
  component: UserDetailsPage,
})
```

---

# Step 7: Fix `UserDetailsPage.tsx`

import should match generated route file.

```tsx
import { Route } from '@/routes/users/$userId'

export function UserDetailsPage() {
  const { userId } = Route.useParams()

  return (
    <>
      UserId: {userId}
    </>
  )
}
```

This is correct.

---

# Step 8: Add links in `UsersPage.tsx`

For testing dynamic route:

```tsx
import { Link } from '@tanstack/react-router'

export function UsersPage() {
  return (
    <>
      <h1>User Page</h1>

      <ul>
        <li>
          <Link to="/users/$userId" params={{ userId: '1' }}>
            User 1
          </Link>
        </li>

        <li>
          <Link to="/users/$userId" params={{ userId: '2' }}>
            User 2
          </Link>
        </li>
      </ul>
    </>
  )
}
```

Now when you click User 1, it should go to:

```txt
/users/1
```

And display:

```txt
UserId: 1
```

---

# Step 9: Main file should be TanStack Router only

`main.tsx` should be:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import './index.css'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

Remove this:

```tsx
import { BrowserRouter } from 'react-router-dom'
```

Remove this also:

```tsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

---

# Step 10: Restart dev server

Stop server, then run again:

```bash
npm run dev
```

Expected generated file:

```txt
src/routeTree.gen.ts
```

Do not edit that file.

---

# Final flow

```txt
main.tsx
  -> RouterProvider
    -> routeTree.gen.ts
      -> routes/__root.tsx
        -> routes/index.tsx
        -> routes/about.tsx
        -> routes/users/index.tsx
        -> routes/users/$userId.tsx
```

