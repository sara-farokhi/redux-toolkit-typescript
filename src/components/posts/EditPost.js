
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import {  editPost } from "../../redux/features/postsSlice"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const EditPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const setCurrent = async (id) => {
      const res = await axios.get(`http://localhost:3004/posts/${id}`)
      setBody(res.data.body)
      setTitle(res.data.title)
      setLoading(false)
    }
    setCurrent(id)
  }, [dispatch, id])

  const UpdatePost = (e) => {
    e.preventDefault()
    const data = {
      body,
      title,
      id
    }
    dispatch(editPost(data))
    navigate('/posts')
  }

  return (
    <>
      {loading ? <h2>Loading...</h2> : <form onSubmit={(e) => UpdatePost(e)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">title</label>
          <input value={title} type="text" className="form-control" placeholder="enter title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Body</label>
          <textarea value={body} type="text" className="form-control" placeholder="enter body" onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-sm btn-primary my-3">Submit</button>
      </form>
      }


    </>
  )
}

export default EditPost
