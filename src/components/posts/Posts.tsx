import { useEffect } from "react"
import {
  useAppDispatch,
  useAppSelector
} from "../../hooks/useSelectorDispach"
import { getPosts, deletePost } from "../../redux/features/postsSlice"
import { Link } from "react-router-dom"

const Posts = () => {
  const dispatch = useAppDispatch()
  const { posts, loading } = useAppSelector(state => state.post)
  useEffect(
    () => {
      dispatch(getPosts())
    }, [dispatch]
  )

  const deleteItem = (id: number) => {
    dispatch(deletePost(id))
  }

  return (
    <>
      {loading && <h2>Loading....</h2>}
      {/* {
      error && <h1>{error}</h1>
      } */}
      <Link to='/posts/create' > <div className="btn btn-success">Add Post</div></Link>

      {posts.length > 0 && <div>
        <div className="row">
          {posts.map((post, i:number) => <div key={i} className="col-lg-4 col-md-6 col-sm-12 p-3">
            <div className="card">
              <div className="card-header">
                Featured
              </div>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
              </div>
              <div className="card-footer d-flex">
                <Link to={`/posts/edit/${post.id}`}>
                  <div className="btn btn-primary btn-sm mx-3">edit</div></Link>
                <div className="btn btn-danger btn-sm" onClick={() => deleteItem(Number(post.id))}>delete</div>

              </div>
            </div>
          </div>)}
        </div>

      </div>}


    </>

  )
}

export default Posts
