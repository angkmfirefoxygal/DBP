import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchSpendings,
  createSpending,
  updateSpending,
  deleteSpending,
} from '../api/spend';

import type { Spending } from '../api/spend';
import { useAuth } from '../contexts/AuthContext';
import CenterLayout from '../components/CenterLayout';
import { fetchMaxCategory, fetchExceedCategories } from '../api/analysis';
import type { MaxCategory, ExceedCategory } from '../api/analysis';




const styles = {
  container: { padding: '10px' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' },
  error: { color: 'red' },
  subtitle: { fontSize: '16px' },
  list: { listStyle: 'none', padding: 0 },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    alignItems: 'center',
  },
  category: {
    flex: 0.97,
    paddingRight: '2px',
    fontSize: '13px',
  },
  amount: { flex: 5, textAlign: 'right' as const },
  date: { flex: 4, textAlign: 'right' as const },
  btn: {
    marginLeft: '6px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '15px',
    border: 'none',
  },
  btnEdit: {
    backgroundColor: '#90caf9', // 연파랑
    marginLeft: '10px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '15px',
    border: 'none',
  },
  btnDelete: {
    backgroundColor: '#f28b82', // 연빨강
    marginLeft: '10px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '15px',
    border: 'none',
  },
  btnAdd: {
    backgroundColor: '#ccc', 
    marginLeft: '0px',
    marginTop: '15px',
    padding: '5px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '30px',
    border: 'none',
  },
  btnAnlsys: {
    backgroundColor: '#ccc', 
    marginLeft: '-5px',
    marginTop: '5px',
    padding: '5px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '15px',
    border: 'none',
  },

  //tab container
  wrapper: {
    padding: '20px',
    textAlign: 'center',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  tabButton: {
    padding: '10px 18px',
    borderRadius: '20px',
    border: 'none',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
};


const CategoryPage: React.FC = () => {
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { sNum } = useAuth();



  const loadSpendings = async () => {
   
      if (!sNum) throw new Error('학생 번호 없음');
      const data = await fetchSpendings(sNum);
      setSpendings(data);
    };

  useEffect(() => {
    loadSpendings();
  }, [sNum]);


  // 필터 핸들러
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const uniqueCategories = ['전체', ...Array.from(new Set(spendings.map(item => item.categoryName)))];
  const filteredSpendings = selectedCategory === '전체'
    ? spendings
    : spendings.filter(item => item.categoryName === selectedCategory);

  

  // 🟢 추가 핸들러
  const handleAdd = async () => {
    if (!sNum) return;
    const newSpending = {
      categoryName: prompt('카테고리명 입력') || '기타',
      amount: Number(prompt('금액 입력') || 0),
      spendDate: prompt('날짜 입력 (YYYY-MM-DD)', new Date().toISOString().slice(0, 10)) || '',
      snum: sNum,
    };
    await createSpending(newSpending);
    await loadSpendings();
  };

  // 🟡 수정 핸들러
  const handleEdit = async (item: Spending) => {
    const amount = Number(prompt('새 금액 입력', String(item.amount)));
    if (!amount) return;
    await updateSpending(item.id, { amount });
    await loadSpendings();
  };

  // 🔴 삭제 핸들러
  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    await deleteSpending(id);
    await loadSpendings();
  };

  const navigate = useNavigate();

  const [isAnalysisMode, setIsAnalysisMode] = useState(false);
  const [maxCategory, setMaxCategory] = useState<MaxCategory | null>(null);
  const [exceedCategories, setExceedCategories] = useState<ExceedCategory[]>([]);

  useEffect(() => {
    if (isAnalysisMode && sNum) {
      fetchMaxCategory(sNum).then(setMaxCategory);
      fetchExceedCategories(sNum).then(setExceedCategories);
    }
  }, [isAnalysisMode, sNum]);

    


  return (
  <CenterLayout>
    {/* 뒤로가기 버튼 */}
    <div style={{ textAlign: 'left' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '30px',
          cursor: 'pointer',
          marginLeft: '-10px',
        }}
        aria-label="뒤로가기"
      >
        ⬅️
      </button>
    </div>

    <div style={styles.container}>
      <h2 style={styles.title}>소비 내역 조회</h2>

      {error && <p style={styles.error}>{error}</p>}

      
      

      

      <button
        style={styles.btnAnlsys}
        onClick={() => setIsAnalysisMode(!isAnalysisMode)}
      >
        {isAnalysisMode ? '← 소비 내역으로' : '소비 내역 분석'}
      </button>

      {/* 🔁 이 부분만 토글 */}
      {isAnalysisMode ? (
        <div>
          <p style={styles.subtitle}>최대 지출 카테고리:</p>
          {maxCategory ? (
            <p>
              {maxCategory.categoryName} -{' '}
              {maxCategory.totalAmount.toLocaleString()}원
            </p>
          ) : (
            <p>데이터가 없습니다.</p>
          )}

          <p style={{ ...styles.subtitle, marginTop: '12px' }}>
            예산 초과 카테고리:
          </p>
          {exceedCategories.length > 0 ? (
            <ul style={styles.list}>
              {exceedCategories.map((item, idx) => (
                <li key={idx} style={styles.listItem}>
                  <span style={styles.category}>{item.categoryName}</span>
                  <span style={styles.amount}>
                    {item.used.toLocaleString()}원 사용 / 한도{' '}
                    {item.limit.toLocaleString()}원
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>예산을 초과한 카테고리가 없습니다.</p>
          )}
        </div>
      ) : filteredSpendings.length === 0 ? (
        <p style={styles.subtitle}>해당 카테고리의 소비 내역이 없습니다.</p>
      ) : (
        <ul
          style={{
            maxHeight: '300px',
            
            ...styles.list,
          }}
        > 

          <div style={{ marginBottom: '16px' }}>
        <label htmlFor="categoryFilter">카테고리 선택: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '5px 25px 5px 10px',
            marginLeft: '5px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            fontSize: '13px',
            backgroundColor: '#f9f9f9',
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg fill=\'%23777\' height=\'14\' viewBox=\'0 0 24 24\' width=\'14\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '14px',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
          }}
        >
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
          
          {filteredSpendings.map((item) => (
            <li key={item.id} style={styles.listItem}>
              <span style={styles.category}>{item.categoryName}</span>
              <span style={styles.amount}>
                {item.amount.toLocaleString()}원
              </span>
              <span style={styles.date}>{item.spendDate}</span>
              <button
                style={styles.btnEdit}
                onClick={() => handleEdit(item)}
              >
                수정
              </button>
              <button
                style={styles.btnDelete}
                onClick={() => handleDelete(item.id)}
              >
                삭제
              </button>
            </li>
          ))}

          {/* 버튼 */}
          <button style={styles.btnAdd} onClick={handleAdd}>
            +
          </button>
           
        </ul>
        
        
      )}
    </div>
  </CenterLayout>
);




};

export default CategoryPage;

