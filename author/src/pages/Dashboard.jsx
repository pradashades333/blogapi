import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = 'http://localhost:3000/posts'

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`${API}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
  }, [])

  async function togglePublish(id) {
    const res = await fetch(`${API}/${id}/publish`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    })
    const updated = await res.json()
    setPosts(posts.map((p) => (p.id === id ? updated : p)))
  }

  async function deletePost(id) {
    await fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setPosts(posts.filter((p) => p.id !== id))
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/posts/new">+ New Post</Link>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <span>{post.published ? ' [Published]' : ' [Unpublished]'}</span>
            <button onClick={() => togglePublish(post.id)}>
              {post.published ? 'Unpublish' : 'Publish'}
            </button>
            <button onClick={() => navigate(`/posts/${post.id}/edit`)}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
