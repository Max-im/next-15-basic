import { Suspense } from "react";
import Link from "next/link";
import url from "@/url";
import { db } from "@/db";
import { notFound } from "next/navigation";
import CommentCreateForm from "@/components/CommentCreateForm";
import CommentList from "@/components/CommentList";
import PostInfo from "@/components/PostInfo";
import PostInfoLoader from "@/components/PostInfoLoader";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;
  const post = await db.post.findUnique({ where: { id: postId } });

  if (!post) {
    return notFound()
  }

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={url.topicShowUrl(slug)}>
        {"< "}Back to {slug}
      </Link>

      <Suspense fallback={<PostInfoLoader />}>
        <PostInfo postId={postId} />
      </Suspense>
      <CommentCreateForm slug={slug} postId={postId} startOpen />
      <CommentList slug={slug} postId={postId} />
    </div>
  );
}
