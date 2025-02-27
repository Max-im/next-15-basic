import { Post } from "@prisma/client";
import { db } from "..";

export type PostWithData = (Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number };
});


export function fetchPostsBySlug(slug: string): Promise<PostWithData[]> {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } }
        }
    });
}

export function fetchTopPosts(): Promise<PostWithData[]> {
    return db.post.findMany({
        take: 10,
        orderBy: { comments: {
            _count: "desc"
        }},
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } }
        }
    });
}

export function fetchPostsBySearchTerm(q: string): Promise<PostWithData[]> {
    return db.post.findMany({
        where: { OR: [
            { title: { contains: q } },
            { content: { contains: q } }
        ]},
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } }
        }
    });
}