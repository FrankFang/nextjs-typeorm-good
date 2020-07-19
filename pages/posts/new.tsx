import {NextPage} from 'next';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';

const PostsNew: NextPage = () => {
  const {form} = useForm({
    initFormData: {title: '', content: ''},
    fields: [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'},
    ],
    buttons: <button type="submit">提交</button>,
    submit: {
      request: formData => axios.post(`/api/v1/posts`, formData),
      success: () => {
        window.alert('提交成功');
        window.location.href = '/posts';
      }
    }
  });
  return (
    <div className="postsNew">
      <div className="form-wrapper">
        {form}
      </div>
      <style jsx global>{`
      .form-wrapper{
        padding: 16px;
      }
      .postsNew .field-content textarea{
        height: 20em; 
        resize: none;
      }
      `}</style>
    </div>
  );
};

export default PostsNew;
