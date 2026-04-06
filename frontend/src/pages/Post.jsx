import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const token = localStorage.getItem('token');

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
            <div style={{ marginTop: '20px' }}>
                <h3>Comments</h3>
                {post.comments.map(comment => (
                    <div key={comment.id} style={{ backgroundColor: 'white', border: '1px solid navy', padding: '10px', marginBottom: '10px' }}>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
            {token && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Add a Comment</h3>
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={4}
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                        placeholder="Write a comment..."
                    />
                    <button style={{ marginTop: '8px', padding: '8px 16px' }}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default Post;