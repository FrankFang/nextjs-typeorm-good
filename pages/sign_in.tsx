import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {useCallback, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';

const SignIn: NextPage<{ user: User }> = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  });
  const [errors, setErrors] = useState({
    username: [], password: [], passwordConfirmation: []
  });
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post(`/api/v1/sessions`, formData)
      .then(() => {
        window.alert('登录成功');
      }, (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          }
        }
      });
  }, [formData]);
  return (
    <>
      {props.user &&
      <div>
        当前登录用户为 {props.user.username}
      </div>
      }
      <h1>登录</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>用户名
            <input type="text" value={formData.username}
              onChange={e => setFormData({
                ...formData,
                username: e.target.value
              })}/>
          </label>
          {errors.username?.length > 0 && <div>
            {errors.username.join(',')}
          </div>}
        </div>
        <div>
          <label>密码
            <input type="password" value={formData.password}
              onChange={e => setFormData({
                ...formData,
                password: e.target.value
              })}/>
          </label>
          {errors.password?.length > 0 && <div>
            {errors.password.join(',')}
          </div>}
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    };
  });
