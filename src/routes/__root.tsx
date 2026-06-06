import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    return (
        <div>
            <header style={{ display: "flex", gap: "1rem" }}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </header>

            <hr />

            <main>
                <Outlet />
            </main>
        </div>
    );
}