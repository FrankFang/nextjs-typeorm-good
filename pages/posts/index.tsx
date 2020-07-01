import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';

type Props = {
  posts: Post[]
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post =>
        <div>
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a>
              {post.title}
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();// 第一次链接能不能用 get
  const posts = await connection.manager.find(Post);
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
