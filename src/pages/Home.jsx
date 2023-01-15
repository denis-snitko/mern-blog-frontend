import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components";
import { TagsBlock } from "../components";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../redux/slices/auth";
import { Typography } from "@mui/material";

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(userData);
  const { posts, tags } = useSelector((state) => state.posts);
  
  const sortedPosts = [...posts.items].sort((a, b) => (b.viewsCount) - (a.viewsCount));
  
  const isPostLoading = posts.status === "loading";
  
  const [tab, setTab] = useState(0);
  const handleChangeTabs = (event, newValue) => {
    setTab(newValue);
  };
  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (children)}
      </div>
    );
  };
  
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);
  
  if (isPostLoading) {
    return [...Array(5)].map(((item, index) =>
      <Post key={index} isLoading={isPostLoading} />));
  }
  
  if (posts.items.length === 0) {
    return <Typography variant="h4">Статей нет</Typography>;
  }
  
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tab} onChange={handleChangeTabs}>
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={12} md={8} item>
          <TabPanel value={tab} index={0}>
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
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {sortedPosts.map((post) =>
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
          </TabPanel>
        </Grid>
        <Grid xs={12} md={4} item>
          <TagsBlock items={tags.items} />
        </Grid>
      </Grid>
    </>
  );
};
