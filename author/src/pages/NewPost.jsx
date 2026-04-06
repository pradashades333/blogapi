import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const token = localStorage.getItem('token')

    fetch('http://localhost:3000/posts', {
      method: 'POST',
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
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>

      <label>
        Content:
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </label>

      <button type="submit">Create Post</button>
    </form>
  )
}

export default NewPost
