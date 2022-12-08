import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "./features/postsSlice"

const store = configureStore({
    reducer: {
        post: postsReducer
    }
})


// export const stored = configureStore({
//     reducer: {
//         posts: postsReducer
//     }
// })

export default store
