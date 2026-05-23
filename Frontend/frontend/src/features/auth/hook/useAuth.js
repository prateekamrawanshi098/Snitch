import { setLoading, setuser, setError } from "../state/auth.slice";
import { register } from "../services/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    contact,
    password,
    fullname,
    isSeller=false,
  }) {
    const data = await register({email, contact, password, fullname, isSeller});
    dispatch(setuser(data.user));
    return data.user;
  }
  return { handleRegister };
};
