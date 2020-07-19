import {NextApiHandler} from 'next';
import {withSession} from '../../../../lib/withSession';
import {getDatabaseConnection} from '../../../../lib/getDatabaseConnection';


const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'PATCH') {
    const connection = await getDatabaseConnection();
    const {title, content, id} = req.body;
    const post = await connection.manager.findOne<Post>('Post', id);
    post.title = title;
    post.content = content;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    await connection.manager.save(post);
    res.json(post);
  } else if (req.method === 'DELETE') {
    const id = req.query.id.toString();
    const connection = await getDatabaseConnection();
    const result = await connection.manager.delete('Post', id);
    res.statusCode = result.affected >= 0 ? 200 : 400;
    res.end();
  }

});
export default Posts;
