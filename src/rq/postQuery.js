import { useMutation, useQueryClient } from "react-query";
import { createPost } from "../../api/posts";

const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  return createPostMutation;
};

export default useCreatePostMutation;
