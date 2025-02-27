import CommentShow from "../CommentShow";
import { fetchCommentsByPostId } from "@/db/queries/comment";

interface CommentListProps {
    postId: string;
    slug: string;
}

export default async function CommentList({ postId, slug }: CommentListProps) {
    const comments = await fetchCommentsByPostId(postId);
    const topLevelComments = comments.filter(
        (comment) => comment.parentId === null
    );

    return (
        <div className="space-y-3">
            <h1 className="text-lg font-bold">All {comments.length} comments</h1>
            
            {topLevelComments.map((comment) => (
                <CommentShow
                    key={comment.id}
                    commentId={comment.id}
                    slug={slug}
                    postId={postId}
                />
            ))}
        </div>
    );
}
