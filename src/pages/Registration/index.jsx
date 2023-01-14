import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  
  const onSubmit = async (values) => {
    if (!isValid) return;
    
    const data = await dispatch(fetchRegister(values));
    const { payload } = data;
    
    if(payload.token) {
      window.localStorage.setItem('token', payload.token);
    } else {
      window.alert('Не удалось авторизоваться')
    }
  };
  
  if (isAuth) {
    return <Navigate to={'/'} />
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
     <form onSubmit={handleSubmit(onSubmit)}>
       <div className={styles.avatar}>
         <Avatar sx={{ width: 100, height: 100 }} />
       </div>
       <TextField
         className={styles.field}
         label="Полное имя"
         {...register('fullName', { required: 'Укажите имя' })}
         error={Boolean(errors.email?.message)}
         helperText={errors.email?.message}
         fullWidth
       />
       <TextField
         className={styles.field}
         type="email"
         label="E-Mail"
         {...register('email', { required: 'Укажите почту' })}
         error={Boolean(errors.email?.message)}
         helperText={errors.email?.message}
         fullWidth
       />
       <TextField
         className={styles.field}
         type="password"
         label="Пароль"
         {...register('password', { required: 'Укажите пароль' })}
         error={Boolean(errors.password?.message)}
         helperText={errors.password?.message}
         fullWidth
       />
       <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
         Зарегистрироваться
       </Button>
     </form>
    </Paper>
  );
};
