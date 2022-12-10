import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import {
  useAppDispatch,
} from "../../hooks/useSelectorDispach"
import { editPost } from "../../redux/features/postsSlice"
import { post } from "../../interfaces/posts/postInterfaces"



const EditPost = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const setCurrent = async (id: number) => {
      const res = await axios.get(`http://localhost:3004/posts/${id}`)
      setBody(res.data.body)
      setTitle(res.data.title)
      setLoading(false)
    }
    setCurrent(Number(id!))
  }, [dispatch, id])

  const UpdatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: post = {
      body,
      title,
      id: +id!
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
          <textarea value={body} className="form-control" placeholder="enter body" onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-sm btn-primary my-3">Submit</button>
      </form>
      }


    </>
  )
}

export default EditPost
