import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import ReactMarkdown from "react-markdown";
import axios from "../axios";
import { useSelector } from "react-redux";
import { userData } from "../redux/slices/auth";

export const FullPost = () => {
  const [post, setPost] = useState(null);
  const user = useSelector(userData);
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  
  
  if (!post) return <Post isLoading={!post} />;
  
  return (
    <>
      <Post
        _id={post._id}
        title={post.title}
        imageUrl={post.imageUrl}
        author={{
          avatarUrl: post.author.avatarUrl,
          fullName: post.author.fullName
        }}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        tags={post.tags}
        isFullPost
        isEditable={user?._id === post?.author._id}
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg"
            },
            text: "Это тестовый комментарий 555555"
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg"
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top"
          }
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
