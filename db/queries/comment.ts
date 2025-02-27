import { Comment } from "@prisma/client";
import { db } from "..";

export type CommentWithUser = (
    Comment &
    { user: { id: string; name: string | null; image: string | null } }
);


export function fetchCommentsByPostId(postId: string): Promise<CommentWithUser[]> {
    return db.comment.findMany({
        where: { postId },
        include: {
            user: { select: { id: true, name: true, image: true } }
        },
        orderBy: { createdAt: 'asc' }
    });
}