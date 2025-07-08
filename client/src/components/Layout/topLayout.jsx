import { Outlet } from 'react-router-dom';

export const TopLayout = () => {
  return (
    <div>
      <h1>이건 탑 레이아웃입니다.</h1>
      <Outlet />
    </div>
  );
};
