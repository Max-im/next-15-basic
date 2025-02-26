const url = {
    homeUrl() {
        return '/';
    },
    topicShowUrl(slug: string) {
        return `/topics/${slug}`;
    },
    postCreateUrl(slug: string) {
        return `/topics/${slug}/posts/new`;
    },
    postShowUrl(slug: string, id: string) {
        return `/topics/${slug}/posts/${id}`;
    },
}

export default url;