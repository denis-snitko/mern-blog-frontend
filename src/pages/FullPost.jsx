import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import ReactMarkdown from "react-markdown";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => setData(res.data))
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  
  
  if (!data) return <Post isLoading={!data} />;
  
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        author={{
          avatarUrl: data.author.avatarUrl,
          fullName: data.author.fullName
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
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
