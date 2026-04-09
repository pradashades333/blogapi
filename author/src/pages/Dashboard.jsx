import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

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
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/posts/new" className="btn-new">+ New Post</Link>
      </div>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <div>
              <span className="post-title">{post.title}</span>
              <span className={`post-status ${post.published ? '' : 'unpublished'}`}>
                {post.published ? 'Published' : 'Unpublished'}
              </span>
            </div>
            <div className="post-actions">
              <button onClick={() => togglePublish(post.id)}>
                {post.published ? 'Unpublish' : 'Publish'}
              </button>
              <button onClick={() => navigate(`/posts/${post.id}/edit`)}>Edit</button>
              <button className="delete" onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
