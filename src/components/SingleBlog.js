import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div>
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
    </div>
  );
};

export default SingleBlog;
