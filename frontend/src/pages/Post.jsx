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

    if (!post) return <p>Loading...</p>
    
    return (
        <div className="single-post">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
    </div>
    )

}

export default Post;