import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getDetail, editPost, removePost } from "../../api/posts";
import useInput from "../../hooks/useInput";
import Category from "../common/Category";

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
      <div
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "10px",
        }}
      >
        <div>
          {data.url && (
            <iframe
              width="1455px"
              height="800px"
              src={data.url.replace("watch?v=", "embed/")}
              title="YouTube Trailer"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {isEditMode ? (
            <div>
              <p>제목 : </p>
              <textarea
                value={editedTitle}
                onChange={(e) => {
                  editedTitleChangeHandler(e.target.value);
                }}
              />
            </div>
          ) : (
            <p>제목 : {data.title}</p>
          )}
          <br />
          {isEditMode ? (
            <div>
              <p>내용 : </p>
              <textarea
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
        <br />
        {isEditMode ? (
          <div>
            <p>Url : </p>
            <textarea
              value={editedUrl}
              onChange={(e) => {
                editedUrlChangeHandler(e.target.value);
              }}
            />
          </div>
        ) : (
          <></>
        )}
        <br />
        {isEditMode ? (
          <div>
            <p>카테고리 : </p>
            <Category categoryChangeHandler={categoryChangeHandler} />
          </div>
        ) : (
          <p>카테고리 : {data.category}</p>
        )}
        <br />
        {isEditMode ? (
          <div>
            <p>작성자 : </p>
            <textarea
              value={editedWriter}
              onChange={(e) => {
                editedWriterChangeHandler(e.target.value);
              }}
            />
          </div>
        ) : (
          <p>작성자 : {data.writer}</p>
        )}
        <br />
        <div style={{ display: "flex" }}>
          {isEditMode ? (
            <div>
              <button onClick={exitEditMode}>Cancel</button>
              <button onClick={() => editPostHandler(data)}>Save</button>
            </div>
          ) : (
            <button onClick={() => enterEditMode(data)}>Edit</button>
          )}
          <br />
          <button onClick={() => removePostHandler(data)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
