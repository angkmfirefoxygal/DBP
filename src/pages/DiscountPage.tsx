import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CenterLayout from '../components/CenterLayout';
import { useAuth } from '../contexts/AuthContext'; // 경로 조정

interface Discount {
  categoryName: string;
  discountName: string;
  description: string;
}

const DiscountPage = () => {
  const { sNum } = useAuth(); // ✅ sNum 사용
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDiscounts = async () => {
      if (sNum === undefined) {
        setError('로그인이 필요합니다.');
        return;
      }

      try {
        const response = await axios.get<Discount[]>(`/sales/recommendation?studentId=${sNum}`);
        console.log('✅ API 응답 데이터:', response.data);
        if (Array.isArray(response.data)) {
          setDiscounts(response.data);
        } else {
          setError('서버 응답이 올바르지 않습니다.');
          console.warn('⚠️ 예상하지 못한 응답 구조:', response.data);
        }
      } catch (err) {
        console.error('❌ 할인 정보 불러오기 실패:', err);
        setError('할인 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchDiscounts();
  }, [sNum]);

  return (
    <CenterLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>할인 정보</h2>
        <p style={styles.subtitle}> 회원님의 소비내역 분석에 따른 맞춤 할인 정보입니다.  </p>
        {error && <p style={styles.error}>{error}</p>}

        {discounts.length === 0 && !error ? (
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
    marginTop: '50px',
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
