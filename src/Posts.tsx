import { useState, useEffect } from 'react';

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
}

export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Erro ao buscar posts');
    return response.json();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (err) {
        console.log("Erro ao buscar posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Carregando posts...</div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h2 className="posts-title">Lista de Posts</h2>
      <div className="posts-grid">
        {posts?.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <span className="post-user-id">User ID: {post.userId}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
