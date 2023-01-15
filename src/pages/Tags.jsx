import { useEffect } from "react";
import Grid from "@mui/material/Grid";

import { Post } from "../components";
import { fetchFilteredPosts } from "../redux/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../redux/slices/auth";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const Tags = () => {
  const dispatch = useDispatch();
  const user = useSelector(userData);
  
  const { posts } = useSelector((state) => state.posts);
  
  const { tag } = useParams();
  
  const isPostLoading = posts.status === "loading";
  
  useEffect(() => {
    dispatch(fetchFilteredPosts(tag));
  }, [tag, dispatch]);
  
  if (isPostLoading) {
    return [...Array(5)].map(((item, index) =>
      <Post key={index} isLoading={isPostLoading} />));
  }
  
  if (posts.items.length === 0) {
    return <Typography variant="h4" component="div">Нет статей по тэгу
      <Typography variant="h4" component={"span"}
        fontWeight={700}>&#171;{tag}&#187;</Typography>
    </Typography>;
  }
  
  return (
    <>
      <Typography variant="h4" component="div" mb={4}>
        Результаты поиска по тэгу <Typography variant="h4" component={"span"}
        fontWeight={700}>&#171;{tag}&#187;</Typography>
      </Typography>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {posts.items.map((post) =>
            <Post
              key={post._id}
              _id={post._id}
              title={post.title}
              imageUrl={post.imageUrl}
              author={{
                _id: post.author._id,
                avatarUrl: post.author.avatarUrl,
                fullName: post.author.fullName
              }}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount}
              tags={post.tags}
              isEditable={user?._id === post.author._id}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
