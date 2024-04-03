import { useMutation } from "@tanstack/react-query";

const useMutationHook = (callback) => {
  const mutaion = useMutation({
    mutationFn: callback,
  });
  return mutaion;
};

export default useMutationHook;
