import { useState } from 'react';
import { createAccountHandler } from './api/createAccountHandler';

export const CreateAccount = () => {
  const [account, setAccount] = useState({
    username: '',
    userId: '',
    password: '',
  });
  const [checkPassword, setCheckPassword] = useState('');

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setAccount((state) => {
      return {
        [name]: value,
        ...state,
      };
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <p>회원가입</p>
      <form
        className="flex justify-center h-96 items-center flex-col"
        onSubmit={() => createAccountHandler(account)}
      >
        <input
          type="text"
          name="username"
          placeholder="username"
          value={account.username}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="userId"
          placeholder="userId"
          value={account.userId}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={account.password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="checkPassword"
          placeholder="checkPassword"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        <input type="submit" value="Create Account!" />
      </form>
    </div>
  );
};
