// src/api/mypage.ts
import axios from 'axios';

export const fetchStudentInfo = async (sId: string) => {
  const response = await axios.get(`/auth/${sId}`);
  return response.data as {
    snum: number;
    sid: string;
    name: string;
  };
};
