import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { fetchLogin, loginErrors, selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useLocation } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const errorsData = useSelector(loginErrors);
  const { state } = useLocation();
  
  const { register, handleSubmit, formState: { isValid } } = useForm({
    defaultValues: {
      email: "root@root.com",
      password: "root"
    },
    mode: "onChange"
  });
  const onSubmit = async (values) => {
    if (!isValid) return;
    
    const data = await dispatch(fetchLogin(values));
    const { payload } = data;
    
    if (payload.token) {
      window.localStorage.setItem("token", payload.token);
    }
  };
  
  if (isAuth) {
    return <Navigate to={state?.from.pathname || "/"} />;
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          type="email"
          label="E-Mail"
          {...register('email')}
          error={Boolean(errorsData?.email?.message)}
          helperText={errorsData?.email?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          type="password"
          label="Пароль"
          {...register("password")}
          error={Boolean(errorsData?.password?.message)}
          helperText={errorsData?.password?.message}
          fullWidth
        />
        <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
