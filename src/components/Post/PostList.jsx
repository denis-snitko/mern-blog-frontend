import { Post } from './';

const { REACT_APP_API } = process.env;

export const PostList = ({posts , user}) => {
  return (
    posts.map((post) =>
      <Post
        key={post._id}
        _id={post._id}
        title={post.title}
        imageUrl={post.imageUrl && `${REACT_APP_API}${post.imageUrl}`}
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
    )
  )
}
