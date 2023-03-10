import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { deletePost } from '../../redux/slices/posts';
import { useDispatch } from 'react-redux';
import { formatDate } from '../../helpers/formatDate';

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  author,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = async (id) => {
    try {
      if (window.confirm('Вы действительно хотите удалить статью?')) {
        await axios.delete(`/posts/${id}`);
        dispatch(deletePost({ id }));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color='primary'>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => onClickRemove(_id)} color='secondary'>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img className={clsx(styles.image, { [styles.imageFull]: isFullPost })} src={imageUrl} alt={title} />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...author} additionalText={formatDate(createdAt)} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags !== '' &&
              tags.map((name) => (
                <li key={name}>
                  <Link to={`/tags/${name}`}>#{name}</Link>
                </li>
              ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
