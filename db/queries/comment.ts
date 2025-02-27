import { cache } from 'react'
import { Comment } from "@prisma/client";
import { db } from "..";

export type CommentWithUser = (
    Comment &
    { user: { id: string; name: string | null; image: string | null } }
);


export const fetchCommentsByPostId = cache((postId: string): Promise<CommentWithUser[]> => {
    return db.comment.findMany({
        where: { postId },
        include: {
            user: { select: { id: true, name: true, image: true } }
        },
        orderBy: { createdAt: 'asc' }
    });
});