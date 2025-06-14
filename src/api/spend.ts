import axios from 'axios';

export interface Spending {
  id: number;
  categoryName: string;
  amount: number;
  spendDate: string;
  snum: number;
}

// 소비 내역 조회 
export const fetchSpendings = async (sNum: number): Promise<Spending[]> => {
  const res = await axios.get<Spending[]>(`/spend/student/${sNum}`);
  console.log(res.data)
  return res.data;
};

// 2. 소비 내역 추가
export const createSpending = async (data: Omit<Spending, 'id'>) => {
  const res = await axios.post('/spend/add', data);
  return res.data;
};

// 3. 소비 내역 수정
export const updateSpending = async (
  id: number,
  data: { amount: number; spendDate: string; categoryName: string }
) => {
  const res = await axios.patch(`/spend/fix?id=${id}`, data);
  return res.data;
};

// 4. 소비 내역 삭제
export const deleteSpending = async (id: number) => {
  const res = await axios.delete(`/spend/del?id=${id}`);
  return res.data;
};
