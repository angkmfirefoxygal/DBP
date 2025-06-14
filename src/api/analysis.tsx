import axios from 'axios';

export interface MaxCategory {
  categoryName: string;
  totalSpending: number;
}

export interface ExceedCategory {
  categoryName: string;
  limitAmount: number;
  totalSpent: number;
}

export interface CategoryMonthlySpending {
  categoryName: string;
  spendMonth: string; // e.g., "2025-06" or "N/A"
  spending: number;
}

// ✅ 최대 카테고리 조회
export const fetchMaxCategory = async (sNum: number): Promise<MaxCategory | null> => {
  try {
    const response = await axios.get(`/category/max/${sNum}`);
    return response.data;
  } catch (error) {
    console.error('⚠️ 최대 지출 카테고리 조회 실패:', error);
    return null;
  }
};

// ✅ 예산 초과 카테고리 조회
export const fetchExceedCategories = async (sNum: number): Promise<ExceedCategory[]> => {
  try {
    const response = await axios.get('/category/exceed', {
      params: { sNum },
    });
    return response.data;
  } catch (error) {
    console.error('⚠️ 예산 초과 카테고리 조회 실패:', error);
    return [];
  }
};

// ✅ 전체 카테고리 월별 지출 정보 조회 (/category/{sNum})
export const fetchCategoryMonthlySpending = async (sNum: number): Promise<CategoryMonthlySpending[]> => {
  try {
    const response = await axios.get(`/category/${sNum}`);
    return response.data;
  } catch (error) {
    console.error('⚠️ 카테고리 월별 지출 조회 실패:', error);
    return [];
  }
};
