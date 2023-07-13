import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../api/posts";
import { useQuery } from "react-query";
import { styled } from "styled-components";
import { RiLiveFill } from "react-icons/ri";
import Total_Logo from "../../image/Total.png";
import Game_Logo from "../../image/Game.png";
import Music_Logo from "../../image/Music.png";
import Movie_Logo from "../../image/Movie.png";
import Eating_Logo from "../../image/Eating.png";
import IT_Logo from "../../image/IT.png";
import Entertainment_Logo from "../../image/Entertainment.png";
import Animal_Logo from "../../image/Animal.png";
import Sports_Logo from "../../image/Sports.png";
import Fitness_Logo from "../../image/Fitness.png";
import Vlog_Logo from "../../image/Vlog.png";

const categories = [
  { category: "전체", src: Total_Logo },
  { category: "게임", src: Game_Logo },
  { category: "음악", src: Music_Logo },
  { category: "영화", src: Movie_Logo },
  { category: "먹방", src: Eating_Logo },
  { category: "IT", src: IT_Logo },
  { category: "예능", src: Entertainment_Logo },
  { category: "동물", src: Animal_Logo },
  { category: "스포츠", src: Sports_Logo },
  { category: "피트니스", src: Fitness_Logo },
  { category: "브이로그", src: Vlog_Logo },
];

const List = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { isLoading, isError, data } = useQuery("posts", getPosts);

  const navDtailPage = (postId) => {
    navigate(`/${postId}`);
  };

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
      <CategoryContainer>
        <CateoryWrapper>
          {categories.map((category) => (
            <div>
              <CategoryImg
                src={category.src}
                key={category.category}
                onClick={() => {
                  setSelectedCategory(category.category);
                }}
              ></CategoryImg>
            </div>
          ))}
        </CateoryWrapper>
      </CategoryContainer>
      <PostContainer>
        {filteredPosts.map((post) => {
          return (
            <PostWrapper>
              <div key={post.id} onClick={() => navDtailPage(post.id)}>
                <div>
                  {post.url && (
                    <Youtube
                      src={post.url.replace("watch?v=", "embed/")}
                      title="YouTube Trailer"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></Youtube>
                  )}
                </div>
                <CategoryWriter>
                  <CategoryWriterFont>
                    <RiLiveFill size="13px" />
                    &nbsp;
                    {post.category}
                  </CategoryWriterFont>
                  <CategoryWriterFont>by.{post.writer}</CategoryWriterFont>
                </CategoryWriter>
                <Title>
                  <TitleFont>{post.title}</TitleFont>
                </Title>
              </div>
            </PostWrapper>
          );
        })}
      </PostContainer>
    </div>
  );
};

export default List;

const CategoryContainer = styled.div`
  margin: 70px 0 30px 0;
`;

const CateoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryImg = styled.img`
  padding: 2px 4px;
  width: 80px;
  cursor: pointer;
`;

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  cursor: pointer;
`;
const PostWrapper = styled.div`
  border: 3px solid #bdbdbd;
  border-radius: 15px;
  width: 450px;
  margin: 24px;
`;

const Youtube = styled.iframe`
  border-radius: 15px 15px 0 0;
  width: 100%;
  height: 250px;
`;

const CategoryWriter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoryWriterFont = styled.span`
  padding: 0 5px 10px 5px;
  font-size: 17px;
  text-decoration: underline;
`;

const Title = styled.div`
  margin: 5px 5px 10px 6px;
`;

const TitleFont = styled.span`
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
