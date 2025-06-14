// src/api/analysis.ts
import axios from 'axios';

export interface MaxCategory {
  categoryName: string;
  totalSpending: number;
}

export interface ExceedCategory {
  categoryName: string;
  used: number;
  limit: number;
}

export const fetchMaxCategory = async (sNum: number): Promise<MaxCategory | null> => {
  try {
    const response = await axios.get<MaxCategory>(`/category/max/${sNum}`); // ✅ 상대경로
    return response.data;
  } catch (error) {
    console.error('⚠️ 최대 지출 카테고리 조회 실패:', error);
    return null;
  }
};

export const fetchExceedCategories = async (sNum: number): Promise<ExceedCategory[]> => {
  try {
    const response = await axios.get<ExceedCategory[]>('/category/exceed', {
      params: { sNum }, // ✅ 쿼리 파라미터 방식
    });
    return response.data;
  } catch (error) {
    console.error('⚠️ 예산 초과 카테고리 조회 실패:', error);
    return [];
  }
};

