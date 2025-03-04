import PostCreateForm from "@/components/PostCreateForm";
import PostList from "@/components/PostList";
import { fetchPostsBySlug } from "@/db/queries/post";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsBySlug(slug)} />
      </div>
      <div className="col-span-1">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  )
}
