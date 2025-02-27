import Link from "next/link";
// import PostShow from "@/components/posts/post-show";
// import CommentList from "@/components/comments/comment-list";
import url from "@/url";
import { db } from "@/db";
import { notFound } from "next/navigation";
import CommentCreateForm from "@/components/CommentCreateForm";
import CommentList from "@/components/CommentList";
import { fetchCommentsByPostId } from "@/db/queries/comment";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;
  const post = await db.post.findUnique({where: {id: postId}});

  if(!post) {
    return notFound()
  }

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={url.topicShowUrl(slug)}>
        {"< "}Back to {slug}
      </Link>

      <div className="m-4">
        <h1 className="text-2xl font-bold my-2">{post.title}</h1>
        <p className="p-4 border rounded">{post.content}</p>
      </div>

      <CommentCreateForm slug={slug} postId={postId} startOpen />
      <CommentList slug={slug} fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}
