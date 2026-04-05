import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
      <h1 style={{ color: 'navy', textAlign: 'center' }}>My Blog</h1>
      {posts.map(post => (
        <div key={post.id} style={{ backgroundColor: 'white', border: '2px solid navy', padding: '10px', marginBottom: '15px' }}>
          <Link to={`/posts/${post.id}`}><h2 style={{ color: 'purple' }}>{post.title}</h2></Link>
          <p style={{ color: 'gray', fontSize: '14px' }}>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;