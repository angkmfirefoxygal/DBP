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

// 사용자 정보 수정 (name, password, sId 가능)
export const fixStudentInfo = async (
  currentSId: string,
  data: { sId?: string; name?: string; password?: string }
) => {
  const response = await axios.patch(`/auth/${currentSId}`, data);
  return response.data;
};
