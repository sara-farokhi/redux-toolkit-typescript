import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:3004/posts"

// initialState
const initialState = {
    loading: true,
    posts: [],
    post: {},
    error: null
}

// get posts
export const getPosts = createAsyncThunk("posts/get",
    async () => {
        const res = await axios.get(BASE_URL)
        return res.data
    }
)

// create post
export const createPost = createAsyncThunk("posts/create", async (newPost) => {
    await axios.post(BASE_URL, newPost)
})

// edit post
export const setCurrent = createAsyncThunk("posts/edit/currennt", async (id) => {
    const res = axios.put(`http://localhost:3004/posts/${id}`)
})

// edit post
export const editPost = createAsyncThunk("posts/edit", async (updatedPosts) => {
    const id = updatedPosts.id
    const res = axios.put(`http://localhost:3004/posts/${id}`, updatedPosts)
})

// deleteItem
export const deletePost = createAsyncThunk("posts/delete", async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`)
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
        // }

        extraReducers(builder) {

            // get posts cases
            builder
                .addCase(getPosts.pending, (state, action) => {
                    state.status = 'loading'
                })
            builder
                .addCase(getPosts.fulfilled, (state, action) => {
                    state.loading = false
                    state.posts = action.payload
                })
            builder
                .addCase(getPosts.rejected, (state, action) => {
                    state.loading = false
                    state.error = true
                })

            // set current
            builder
                .addCase(setCurrent.pending, (state, action) => {
                    state.status = 'loading'
                })
            builder
                .addCase(setCurrent.fulfilled, (state, action) => {
                    state.loading = false
                    state.post = action.payload
                })
            builder
                .addCase(setCurrent.rejected, (state, action) => {
                    state.loading = false
                    state.error = true
                })

            // deletPost posts cases
            builder.addCase(deletePost.pending, (state, action) => {
                state.loading = true
            })
            builder.addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false
                let updatedPosts = state.posts.filter(post => post.id !== action.payload)
                console.log(updatedPosts)
                state.posts = updatedPosts
            })
        }





    }
)

export default postsSlice.reducer






