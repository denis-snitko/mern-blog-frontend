import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components';
import { TagsBlock } from '../components';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../redux/slices/auth';
import { Typography } from '@mui/material';
import { PostList } from '../components/Post/PostList';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = useSelector(userData);
  const { posts, tags } = useSelector((state) => state.posts);

  const [tab, setTab] = useState(0);

  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);

  const isPostLoading = posts.status === 'loading';

  const handleChangeTabs = (event, newValue) => {
    setTab(newValue);
    navigate(pathname === '/' ? 'popular' : '/');
  };

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && children}
      </div>
    );
  };

  useEffect(() => {
    if (pathname === '/') {
      dispatch(fetchPosts({url: '/posts', query: currentParams}));
      setTab(0);
    } else if (pathname === '/popular') {
      dispatch(fetchPosts({url: '/posts/popular', query: currentParams}));
      setTab(1);
    }
    dispatch(fetchTags());
  }, [searchParams, dispatch, pathname]);

  if (isPostLoading) {
    return [...Array(5)].map((item, index) => <Post key={index} isLoading={isPostLoading} />);
  }

  if (posts.data.length === 0) {
    return <Typography variant='h4'>Статей нет</Typography>;
  }

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tab} onChange={handleChangeTabs}>
        <Tab label='Новые' />
        <Tab label='Популярные' />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={12} md={8} item>
          <TabPanel value={tab} index={0}>
            <PostList posts={posts.data} user={user} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <PostList posts={posts.data} user={user} />
          </TabPanel>
        </Grid>
        <Grid xs={12} md={4} item>
          <TagsBlock items={tags.items} />
        </Grid>
      </Grid>
    </>
  );
};
