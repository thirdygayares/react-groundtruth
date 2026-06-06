import { createFileRoute } from "@tanstack/react-router";
import { UserDetailsPage } from "@/pages/users/UserDetailsPage";

export const Route = createFileRoute("/users/$userId")({
    component: UserDetailsPage,
});