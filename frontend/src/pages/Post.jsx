import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }, [id]);

    if (!post) return <p style={{ backgroundColor: 'lightblue', padding: '20px' }}>Loading...</p>

    return (
        <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
            <div style={{ backgroundColor: 'white', border: '2px solid navy', padding: '20px' }}>
                <h1 style={{ color: 'purple', marginTop: 0 }}>{post.title}</h1>
                <p style={{ color: 'gray', fontSize: '16px' }}>{post.content}</p>
            </div>
        </div>
    )
}

export default Post;