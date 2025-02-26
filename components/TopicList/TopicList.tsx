import Link from "next/link"
import { Chip } from '@heroui/chip';
import { db } from "@/db";
import url from "@/url";

export default async function TopicList() {
    const topics = await db.topic.findMany();

    return (
        <div className="flex flex-wrap flex-row gap-2">
            {
                topics.map(topic => (
                    <div key={topic.id}>
                        <Link href={url.topicShowUrl(topic.slug)}>
                            <Chip color="warning" variant="shadow">{topic.slug}</Chip>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
