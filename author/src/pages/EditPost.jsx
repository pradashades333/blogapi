import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EditPost.css'

function EditPost() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch(`http://localhost:3000/posts/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setTitle(data.title)
        setContent(data.content)
      })
  }, [id])

  function handleSubmit(e) {
    e.preventDefault()

    const token = localStorage.getItem('token')

    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(() => {
        navigate('/dashboard')
      })
  }

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </label>
        <div className="edit-post-actions">
          <button type="submit" className="btn-save">Save Changes</button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditPost
