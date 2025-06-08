// src/pages/CategoryPage.tsx
import React, { useEffect, useState } from 'react';
import CenterLayout from '../components/CenterLayout';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Spending {
  id: number;
  categoryName: string;
  amount: number;
  spendDate: string;
}

const CategoryPage = () => {
  const { studentNum } = useAuth();
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
  if (!studentNum) return;

  // API 미연결 상태에서는 주석 처리하고 아래 mock data로 테스트
  // axios
  //   .get(`/spend/student/${studentNum}`)
  //   .then((res) => setSpendings(res.data as Spending[]))
  //   .catch(() => setError('소비 내역을 불러오는 데 실패했습니다.'));

  // 테스트용 더미 데이터 삽입
  const dummyData: Spending[] = [
    { id: 1, categoryName: '식비', amount: 12000, spendDate: '2025-06-05' },
    { id: 2, categoryName: '교통', amount: 3500, spendDate: '2025-06-06' },
    { id: 3, categoryName: '문화', amount: 15000, spendDate: '2025-06-07' },
  ];
  setSpendings(dummyData);
}, [studentNum]);

  return (
    <CenterLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>카테고리별 소비 내역</h2>
        {error && <p style={styles.error}>{error}</p>}

        {spendings.length === 0 ? (
          <p style={styles.subtitle}>아직 소비 내역이 없습니다.</p>
        ) : (
          <ul style={styles.list}>
            {spendings.map((item) => (
              <li key={item.id} style={styles.listItem}>
                <span style={styles.category}>{item.categoryName}</span>
                <span style={styles.amount}>{item.amount}원</span>
                <span style={styles.date}>{item.spendDate}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CenterLayout>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  subtitle: {
    color: '#555',
    fontSize: '14px',
  },
  error: {
    color: 'red',
    marginBottom: '12px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px',
    borderBottom: '1px solid #eee',
    fontSize: '15px',
  },
  category: {
    flex: 1,
    textAlign: 'left',
  },
  amount: {
    flex: 1,
    textAlign: 'center',
    color: '#FF69B4',
  },
  date: {
    flex: 1,
    textAlign: 'right',
    fontSize: '13px',
    color: '#999',
  },
};

export default CategoryPage;
