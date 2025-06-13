import axios from 'axios';

export const login = async (sId: string, password: string) => {
  const response = await axios.post(
    '/auth/login',
    { sId, password },
    {
      headers: {
        'Content-Type': 'application/json', // ✅ 이거 꼭 추가!!
      },
    }
  );
  return response.data as { status: string; message: string, snum: number };
};
