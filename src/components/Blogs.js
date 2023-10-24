import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleUp,
  faCircleDown,
  faComment,
} from '@fortawesome/free-regular-svg-icons'
import { v4 as uuidv4 } from 'uuid'
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap'
import Navbar from './Navbar'
import '../styles/blogs.css'
import { useNavigate } from 'react-router-dom'

const Blogs = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [comment, setComment] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentBlogId, setCurrentBlogId] = useState(null)

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/blogs')
      setBlogs(response.data)
    } catch (error) {
      console.error('Error fetching all blog posts:', error)
    }
  }
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible)
  }

  const createBlogPost = async () => {
    const formData = new FormData()
    const postId = uuidv4()
    formData.append('postId', postId)
    formData.append('heading', title)
    formData.append('content', content)
    formData.append('userId', 'wfwguifgwfui')

    if (imageFile) {
      formData.append('images', imageFile)
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log('Blog created:', response.data)
      setTitle('')
      setContent('')
      setImageFile(null)
      setComment([])
      fetchAllBlogs()
    } catch (error) {
      console.error('Error creating blog post:', error)
    }
    // e.preventDefault();
  }
  const closeForm = () => {
    setFormVisible(false)
    // Add additional logic if needed
  }

  const handleUpvote = async (blogId) => {
    try {
      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === blogId) {
          return { ...blog, upvotes: blog.upvotes + 1 }
        } else {
          return blog
        }
      })
      setBlogs(updatedBlogs)
      const blogToUpdate = blogs.find((blog) => blog._id === blogId)
      if (blogToUpdate) {
        const { upvotes, ...rest } = blogToUpdate
        await axios.post(`http://localhost:4000/api/blogs/${blogId}`, {
          ...rest,
          upvotes: upvotes + 1,
        })
      }
    } catch (error) {
      console.error('Error upvoting blog post:', error)
    }
  }

  const handleDownvote = async (blogId) => {
    try {
      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === blogId) {
          const downvotes = blog.downvotes - 1 >= 0 ? blog.downvotes - 1 : 0
          return { ...blog, downvotes }
        } else {
          return blog
        }
      })
      setBlogs(updatedBlogs)
      const blogToUpdate = blogs.find((blog) => blog._id === blogId)
      if (blogToUpdate) {
        const { downvotes, ...rest } = blogToUpdate
        await axios.post(`http://localhost:4000/api/blogs/${blogId}`, {
          ...rest,
          downvotes,
        })
      }
    } catch (error) {
      console.error('Error downvoting blog post:', error)
    }
  }

  const handleOpenModal = (blogId) => {
    setShowModal(true)
    setCurrentBlogId(blogId)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentBlogId(null)
  }

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/addComment',
        {
          blogId: currentBlogId,
          content: comment,
        },
      )
      console.log(response.data) // check response
      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === currentBlogId) {
          return { ...blog, comments: [...blog.comments, response.data] }
        } else {
          return blog
        }
      })
      setBlogs(updatedBlogs)
      setShowModal(false)
      setCurrentBlogId(null)
      setComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const navigate = useNavigate()

  const handleReadMore = (blogId) => {
    navigate(`/blogs/${blogId}`) // Assuming the route is set up as '/blogs/:id'
  }

  useEffect(() => {
    fetchAllBlogs()
  }, [])

  return (
    <>
      <Navbar />
      <Container>
        <h2>Blogs</h2>
        <div>
          {!formVisible && (
            <button className="postButton" onClick={toggleFormVisibility}>
              Post your Blogs
            </button>
          )}
          {formVisible && (
            <form className="blogPostForm" onSubmit={createBlogPost}>
              <h2>Create a Blog Post</h2>
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label>Content</label>
              <textarea
                rows={3}
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <label>Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
              <div>
                <button type="submit" className="submitBtn">
                  Create Blog
                </button>
                <button type="button" className="closeBtn" onClick={closeForm}>
                  Close
                </button>
              </div>
            </form>
          )}
        </div>

        {blogs.map((blog) => (
          <Container key={blog._id} className="blogPosts">
            <h3>{blog.heading}</h3>
            <p>{blog.content}</p>
            {blog.images &&
              blog.images.map((image, index) => (
                <img
                  key={index}
                  src={`${image.url}`}
                  alt={`Blog ${index}`}
                  style={{ maxWidth: '100px' }}
                />
              ))}

            <div className="buttonGroup">
              <Button
                className="upvoteButton"
                variant="primary"
                onClick={() => handleUpvote(blog._id)}
              >
                <i class="fa-solid fa-chevron-up fa-sm"></i> {blog.upvotes}
              </Button>
              <Button
                className="downvoteButton"
                variant="primary"
                onClick={() => handleDownvote(blog._id)}
              >
                <i class="fa-solid fa-chevron-down fa-sm"></i> {blog.downvotes}
              </Button>
              <Button variant="link" onClick={() => handleReadMore(blog._id)}>
                Read More
              </Button>
            </div>
            <div className="commentSection">
              <FontAwesomeIcon
                icon={faComment}
                onClick={() => handleOpenModal(blog._id)}
                className="commentIcon"
              />
              {blog.comments.map((comment, index) => (
                <p key={index} className="blogComment">
                  {comment}
                </p>
              ))}
            </div>
          </Container>
        ))}

        <Modal
          className="modalPopup"
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Header
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Modal.Title>Add Comment</Modal.Title>
            <button className="custom-close-button" onClick={handleCloseModal}>
              X
            </button>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Comment
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button> */}
            <Button variant="primary" onClick={handleAddComment}>
              Add Comment
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export default Blogs
