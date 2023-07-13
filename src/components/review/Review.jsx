import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import shortid from "shortid";
import {
  getReviews,
  createReview,
  removeReview,
  editReview,
} from "../../api/review";
import { styled } from "styled-components";
import Button from "../button/Button";

function Review() {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery("reviews", getReviews);

  const [writer, writerChangeHanlder, resetWriter] = useInput();
  const [contents, contentsChangeHanlder, resetContents] = useInput();

  const queryClient = useQueryClient();

  // 추가
  const createReveiwMutation = useMutation(createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });

  // 삭제
  const removeReviewMutation = useMutation(removeReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });

  // 수정
  const editReviewMutation = useMutation(editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });

  // 추가 핸들러
  const createReviewHandler = async (e) => {
    e.preventDefault();
    if (!writer || !contents) {
      alert("필수값이 누락되었습니다. 확인해주세요");
      return false;
    }

    const newReview = {
      id: shortid.generate(),
      postId: id,
      writer,
      contents,
    };

    const confirmCreate = window.confirm("등록하시겠습니까?");
    if (!confirmCreate) {
      return;
    }

    try {
      await createReveiwMutation.mutateAsync(newReview);
    } catch (error) {
      console.error(error);
    }
    resetWriter("");
    resetContents("");
  };

  // 삭제 핸들러
  const removeReviewHandler = async (review) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await removeReviewMutation.mutateAsync(review);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 수정 핸들러
  const editReviewHandler = async (review) => {
    try {
      const editedReivew = {
        ...review,
        writer: editedWriter,
        contents: editedContents,
      };
      const confirmSave = window.confirm("저장하시겠습니까?");
      if (confirmSave) {
        await editReviewMutation.mutateAsync(editedReivew);
      }

      offEditMode();
    } catch (error) {
      console.error(error);
    }
  };

  const [editedReviewId, setEditedReviewId] = useState(null);
  const [editedWriter, editedWriterChangeHandler, resetEditedWriter] =
    useInput("");
  const [editedContents, editedContentsChangeHandler, resetEditedContents] =
    useInput("");

  // 수정 모드 on
  const onEditMode = (review) => {
    setEditedReviewId(review.id);
    editedWriterChangeHandler(review.writer);
    editedContentsChangeHandler(review.contents);
  };

  // 수정 모드 off
  const offEditMode = () => {
    setEditedReviewId(null);
    resetEditedWriter();
    resetEditedContents();
  };

  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  if (isError) {
    return <h3>Error...!</h3>;
  }

  return (
    <ReviewContainer>
      <div>
        <p>댓글</p>
        <ReviewTopLine></ReviewTopLine>
      </div>
      <ReviewListContainer>
        {data
          .filter((review) => review.postId === id)
          .map((review) => {
            const isEditMode = editedReviewId === review.id;
            return (
              <ReviewWrapper key={review.id}>
                <ReviewItem>
                  {isEditMode ? (
                    <>
                      <Writer>작성자: {review.writer}</Writer>
                      <EditTitleTextarea
                        value={editedWriter}
                        onChange={(e) => {
                          editedWriterChangeHandler(e.target.value);
                        }}
                      />
                    </>
                  ) : (
                    <Writer>작성자: {review.writer}</Writer>
                  )}
                  <br />
                  {isEditMode ? (
                    <Contents>
                      내용:
                      <EditReviewTextarea
                        value={editedContents}
                        onChange={(e) => {
                          editedContentsChangeHandler(e.target.value);
                        }}
                      />
                    </Contents>
                  ) : (
                    <Contents>내용: {review.contents}</Contents>
                  )}
                </ReviewItem>
                <Buttons>
                  {isEditMode ? (
                    <>
                      <Button onClickEvent={offEditMode}>🔙</Button>
                      <Button onClickEvent={() => editReviewHandler(review)}>
                        💾
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClickEvent={() => onEditMode(review)}>
                        🖋️
                      </Button>
                      <Button onClickEvent={() => removeReviewHandler(review)}>
                        🗑️
                      </Button>
                    </>
                  )}
                </Buttons>
                <ReviewMiddleLine></ReviewMiddleLine>
              </ReviewWrapper>
            );
          })}
      </ReviewListContainer>
      <ReviewFormContainer>
        <div>
          <ReviewForm onSubmit={createReviewHandler}>
            <ReviewFormItem>
              <ReviewFormWriter>작성자:</ReviewFormWriter>
              <input
                type="text"
                name="writer"
                value={writer}
                onChange={(e) => {
                  writerChangeHanlder(e.target.value);
                }}
              />
            </ReviewFormItem>
            <ReviewFormItem>
              <ReviewFormContentsTextarea
                type="text"
                name="contents"
                value={contents}
                onChange={(e) => {
                  contentsChangeHanlder(e.target.value);
                }}
              />
            </ReviewFormItem>
            <Buttons>
              <Button type="submit">⌨️</Button>
            </Buttons>
          </ReviewForm>
        </div>
      </ReviewFormContainer>
    </ReviewContainer>
  );
}

export default Review;

const ReviewTopLine = styled.div`
  border-bottom: 1px solid #bdbdbd;
  width: 1000px;
  margin-bottom: 10px;
`;
const ReviewMiddleLine = styled.div`
  margin-top: 20px;
  border-bottom: 1px dashed #bdbdbd;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const ReviewListContainer = styled.div`
  width: 1000px;
  margin-top: 20px;
`;

const ReviewWrapper = styled.div`
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 5px;
`;

const ReviewItem = styled.div`
  margin-bottom: 10px;
`;

const Writer = styled.p`
  word-wrap: break-word;
`;

const Contents = styled.p`
  word-wrap: break-word;
`;

const EditTitleTextarea = styled.textarea`
  width: 30%;
  height: 30px;
  resize: vertical;
`;

const EditReviewTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  overflow: auto;
  resize: vertical;
`;

const ReviewFormContainer = styled.div`
  width: 1000px;
  margin: 0 0 50px 0;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ReviewFormItem = styled.div`
  margin: 20px 0 10px 0;
  padding: 6px;
`;

const ReviewFormWriter = styled.label`
  margin-right: 7px;
`;

const ReviewFormContentsTextarea = styled.textarea`
  width: 980px;
  height: 100px;

  overflow: auto;
  resize: vertical;
  word-wrap: break-word;
`;

const Buttons = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-right: 5px;
`;
