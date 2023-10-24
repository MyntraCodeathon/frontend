import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleUp,
  faCircleDown,
  faComment,
} from '@fortawesome/free-regular-svg-icons'

// const handleDownvote = async (blogId) => {
//   try {
//     const updatedBlogs = blogs.map((blog) => {
//       if (blog._id === blogId) {
//         const downvotes = blog.downvotes - 1 >= 0 ? blog.downvotes - 1 : 0
//         return { ...blog, downvotes }
//       } else {
//         return blog
//       }
//     })
//     setBlogs(updatedBlogs)
//     const blogToUpdate = blogs.find((blog) => blog._id === blogId)
//     if (blogToUpdate) {
//       const { downvotes, ...rest } = blogToUpdate
//       await axios.post(`http://localhost:4000/api/blogs/${blogId}`, {
//         ...rest,
//         downvotes,
//       })
//     }
//   } catch (error) {
//     console.error('Error downvoting blog post:', error)
//   }
// }

const SingleBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [u, setU] = useState(0)
  const [d, setD] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:4000/api/blog/${id}`)
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
        setU(data.upvotes)
        setD(data.downvotes)
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>No data available</div>;
  }

  return (
    <div style={{
      "border":"18px solid black"
    }}>
      <h1>{blog.heading}</h1>
      <p>{blog.content}</p>
      {blog.images &&
        blog.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Blog ${index}`}
            style={{ maxWidth: "300px" }}
          />
        ))}
        <Button
                className="upvoteButton"
                variant="primary"
                onClick={() => setU(u+1)}
              >
                <i class="fa-solid fa-chevron-up fa-sm"></i> {u}
              </Button>
              <Button
                className="downvoteButton"
                variant="primary"
                onClick={() => {
                  setD(d+1)
                }}
              >
              <i class="fa-solid fa-chevron-down fa-sm"></i> {d}
              </Button>
              <div className="commentSection">
              <FontAwesomeIcon
                icon={faComment}
                // onClick={() => handleOpenModal(blog._id)}
                className="commentIcon"
              />
              {blog.comments.map((comment, index) => (
                <p key={index} className="blogComment">
                  {comment}
                </p>
              ))}
            </div>
    </div>
  );
};

export default SingleBlog;
