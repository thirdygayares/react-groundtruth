import { Route } from "@/routes/users/$userId";

export function UserDetailsPage() {
    const { userId } = Route.useParams();

    return <>
        UserId : {userId}
    </>
}