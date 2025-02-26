import PostCreateForm from "@/components/PostCreateForm";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-4">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
      </div>
      <div className="col-span-4">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  )
}
