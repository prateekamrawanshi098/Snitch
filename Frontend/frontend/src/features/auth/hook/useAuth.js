import { setLoading, setuser, setError } from "../state/auth.slice";
import { getme, login, register } from "../services/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    contact,
    password,
    fullname,
    isSeller = false,
  }) {
    const data = await register({
      email,
      contact,
      password,
      fullname,
      isSeller,
    });
    dispatch(setuser(data.user));
    return data.user;
  }

  async function handleLogin({ email, password }) {
    const data = await login({ email, password });
    dispatch(setuser(data.user));
    return data.user
  }

  async function handlegetme() {
    try {
      dispatch(setLoading(true))
      const data = await getme()
      dispatch(setuser(data.user))
    } catch (err) {
      dispatch(setError(err.message))
    }
    finally {
      dispatch(setLoading(false))

    }
  }
  return { handleRegister, handleLogin, handlegetme };
};


