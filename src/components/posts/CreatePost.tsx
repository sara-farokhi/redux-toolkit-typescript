import {
  useAppDispatch,
  useAppSelector
} from "../../hooks/useSelectorDispach"
import { newPost } from "../../interfaces/posts/postInterfaces"
import { useState } from "react"
import { createPost } from "../../redux/features/postsSlice"
import { useNavigate } from "react-router-dom"

const EditPost = () => {
  const { loading } = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')


  const createItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: newPost = {
      body,
      title,
    }
    dispatch(createPost(data))
    navigate('/posts')
  }

  return (
    <>
      {loading ? <h2>Loading...</h2> : <form onSubmit={(e) => createItem(e)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">title</label>
          <input value={title} type="text" className="form-control" placeholder="enter title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Body</label>
          <textarea value={body} className="form-control" placeholder="enter body" onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-sm btn-primary my-3">Submit</button>
      </form>
      }
    </>
  )
}

export default EditPost
