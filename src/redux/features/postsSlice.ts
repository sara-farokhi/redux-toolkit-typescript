import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { initialSates, post, newPost } from "../../interfaces/posts/postInterfaces";
import axios from "axios";
const BASE_URL = "http://localhost:3004/posts"

// initialState
const initialState: initialSates = {
    posts: [],
    loading: true,
    post: {
        title: "",
        body: "",
        id: ""
    },
}

// get posts
export const getPosts = createAsyncThunk("posts/get",
    async () => {
        const res = await axios.get(BASE_URL)
        return res.data
    }
)

// create post
export const createPost = createAsyncThunk("posts/create", async (newPost: newPost) => {
    const { data } = await axios.post(BASE_URL, newPost)
    return data
})

// edit current post
export const setCurrent = createAsyncThunk("posts/edit/currennt", async (id) => {
    const res = await axios.put(`http://localhost:3004/posts/${id}`)
    return res.data
})

// edit post
export const editPost = createAsyncThunk("posts/edit", async (updatedPosts: post) => {
    let postId = updatedPosts.id
    axios.patch(`http://localhost:3004/posts/${postId}`, updatedPosts)
})

// deleteItem
export const deletePost = createAsyncThunk("posts/delete", async (id: number) => {
     await axios.delete(`${BASE_URL}/${id}`)
    return id
})

const postsSlice = createSlice(
    {
        name: "posts",
        initialState: initialState,

        // extraReducers: {
        //     [getPosts.pending]: (state, action) => {
        //         state.loading = true
        //     },
        //     [getPosts.fulfilled]: (state, action) => {
        //         state.loading = false
        //         state.posts = action.payload
        //     },
        //     [getPosts.rejected]: (state, action) => {
        //         state.loading = false
        //         state.error = true
        //     }
        // }, 
        reducers: {},

        extraReducers(builder) {

            // get posts cases
            builder
                .addCase(getPosts.pending, (state, action) => {
                    state.loading = true
                })
            builder
                .addCase(getPosts.fulfilled, (state, action: PayloadAction<post[]>) => {
                    state.loading = false
                    state.posts = action.payload
                })
            builder
                .addCase(getPosts.rejected, (state, action) => {
                    state.loading = false
                })

            // set current
            builder
                .addCase(setCurrent.pending, (state, action) => {
                    state.loading = true
                })
            builder
                .addCase(setCurrent.fulfilled, (state, action: PayloadAction<post>) => {
                    state.loading = false
                    state.post = action.payload
                })
            builder
                .addCase(setCurrent.rejected, (state, action) => {
                    state.loading = false
                })

            // deletPost posts cases
            builder.addCase(deletePost.pending, (state, action) => {
                state.loading = true
            })
            builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false
                let updatedPosts = state.posts.filter(post => post.id !== action.payload)
                state.posts = updatedPosts
            })
        }
    }
)

export default postsSlice.reducer






