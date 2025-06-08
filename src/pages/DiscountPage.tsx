import React, { useEffect, useState } from 'react';
import CenterLayout from '../components/CenterLayout';
// import axios from 'axios'; // 나중에 연결 시 사용

interface Discount {
  categoryName: string;
  discountName: string;
  description: string;
}

const DiscountPage = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // ❌ API 미사용, 하드코딩 데이터
    const dummyData: Discount[] = [
      {
        categoryName: '식비',
        discountName: '학생 전용 식당 할인',
        description: '학생증 제시 시 3000원 페이백',
      },
      {
        categoryName: '교통비',
        discountName: '청소년 교통카드 할인',
        description: '지하철 요금 할인',
      },
    ];
    setDiscounts(dummyData);
  }, []);

  return (
    <CenterLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>할인 정보</h2>
        {error && <p style={styles.error}>{error}</p>}

        {discounts.length === 0 ? (
          <p style={styles.subtitle}>현재 등록된 할인 정보가 없습니다.</p>
        ) : (
          <ul style={styles.list}>
            {discounts.map((item, index) => (
              <li key={index} style={styles.listItem}>
                <div style={styles.category}>{item.categoryName}</div>
                <div style={styles.name}>{item.discountName}</div>
                <div style={styles.description}>{item.description}</div>
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
    maxWidth: '500px',
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
    padding: '12px',
    borderBottom: '1px solid #eee',
    fontSize: '15px',
    textAlign: 'left',
  },
  category: {
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  name: {
    color: '#FF69B4',
    marginBottom: '2px',
  },
  description: {
    color: '#666',
    fontSize: '14px',
  },
};

export default DiscountPage;
