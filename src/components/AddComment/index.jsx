import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { fetchComments } from '../../redux/slices/comments';
import { userData } from "../../redux/slices/auth";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector} from 'react-redux';
import styles from './AddComment.module.scss';

export const AddComment = () => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { avatarUrl } = useSelector(userData);
  const { id } = useParams();

  const submitCommentHandler = async () => {
    await axios.post('/comments', {
      postId: id,
      text: comment,
    });

    setComment('');
    dispatch(fetchComments({ id }));
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
        <div className={styles.form}>
          <TextField
            label='Написать комментарий'
            variant='outlined'
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button disabled={comment.length < 5} onClick={submitCommentHandler} variant='contained'>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
