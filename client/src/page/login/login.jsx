import { useState } from 'react';
import { loginHandler } from './api/loginHandler';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [loginInf, setLoginInf] = useState({
    userId: '',
    password: '',
  });

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setLoginInf((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col  h-screen justify-center items-center">
      <p>로그인</p>
      <form
        className="flex h-96 justify-center items-center flex-col"
        onSubmit={() => loginHandler(loginInf)}
      >
        <input
          type="text"
          value={loginInf.userId}
          name="userId"
          onChange={(e) => onChange(e)}
          placeholder="userId"
        />
        <input
          type="password"
          value={loginInf.password}
          name="password"
          onChange={(e) => onChange(e)}
          placeholder="password"
        />
        <input type="submit" value="로그인" />
        <Link to="/create_account">회원가입하기</Link>
      </form>
    </div>
  );
};
