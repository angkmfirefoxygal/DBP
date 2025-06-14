import axios from 'axios';

interface RegisterRequest {
  sNum: number;
  name: string;
  sId: string;
  password: string;
  categoryBudgets?: {
    categoryName: string;
    limitAmount: number;
  }[];
}

export const signup = async (body: RegisterRequest) => {
  try {
    const response = await axios.post('/auth/register', body);
    const data = response.data as { status: string; message: string };

    if (data.status === 'success') {
      alert('회원가입 성공! 로그인 해주세요.');
      return true;
    } else {
      alert(`회원가입 실패: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.error('회원가입 에러:', error);
    alert('서버 오류로 회원가입에 실패했습니다 (학번 중복)');
    return false;
  }
};
