import React, { useEffect, useState } from 'react';
import {
  fetchSpendings,
  createSpending,
  updateSpending,
  deleteSpending,
} from '../api/spend';

import type { Spending } from '../api/spend';
import { useAuth } from '../contexts/AuthContext';
import CenterLayout from '../components/CenterLayout';


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
    backgroundColor: '#ccc', // 핑크
    marginLeft: '0px',
    marginTop: '15px',
    padding: '4px 8px',
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

  return (
    <CenterLayout>
      <div>
        <h2 style={styles.title}>카테고리별 소비 내역</h2>
        
        {error && <p style={styles.error}>{error}</p>}

        {spendings.length === 0 ? (
          <p style={styles.subtitle}>아직 소비 내역이 없습니다.</p>
        ) : (
          <ul style={styles.list}>
            {spendings.map((item) => (
              <li key={item.id} style={styles.listItem}>
                <span style={styles.category}>{item.categoryName}</span>
                <span style={styles.amount}>{item.amount.toLocaleString()}원</span>
                <span style={styles.date}>{item.spendDate}</span>
                <button style={styles.btnEdit} onClick={() => handleEdit(item)}>수정</button>
                <button style={{ ...styles.btnDelete}} onClick={() => handleDelete(item.id)}>삭제</button>
              </li>

              
            ))}
            <button style={styles.btnAdd} onClick={handleAdd}>소비 내역 추가</button>
          </ul>
        )}
      </div>
    </CenterLayout>
  );
};

export default CategoryPage;

