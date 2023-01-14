import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import styles from "./AddPost.module.scss";
import "easymde/dist/easymde.min.css";
import axios from "../../axios";

const { REACT_APP_API } = process.env;
const api = `${REACT_APP_API}`;

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  
  const navigate = useNavigate();
  const { id } = useParams();
  
  const isEditing = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const inputFileRef = useRef(null);
  
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      const fullImageUrl = `${api}${data.url}`;
      setImageUrl(fullImageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  
  const onClickRemoveImage = () => {
    setImageUrl("");
  };
  
  const onChange = useCallback((value) => {
    setText(value);
  }, []);
  
  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000
      }
    }),
    []
  );
  
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = { title, text, tags: tags ? tags.split(",") : [], imageUrl };
      
      const { data } = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post("/posts", fields);
      
      navigate(`/posts/${data._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (!id) return;
    axios.get(`/posts/${id}`).then(res => {
        setTitle(res.data.title);
        setText(res.data.text);
        setTags(res.data.tags.join(","));
        setImageUrl(res.data.imageUrl);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  
  if (isLoading) {
    return <Paper style={{ padding: 30 }} isLoading={isLoading} />
  }
  
  return (
    <Paper style={{ padding: 30 }}>
      {!!isAuth &&
        (<div>
          <Button disabled={!isAuth} variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
            Загрузить превью
          </Button>
          <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
          {imageUrl && (
            <Button disabled={!isAuth} variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
          )}
        </div>)
      }
          {imageUrl && (<img className={styles.image} src={imageUrl} alt="Uploaded" />)}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(event) => setTags(event.target.value)}
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button disabled={!isAuth} size="large" variant="contained" onClick={handleSubmit}>
          {isEditing ? "Обновить" : "Опубликовать"}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
