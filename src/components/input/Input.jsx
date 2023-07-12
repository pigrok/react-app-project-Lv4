import React from "react";
import shortid from "shortid";
import useInput from "../../hooks/useInput";
import { createPost } from "../../api/posts";
import { useMutation, useQueryClient } from "react-query";
import Category from "../common/Category";

function Input({ setModalWrite }) {
  const [category, categoryChangeHandler, resetCategory] = useInput();
  const [writer, writerChangetHandler, resetWriter] = useInput();
  const [title, titleChangetHandler, resetTitle] = useInput();
  const [body, bodyChangetHandler, resetBody] = useInput();
  const [url, urlChangetHandler, resetUrl] = useInput();

  const queryClient = useQueryClient();

  // 추가
  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const createSubmitHandler = async (e) => {
    e.preventDefault();
    if (!category || !writer || !title || !body || !url) {
      alert("필수값이 누락되었습니다. 확인해주세요");
      return false;
    }

    const newPost = {
      id: shortid.generate(),
      category,
      writer,
      title,
      body,
      url,
    };
    const confirmCreate = window.confirm("등록하시겠습니까?");
    if (!confirmCreate) {
      return;
    }

    try {
      await createPostMutation.mutateAsync(newPost);
    } catch (error) {
      console.error(error);
    }

    setModalWrite(false);
    resetTitle("");
    resetBody("");
    resetUrl("");
    resetCategory("");
    resetWriter("");
  };

  const closeModal = () => {
    setModalWrite(false);
  };

  return (
    <div
      style={{
        margin: "50px 0 50px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={createSubmitHandler}
      >
        <Category categoryChangeHandler={categoryChangeHandler} />
        <br />
        <div>
          <label>작성자 : </label>
          <input
            type="text"
            name="writer"
            value={writer}
            onChange={(e) => writerChangetHandler(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>제목 : </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => titleChangetHandler(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>내용 : </label>
          <input
            type="text"
            name="body"
            value={body}
            onChange={(e) => bodyChangetHandler(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>URL : </label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => urlChangetHandler(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">제출</button>
        <br />
        <button
          onClick={() => {
            closeModal();
          }}
        >
          닫기
        </button>
      </form>
    </div>
  );
}

export default Input;
