import axios from "axios";

// 조회
const getReviews = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/reviews`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 추가
const createReview = async (newReview) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/reviews`,
      newReview
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 삭제
const removeReview = async (review) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/reviews/${review.id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 수정
const editReview = async (review) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/reviews/${review.id}`,
      review
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getReviews, createReview, removeReview, editReview };
