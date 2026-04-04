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
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
        </div>
      ))}
    </div>
  );
}

export default Home;