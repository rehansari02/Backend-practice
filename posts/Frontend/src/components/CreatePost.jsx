import React, { useState } from 'react'
import axios from '../utils/axios'
import { useNavigate, Link } from 'react-router-dom'
import './CreatePost.css'

const CreatePost = () => {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image || !caption) {
            alert('Please provide both image and caption')
            return
        }

        setLoading(true)
        const formData = new FormData()
        formData.append('image', image)
        formData.append('caption', caption)

        try {
            const response = await axios.post('/create-posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Post created:', response.data)
            alert('Post created successfully!')
            navigate('/')
        } catch (error) {
            console.error('Error creating post:', error)
            alert('Failed to create post. Is the backend running on port 3000?')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="create-post-container">
            <div className="create-post-card">
                <h2>Create New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="image">Upload Image</label>
                        <input 
                            type="file" 
                            id="image" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                        {preview && (
                            <div className="image-preview">
                                <img src={preview} alt="Preview" />
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="caption">Caption</label>
                        <textarea 
                            id="caption" 
                            rows="4" 
                            placeholder="Write a catchy caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Post'}
                    </button>
                    <Link to="/" className="back-link">Back to Home</Link>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
