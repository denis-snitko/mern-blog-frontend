import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';
import styles from './AddPost.module.scss';
import 'easymde/dist/easymde.min.css';
import axios from '../../axios';

const { REACT_APP_API } = process.env;

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  
  const navigate = useNavigate();
  const { id } = useParams();
  
  const isEditing = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [post, setPost] = useState();
  
  const inputFileRef = useRef(null);
  
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setPost((prevState) => (
        { ...prevState, imageUrl: data.url || '' }
      ));
    } catch (error) {
      console.log(error);
    }
  };
  
  const onClickRemoveImage = () => {
    setPost((prevState) => ({ ...prevState, imageUrl: '' }));
  };
  
  const onChange = useCallback((value) => {
    setPost((prevState) => ({ ...prevState, text: value }));
  }, []);
  
  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title: post?.title,
        text: post?.text,
        tags: post?.tags ? post.tags.split(',').filter(Boolean) : [],
        imageUrl: post?.imageUrl,
      };
      
      isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);
      
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOnePost = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/posts/${id}`);
      const { data } = await res.data;
      setPost({
        title: data.title,
        text: data.text,
        tags: data.tags ? data.tags.join(',') : '',
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
   getOnePost()
  }, [id]);
  
  if (isLoading) {
    return <Paper style={{ padding: 30 }} isLoading={isLoading} />;
  }
  
  return (
    <Paper style={{ padding: 30 }}>
      {!!isAuth &&
        (<div>
          <Button disabled={!isAuth} variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
            Загрузить превью
          </Button>
          <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
          {post?.imageUrl && (
            <Button disabled={!isAuth} variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
          )}
        </div>)
      }
      {post?.imageUrl && (<img className={styles.image} src={post.imageUrl && `${REACT_APP_API}${post.imageUrl}`} alt="Uploaded" />)}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={post?.title}
        onChange={(event) => setPost((prevState) => ({ ...prevState, title: event.target.value }))}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={post?.tags}
        onChange={(event) => setPost((prevState) => ({ ...prevState, tags: event.target.value.trim() }))}
      />
      <SimpleMDE className={styles.editor} value={post?.text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button disabled={!isAuth} size="large" variant="contained" onClick={handleSubmit}>
          {isEditing ? 'Обновить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
