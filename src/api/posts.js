import axios from "axios";

// 전체 조회
const getPosts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/posts`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 상세 조회
const getDetail = async (postId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/posts/${postId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 추가
const createPost = async (newPost) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/posts`,
      newPost
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 삭제
const removePost = async (postId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//수정
const editPost = async (post) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/posts/${post.id}`,
      post
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getPosts, getDetail, createPost, removePost, editPost };
