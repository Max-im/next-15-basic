import { redirect } from "next/navigation";
import PostList from "@/components/PostList";
import { fetchPostsBySearchTerm } from "@/db/queries/post";

interface SearchPageProps {
    searchParams: Promise<{
        q: string;
    }>;
}


export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;

    if (!q) {
        redirect('/');
    }

    return <div>
        <PostList fetchData={() => fetchPostsBySearchTerm(q)} />
    </div>;
}