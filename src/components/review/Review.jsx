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
    <div>
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={createReviewHandler}
        >
          <div>
            <label>작성자 : </label>
            <input
              type="text"
              name="writer"
              value={writer}
              onChange={(e) => {
                writerChangeHanlder(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <label>내용 : </label>
            <input
              type="text"
              name="contents"
              value={contents}
              onChange={(e) => {
                contentsChangeHanlder(e.target.value);
              }}
            />
          </div>
          <br />
          <br />
          <button type="submit">작성</button>
        </form>
      </div>
      <div
        style={{ border: "1px solid black", padding: "20px", margin: "20px" }}
      >
        {data
          .filter((review) => review.postId === id)
          .map((review) => {
            const isEditMode = editedReviewId === review.id;
            return (
              <div key={review.id}>
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                    <p>작성자 : {review.writer}</p>
                  )}
                  <br />
                  {isEditMode ? (
                    <div>
                      <p>내용 : </p>
                      <textarea
                        value={editedContents}
                        onChange={(e) => {
                          editedContentsChangeHandler(e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    <p>내용 : {review.contents}</p>
                  )}
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  {isEditMode ? (
                    <div>
                      <button onClick={offEditMode}>Cancel</button>
                      <button onClick={() => editReviewHandler(review)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => onEditMode(review)}>Edit</button>
                  )}
                  <br />
                  <button onClick={() => removeReviewHandler(review)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Review;
