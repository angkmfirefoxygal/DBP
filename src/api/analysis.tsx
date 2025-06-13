// api/analysis.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // 필요에 따라 수정

// 최대 지출 카테고리 타입
export interface MaxCategory {
  categoryName: string;
  totalAmount: number;
}

// 예산 초과 카테고리 타입
export interface ExceedCategory {
  categoryName: string;
  used: number;
  limit: number;
}

// 5.2 최대 지출 카테고리 조회
export const fetchMaxCategory = async (sNum: number): Promise<MaxCategory | null> => {
  try {
    const response = await axios.get<MaxCategory>(`${BASE_URL}/category/max/${sNum}`);
    return response.data;
  } catch (error) {
    console.error('최대 지출 카테고리 조회 실패:', error);
    return null;
  }
};

// 5.3 예산 초과 카테고리 리스트 조회
export const fetchExceedCategories = async (sNum: number): Promise<ExceedCategory[]> => {
  try {
    const response = await axios.get<ExceedCategory[]>(`${BASE_URL}/category/exceed?sNum=${sNum}`);
    return response.data;
  } catch (error) {
    console.error('예산 초과 카테고리 조회 실패:', error);
    return [];
  }
};
