import React, { useState, useEffect } from 'react'
import './components/BlogManagement.scss'
import TopNavigationBar from '@/components/TopNavigationBar'
import Footer from '@/components/Footer'

const BlogManagement = () => {
  // State for blog posts
  const [blogPosts, setBlogPosts] = useState([])
  
  // State for the form
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    author: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    tags: '',
    isPublished: true
  })
  
  // State for editing mode
  const [editMode, setEditMode] = useState(false)
  
  // State for showing confirmation dialog
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  
  // Mock function to load posts (in a real app, this would fetch from an API)
  useEffect(() => {
    // Sample blog data (same as in your Blog.js file)
    const initialBlogPosts = [
      {
        id: 1,
        title: 'Getting Started with React',
        date: 'March 25, 2025',
        author: 'Jane Doe',
        excerpt:
          'React is a popular JavaScript library for building user interfaces. In this post, we will explore the basics of React and how to get started with your first app.',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
        imageUrl: 'https://www.adverity.com/hubfs/6%20Key%20Digital%20Marketing%20Metrics%20for%202025%20blog%20hero.png',
        tags: ['React', 'JavaScript', 'Web Development'],
        isPublished: true
      },
      {
        id: 2,
        title: 'Styling in React with SCSS',
        date: 'March 20, 2025',
        author: 'John Smith',
        excerpt:
          'SCSS is a powerful CSS preprocessor that can help you write more maintainable styles for your React applications. Learn how to integrate SCSS with React.',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
        imageUrl: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?cs=srgb&dl=pexels-pixabay-261662.jpg&fm=jpg',
        tags: ['SCSS', 'CSS', 'Styling', 'React'],
        isPublished: true
      },
      {
        id: 3,
        title: 'State Management in React Applications',
        date: 'March 15, 2025',
        author: 'Sarah Johnson',
        excerpt:
          'Managing state in React applications can be challenging. In this post, we will look at different approaches to state management and when to use each one.',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
        imageUrl: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?cs=srgb&dl=pexels-pixabay-261662.jpg&fm=jpg',
        tags: ['React', 'State Management', 'Redux', 'Context API'],
        isPublished: true
      },
      {
        id: 4,
        title: 'Building Accessible React Components',
        date: 'March 10, 2025',
        author: 'Alex Williams',
        excerpt:
          'Accessibility is crucial for modern web applications. Discover how to create React components that are accessible to all users, including those with disabilities.',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
        imageUrl: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?cs=srgb&dl=pexels-pixabay-261662.jpg&fm=jpg',
        tags: ['React', 'Accessibility', 'a11y', 'Web Development'],
        isPublished: true
      },
      {
        id: 5,
        title: 'React Performance Optimization Techniques',
        date: 'March 5, 2025',
        author: 'Jamie Lee',
        excerpt:
          'Optimizing React application performance is essential for providing a smooth user experience. Learn about memoization, code splitting, and other optimization techniques.',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
        imageUrl: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?cs=srgb&dl=pexels-pixabay-261662.jpg&fm=jpg',
        tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
        isPublished: true
      },
    ]
    
    setBlogPosts(initialBlogPosts)
  }, [])
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name === 'tags') {
      // Handle tags as a comma-separated string
      setFormData({
        ...formData,
        [name]: value
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      })
    }
  }
  
  // Handle form submission for creating or updating a post
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Format the tags from comma-separated string to array
    const formattedTags = formData.tags.split(',').map(tag => tag.trim())
    
    // Get today's date if no date is provided
    const submitDate = formData.date || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    if (editMode) {
      // Update existing post
      const updatedPosts = blogPosts.map(post => 
        post.id === parseInt(formData.id) ? 
        { ...formData, date: submitDate, tags: formattedTags, id: parseInt(formData.id) } : 
        post
      )
      setBlogPosts(updatedPosts)
    } else {
      // Create new post
      const newPost = {
        ...formData,
        id: Date.now(), // Generate a unique ID
        date: submitDate,
        tags: formattedTags
      }
      setBlogPosts([...blogPosts, newPost])
    }
    
    // Reset form
    resetForm()
  }
  
  // Handle edit button click
  const handleEdit = (post) => {
    setEditMode(true)
    setFormData({
      ...post,
      tags: post.tags.join(', ')
    })
    
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Handle delete confirmation
  const confirmDelete = (post) => {
    setPostToDelete(post)
    setShowDeleteConfirm(true)
  }
  
  // Handle actual deletion
  const handleDelete = () => {
    if (postToDelete) {
      const filteredPosts = blogPosts.filter(post => post.id !== postToDelete.id)
      setBlogPosts(filteredPosts)
      setShowDeleteConfirm(false)
      setPostToDelete(null)
    }
  }
  
  // Reset form fields and state
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      date: '',
      author: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      tags: '',
      isPublished: true
    })
    setEditMode(false)
  }
  
  // Handle changing post publish status
  const togglePublishStatus = (id) => {
    const updatedPosts = blogPosts.map(post => 
      post.id === id ? { ...post, isPublished: !post.isPublished } : post
    )
    setBlogPosts(updatedPosts)
  }
  
  return (
    <>
      <div className="blog-management container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="display-4 fw-bold">Blog Management</h1>
            <p className="lead">Create, edit, and manage your blog posts</p>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{editMode ? 'Edit Post' : 'Create New Post'}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="id" value={formData.id} />
                  
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="title" 
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="author" 
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date (Leave blank for today's date)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      placeholder="March 29, 2025"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      id="imageUrl" 
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      required
                    />
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <img 
                          src={formData.imageUrl} 
                          alt="Post preview" 
                          className="img-thumbnail" 
                          style={{ maxHeight: '100px' }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="excerpt" className="form-label">Excerpt</label>
                    <textarea 
                      className="form-control" 
                      id="excerpt" 
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows="2"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea 
                      className="form-control" 
                      id="content" 
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="6"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="tags" 
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="React, JavaScript, Web Development"
                      required
                    />
                  </div>
                  
                  <div className="mb-3 form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="isPublished" 
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isPublished">Publish immediately</label>
                  </div>
                  
                  <div className="d-flex">
                    <button type="submit" className="btn btn-primary">
                      {editMode ? 'Update Post' : 'Add Post'}
                    </button>
                    {editMode && (
                      <button 
                        type="button" 
                        className="btn btn-secondary ms-2" 
                        onClick={resetForm}
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">Statistics</h5>
              </div>
              <div className="card-body">
                <div className="stats-item mb-3">
                  <h6>Total Posts</h6>
                  <p className="fs-3 fw-bold">{blogPosts.length}</p>
                </div>
                <div className="stats-item mb-3">
                  <h6>Published Posts</h6>
                  <p className="fs-3 fw-bold">{blogPosts.filter(post => post.isPublished).length}</p>
                </div>
                <div className="stats-item">
                  <h6>Draft Posts</h6>
                  <p className="fs-3 fw-bold">{blogPosts.filter(post => !post.isPublished).length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Manage Existing Posts</h5>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="showOnlyPublished" 
                  />
                  <label className="form-check-label text-white" htmlFor="showOnlyPublished">
                    Show only published
                  </label>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Tags</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map(post => (
                        <tr key={post.id} className={!post.isPublished ? 'table-secondary' : ''}>
                          <td>{post.id}</td>
                          <td>{post.title}</td>
                          <td>{post.author}</td>
                          <td>{post.date}</td>
                          <td>
                            {post.tags.map(tag => (
                              <span key={tag} className="badge bg-info me-1">{tag}</span>
                            ))}
                          </td>
                          <td>
                            <span className={`badge ${post.isPublished ? 'bg-success' : 'bg-warning'}`}>
                              {post.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-primary" 
                                onClick={() => handleEdit(post)}
                              >
                                <i className="bi bi-pencil"></i> Edit
                              </button>
                              <button 
                                className="btn btn-danger" 
                                onClick={() => confirmDelete(post)}
                              >
                                <i className="bi bi-trash"></i> Delete
                              </button>
                              <button 
                                className={`btn ${post.isPublished ? 'btn-warning' : 'btn-success'}`} 
                                onClick={() => togglePublishStatus(post.id)}
                              >
                                <i className={`bi ${post.isPublished ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                {post.isPublished ? ' Unpublish' : ' Publish'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the post "{postToDelete?.title}"?</p>
                <p className="text-danger">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && <div className="modal-backdrop fade show"></div>}
          </>
  )
}

export default BlogManagement