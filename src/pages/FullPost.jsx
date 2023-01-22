import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components';
import { AddComment } from '../components';
import { CommentsBlock } from '../components';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../redux/slices/auth';
import { fetchComments } from '../redux/slices/comments';

const { REACT_APP_API } = process.env;

export const FullPost = () => {
  const [post, setPost] = useState(null);
  const { comments } = useSelector((state) => state.comments);

  const dispatch = useDispatch();
  const user = useSelector(userData);
  const { id } = useParams();

  const isCommentsLoading = comments.status === "loading";

  const getOnePost = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      const { data } = await res.data;
      setPost(data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOnePost();
    dispatch(fetchComments({ id }));
  }, [dispatch, id]);

  if (!post) return <Post isLoading={!post} />;

  return (
    <>
      <Post
        _id={post._id}
        title={post.title}
        imageUrl={post.imageUrl && `${REACT_APP_API}${post.imageUrl}`}
        author={{
          avatarUrl: post.author.avatarUrl,
          fullName: post.author.fullName,
        }}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={post.commentsCount}
        tags={post.tags}
        isFullPost
        isEditable={user?._id === post?.author._id}>
        <ReactMarkdown children={post.text} />
      </Post>
      
      <CommentsBlock items={comments.items} isLoading={isCommentsLoading}>
        {user && <AddComment />}
      </CommentsBlock>
    </>
  );
};
