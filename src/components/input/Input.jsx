import React from "react";
import shortid from "shortid";
import useInput from "../../hooks/useInput";
import { createPost } from "../../api/posts";
import { useMutation, useQueryClient } from "react-query";
import Category from "../common/Category";
import { styled } from "styled-components";
import Button from "../button/Button";

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
    <ModalContainer>
      <ModalWrapper>
        <ModalBox onSubmit={createSubmitHandler}>
          <CategoryBody>
            <CategorySpan>카테고리 :</CategorySpan>
            <Category categoryChangeHandler={categoryChangeHandler} />
          </CategoryBody>
          <WriterBox>
            <label>작성자 : </label>
            <WriterInput
              type="text"
              name="writer"
              value={writer}
              onChange={(e) => writerChangetHandler(e.target.value)}
            />
          </WriterBox>
          <TitleBox>
            <label>제목 : </label>
            <TitleInput
              type="text"
              name="title"
              value={title}
              onChange={(e) => titleChangetHandler(e.target.value)}
            />
          </TitleBox>
          <BodyBox>
            <label>내용 : </label>
            <BodyTextarea
              type="text"
              name="body"
              value={body}
              onChange={(e) => bodyChangetHandler(e.target.value)}
            />
          </BodyBox>
          <UrlBox>
            <label>URL : </label>
            <UrlInput
              type="text"
              name="url"
              value={url}
              onChange={(e) => urlChangetHandler(e.target.value)}
            />
          </UrlBox>
          <ButtonBox>
            {" "}
            <Button type="submit">제출</Button>
            <Button
              onClickEvent={() => {
                closeModal();
              }}
            >
              닫기
            </Button>
          </ButtonBox>
        </ModalBox>
      </ModalWrapper>
    </ModalContainer>
  );
}

export default Input;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(0.1em);
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 480px;
  height: 500px;

  color: black;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  transform: translateX(-50%) translateY(-50%);

  background-color: #eae8e8ea;
`;

const ModalBox = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CategoryBody = styled.div`
  display: flex;
  margin: 60px 226px 0 0;
`;

const CategorySpan = styled.span`
  margin-right: 5px;
`;

const WriterBox = styled.div`
  margin: 20px 0;
`;

const WriterInput = styled.input`
  width: 300px;
`;

const TitleBox = styled.div`
  margin: 0 0 20px 0;
`;

const TitleInput = styled.input`
  width: 300px;
  margin-left: 12px;
`;

const BodyBox = styled.div`
  margin: 0 0 20px 0;
  display: flex;
`;
const BodyTextarea = styled.textarea`
  width: 302px;
  height: 100px;
  margin-left: 16px;
`;

const UrlBox = styled.div`
  margin: 0 0 40px 0;
  display: flex;
`;

const UrlInput = styled.input`
  width: 300px;
  margin-left: 12px;
`;

const ButtonBox = styled.div`
  display: flex;
`;
