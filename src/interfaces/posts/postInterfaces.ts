export interface initialSates {
    posts: post[],
    post: post,
    loading: boolean
}
export interface post {
    title: string,
    body: string,
    id: number | string
}