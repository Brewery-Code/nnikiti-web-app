import { rqClient } from "@/shared/api/instance";
import { login } from "@/shared/model";
import { useDispatch } from "react-redux";

export function useLogin() {
  const dispatch = useDispatch();

  const loginMutation = rqClient.useMutation("post", "/auth/token/token/", {
    onSuccess(data) {
      dispatch(login(data.access));
    },
  });
}
