import React from "react";
import { useQuery } from "react-query";
import { getPosts } from "../../api/posts";
import { styled } from "styled-components";
// import { useNavigation } from "react-router-dom";

function CategoryPost({ filteredData }) {
  // const navigate = useNavigation();
  const { isLoading, isError, data } = useQuery("posts", getPosts);

  const navCategoryPage = (id) => {
    window.location.replace(`/${id}`);
    // navigate(`/${id}`);
  };

  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  if (isError) {
    return <h3>Error...!</h3>;
  }

  return (
    <CategoryList>
      {data
        .filter(
          (post) =>
            post.category === filteredData.category &&
            post.id !== filteredData.id
        )
        .slice(0, 3)
        .map((post) => (
          <Category onClick={() => navCategoryPage(post.id)} key={post.id}>
            <div>
              {post.url && (
                <YoutubeWrapper>
                  <Youtube
                    src={post.url.replace("watch?v=", "embed/")}
                    title="YouTube Trailer"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></Youtube>
                </YoutubeWrapper>
              )}
            </div>
            <Title>{post.title.slice(0, 30)}...</Title>
          </Category>
        ))}
    </CategoryList>
  );
}

export default CategoryPost;

const YoutubeWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 250px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
`;

const Youtube = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Category = styled.div`
  margin: 10px;
`;

const Title = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
