import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../api/posts";
import { useQuery } from "react-query";

const List = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery("posts", getPosts);

  const navDtailPage = (postId) => {
    navigate(`/${postId}`);
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "전체",
    "게임",
    "음악",
    "영화",
    "먹방",
    "브이로그",
    "IT",
    "예능",
    "동물",
    "스포츠",
    "피트니스",
  ];

  const filteredPosts =
    selectedCategory && data
      ? selectedCategory !== "전체"
        ? data.filter((post) => post.category === selectedCategory)
        : data
      : data || [];

  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  if (isError) {
    return <h3>Error...!</h3>;
  }

  return (
    <div>
      <div>
        <br />
        <br />
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {categories.map((category) => (
              <button
                style={{
                  margin: "0 4px",
                  padding: "4px 8px",
                }}
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          }}
        >
          {filteredPosts.map((post) => {
            return (
              <div
                style={{
                  border: "1px solid black",
                  width: "450px",
                  margin: "24px",
                }}
              >
                <div key={post.id} onClick={() => navDtailPage(post.id)}>
                  <div>
                    {post.url && (
                      <iframe
                        width="100%"
                        height="250"
                        src={post.url.replace("watch?v=", "embed/")}
                        title="YouTube Trailer"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    )}
                  </div>
                  <p>제목 :{post.title} </p>
                  <p>작성자 :{post.writer}</p>
                  <p>카테고리 : {post.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
