import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./session-slice";

export default function useLogin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login());
  });
}
