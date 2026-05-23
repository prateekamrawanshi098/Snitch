import { setLoading, setUser, setError } from "../state/auth.slice";
import { register } from "../services/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    contact,
    password,
    fullname,
    isSeller,
  }) {
    const data = await register(email, contact, password, fullname, isSeller);
    dispatch(setUser(data.user));
    return data.user;
  }
};
