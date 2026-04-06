import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = 'http://localhost:3000/posts'

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`${API}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
      })
      .then(setPosts)
      .catch((err) => setError(err.message))
  }, [token])

  async function togglePublish(id) {
    const res = await fetch(`${API}/${id}/publish`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return
    const updated = await res.json()
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: updated.published } : p))
    )
  }

  async function deletePost(id) {
    if (!confirm('Delete this post?')) return
    const res = await fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/posts/new">+ New Post</Link>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
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
      )}
    </div>
  )
}
