// src/pages/SpendPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const SpendPage = () => {
  const { studentNum } = useAuth();

  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentNum) {
      setMessage('로그인이 필요합니다.');
      return;
    }

    try {
      await axios.post('/spend/add', {
        s_num: studentNum,
        category_id: Number(categoryId),
        amount: Number(amount),
      });
      setMessage('지출이 성공적으로 추가되었습니다!');
    } catch (error) {
      setMessage('지출 추가에 실패했습니다.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>지출 내역 추가</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>카테고리 ID:</label>
          <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </div>
        <div>
          <label>금액:</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">추가</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SpendPage;
