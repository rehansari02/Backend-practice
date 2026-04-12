import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'
import './home.css'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/get-posts')
                setPosts(response.data.data)
            } catch (error) {
                console.error('Error fetching posts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Feed</h1>
                <Link to="/create" className="create-btn">
                    <span>+</span> Create Post
                </Link>
            </header>
            
            <main>
                {loading ? (
                    <div className="loading">Loading your feed...</div>
                ) : posts.length > 0 ? (
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <div key={post._id} className="post-card">
                                <div className="post-image-container">
                                    <img src={post.image} alt={post.caption} />
                                </div>
                                <div className="post-content">
                                    <p className="post-caption">{post.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-posts">
                        <p>No posts yet. Be the first to share something!</p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Home