import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getDetail, editPost, removePost } from "../../api/posts";
import useInput from "../../hooks/useInput";
import Category from "../common/Category";
import { RiLiveFill } from "react-icons/ri";
import CategoryPost from "./CategoryPost";
import { styled } from "styled-components";
import Button from "../button/Button";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery("post", () => getDetail(id));

  const queryClient = useQueryClient();

  // 삭제
  const removePostMutation = useMutation((post) => removePost(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      navigate("/");
    },
  });

  // 수정
  const editPostMutation = useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      exitEditMode();
    },
  });

  // 삭제
  const removePostHandler = async (post) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await removePostMutation.mutateAsync(post);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 수정
  const editPostHandler = async (post) => {
    const editedPost = {
      ...post,
      category,
      writer: editedWriter,
      title: editedTitle,
      body: editedBody,
      url: editedUrl,
    };
    const confirmSave = window.confirm("저장하시겠습니까?");
    if (confirmSave) {
      try {
        await editPostMutation.mutateAsync(editedPost);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [editedPostId, setEditedPostId] = useState(null);
  const [category, categoryChangeHandler, resetCategory] = useInput();
  const [editedWriter, editedWriterChangeHandler, resetWriter] = useInput("");
  const [editedTitle, editedTitleChangeHandler, resetTitle] = useInput("");
  const [editedBody, editedBodyChangeHandler, resetBody] = useInput("");
  const [editedUrl, editedUrlChangeHandler, resetUrl] = useInput("");

  // 수정 모드 on
  const enterEditMode = (post) => {
    setEditedPostId(post.id);
    categoryChangeHandler(post.category);
    editedWriterChangeHandler(post.writer);
    editedTitleChangeHandler(post.title);
    editedBodyChangeHandler(post.body);
    editedUrlChangeHandler(post.url);
  };
  // 수정 모드 off
  const exitEditMode = () => {
    setEditedPostId(null);
    resetCategory("");
    resetWriter("");
    resetTitle("");
    resetBody("");
    resetUrl("");
  };

  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  if (isError) {
    return <h3>Error...!</h3>;
  }

  const isEditMode = editedPostId === data.id;

  return (
    <div>
      <YoutubeContainer>
        {data.url && (
          <YoutubeIfram
            src={data.url.replace("watch?v=", "embed/")}
            title="YouTube Trailer"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></YoutubeIfram>
        )}
      </YoutubeContainer>
      <PostContainer>
        <div>
          <CategoryContainer>
            {isEditMode ? (
              <CategoryOnEdit>
                <CategoryBox>
                  <RiLiveFill />
                  {data.category}
                </CategoryBox>
                <Category categoryChangeHandler={categoryChangeHandler} />
              </CategoryOnEdit>
            ) : (
              <CategoryOffEdit>
                <RiLiveFill size="15" /> {data.category}
              </CategoryOffEdit>
            )}
          </CategoryContainer>
          <div>
            {isEditMode ? (
              <div>
                <p>작성자 : </p>
                <WriterTextarea
                  value={editedWriter}
                  onChange={(e) => {
                    editedWriterChangeHandler(e.target.value);
                  }}
                />
              </div>
            ) : (
              <p>작성자 : {data.writer}</p>
            )}
          </div>
          <PostTitle>
            {isEditMode ? (
              <div>
                <div>제목 : </div>
                <TitleTextarea
                  value={editedTitle}
                  onChange={(e) => {
                    editedTitleChangeHandler(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div>{data.title}</div>
            )}
          </PostTitle>
          <div>
            {isEditMode ? (
              <div>
                <p>내용 : </p>
                <BodyTextarea
                  value={editedBody}
                  onChange={(e) => {
                    editedBodyChangeHandler(e.target.value);
                  }}
                />
              </div>
            ) : (
              <p>내용 : {data.body}</p>
            )}
          </div>
        </div>
        <div>
          {isEditMode ? (
            <div>
              <p>Url : </p>
              <UrlTextarea
                value={editedUrl}
                onChange={(e) => {
                  editedUrlChangeHandler(e.target.value);
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <br />
        <Buttons>
          {isEditMode ? (
            <>
              <Button onClickEvent={exitEditMode}>🔙</Button>
              <Button onClickEvent={() => editPostHandler(data)}>✔️</Button>
            </>
          ) : (
            <>
              {" "}
              <Button onClickEvent={() => enterEditMode(data)}>🖋️</Button>
              <Button onClickEvent={removePostHandler}>🗑️</Button>
            </>
          )}
          <br />
        </Buttons>
        <PostCategory>관련 카테고리 글</PostCategory>
        <P></P>
      </PostContainer>
      <CategoryPost filteredData={data} />
    </div>
  );
}

export default Post;

const YoutubeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YoutubeIfram = styled.iframe`
  width: 1000px;
  height: 600px;
`;

const PostContainer = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

const CategoryContainer = styled.div`
  font-size: 18px;
  margin: 7px;
  text-decoration: underline;
`;

const CategoryOnEdit = styled.div`
  display: flex;
`;

const CategoryBox = styled.div`
  margin-right: 10px;
`;

const CategoryOffEdit = styled.div`
  display: flex;
`;

const WriterTextarea = styled.textarea`
  width: 180px;
  height: 32px;
  border-radius: 3px;
`;

const PostTitle = styled.div`
  font-size: 25px;
  margin: 7px 0 7px 0;
`;

const TitleTextarea = styled.textarea`
  width: 990px;
  height: 64px;
  border-radius: 3px;
`;

const BodyTextarea = styled.textarea`
  width: 990px;
  height: 128px;
  border-radius: 3px;
`;

const UrlTextarea = styled.textarea`
  width: 990px;
  height: 32px;
  border-radius: 3px;
`;

const PostCategory = styled.p`
  margin-top: 100px;
`;

const P = styled.div`
  border-bottom: 1px solid gray;
`;

const Buttons = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-right: 5px;
`;
