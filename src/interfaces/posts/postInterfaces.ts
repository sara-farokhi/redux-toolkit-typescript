export interface initialSates {
    posts: post[],
    post: post,
    loading: boolean
}

export interface newPost {
    title: string,
    body: string,
}
export interface post extends newPost {
    id: number | string
}