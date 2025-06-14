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
import {
  fetchMaxCategory,
  fetchExceedCategories,
  fetchCategoryMonthlySpending
} from '../api/analysis';
import type {
  MaxCategory,
  ExceedCategory,
  CategoryMonthlySpending
} from '../api/analysis';
import { CATEGORY_OPTIONS } from '../constants/categories';

const CategoryPage: React.FC = () => {
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { sNum } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState(CATEGORY_OPTIONS[0]);
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isAnalysisMode, setIsAnalysisMode] = useState(false);
  const [maxCategory, setMaxCategory] = useState<MaxCategory | null>(null);
  const [exceedCategories, setExceedCategories] = useState<ExceedCategory[]>([]);
  const [monthlySpending, setMonthlySpending] = useState<CategoryMonthlySpending[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState<string>('');

  const navigate = useNavigate();

  const loadSpendings = async () => {
    if (!sNum) throw new Error('학생 번호 없음');
    const data = await fetchSpendings(sNum);
    setSpendings(data);
  };

  useEffect(() => {
    if (!sNum) return;
    const loadMaxCategory = async () => {
      try {
        const res = await fetchMaxCategory(sNum);
        setMaxCategory(res);
      } catch (err) {
        console.error("\u274C [프론트] 최대 지출 카테고리 오류:", err);
      }
    };
    loadSpendings();
    loadMaxCategory();
  }, [sNum]);

  useEffect(() => {
    if (isAnalysisMode && sNum) {
      fetchMaxCategory(sNum).then(setMaxCategory);
      fetchExceedCategories(sNum).then(setExceedCategories).catch(console.error);
      fetchCategoryMonthlySpending(sNum).then(setMonthlySpending).catch(console.error);
    }
  }, [isAnalysisMode, sNum]);

  const uniqueCategories = ['전체', ...Array.from(new Set(spendings.map(item => item.categoryName)))];
  const filteredSpendings = selectedCategory === '전체' ? spendings : spendings.filter(item => item.categoryName === selectedCategory);

  const handleEditClick = (item: Spending) => {
    setEditingId(item.id);
    setEditAmount(item.amount.toString());
  };

  const handleEditSave = async (id: number) => {
    if (editAmount.trim() === '' || isNaN(Number(editAmount))) return;

    const spending = spendings.find(s => s.id === id);
    if (!spending) {
      setError('수정 대상이 존재하지 않습니다.');
      return;
    }

    try {
      await updateSpending(id, {
        amount: Number(editAmount),
        spendDate: spending.spendDate,
        categoryName: spending.categoryName,
      });
      await loadSpendings();
      setEditingId(null);
      setEditAmount('');
    } catch (err) {
      console.error('❌ 수정 실패:', err);
      setError('수정 중 문제가 발생했습니다.');
    }
  };


  const handleEditCancel = () => {
    setEditingId(null);
    setEditAmount('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await deleteSpending(id);
    await loadSpendings();
  };

  const handleSaveNewSpending = async () => {
    if (!sNum) return;
    await createSpending({
      categoryName: newCategory,
      amount: Number(newAmount),
      spendDate: newDate,
      snum: sNum,
    });
    await loadSpendings();
    setIsAdding(false);
    setNewAmount('');
  };

  return (
    <CenterLayout>
      <div style={{ textAlign: 'left' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'transparent', border: 'none', fontSize: '30px', cursor: 'pointer', marginLeft: '-10px' }}
          aria-label="뒤로가기"
        >⬅️</button>
      </div>

      <div style={styles.container}>
        <h2 style={styles.title}>소비 내역 조회 및 분석</h2>
        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.btnAnlsys} onClick={() => setIsAnalysisMode(!isAnalysisMode)}>
          {isAnalysisMode ? '← 소비 내역으로' : '소비 내역 분석'}
        </button>

        {isAnalysisMode ? (
          <>
            <p style={styles.subtitle}>최대 지출 카테고리</p>
            {maxCategory ? (
              <p>{maxCategory.categoryName} : {maxCategory.totalSpending.toLocaleString()}원</p>
            ) : <p>데이터가 없습니다.</p>}

            <p style={{ ...styles.subtitle, marginTop: '12px' }}>카테고리별 월 지출 내역</p>
            {monthlySpending.length > 0 ? (
              <ul style={styles.list}>
                {monthlySpending.map((item, idx) => (
                  <li key={idx} style={styles.listItem}>
                    <span style={styles.category}>{item.categoryName}</span>
                    <span style={styles.date}>{item.spendMonth}</span>
                    <span style={styles.amount}>{item.spending.toLocaleString()}원</span>
                  </li>
                ))}
              </ul>
            ) : <p>월별 지출 내역이 없습니다.</p>}

            <p style={{ ...styles.subtitle, marginTop: '12px' }}>예산 초과 카테고리</p>
            {exceedCategories.length > 0 ? (
              <ul style={styles.list}>
                {exceedCategories.map((item, idx) => (
                  <li key={idx} style={styles.listItem}>
                    <span style={styles.category}>{item.categoryName}</span>
                    <span style={styles.amount}>{item.totalSpent.toLocaleString()}원 / 한도 {item.limitAmount.toLocaleString()}원</span>
                  </li>
                ))}
              </ul>
            ) : <p>예산을 초과한 카테고리가 없습니다.</p>}
          </>
        ) : filteredSpendings.length === 0 ? (
          <>
            <p style={styles.subtitle}>해당 카테고리의 소비 내역이 없습니다.</p>
            <button style={styles.btnAdd} onClick={() => setIsAdding(true)}>+</button>
          </>
        ) : (
          <>
            <ul style={{ maxHeight: '300px', overflowY: 'auto', ...styles.list }}>
              {filteredSpendings.map((item) => (
                <li key={item.id} style={styles.listItem}>
                  <span style={styles.category}>{item.categoryName}</span>
                  {editingId === item.id ? (
                    <>
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        placeholder="금액 입력"
                        style={{
                          padding: '6px 8px',
                          borderRadius: '8px',
                          border: '1px solid #ccc',
                          fontSize: '13px',
                          width: '90px',
                          marginRight: '6px',
                        }}
                      />
                      <button
                        style={{
                          ...styles.btnEdit,
                          backgroundColor: '#64b5f6',
                          fontWeight: 'bold',
                          padding: '4px 10px',
                        }}
                        onClick={() => handleEditSave(item.id)}
                      >
                        저장
                      </button>
                      <button
                        style={{
                          ...styles.btnDelete,
                          backgroundColor: '#ef9a9a',
                          fontWeight: 'bold',
                          padding: '4px 10px',
                        }}
                        onClick={handleEditCancel}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={styles.amount}>{item.amount.toLocaleString()}원</span>
                      <span style={styles.date}>{item.spendDate}</span>
                      <button style={styles.btnEdit} onClick={() => handleEditClick(item)}>수정</button>
                      <button style={styles.btnDelete} onClick={() => handleDelete(item.id)}>삭제</button>
                    </>
                  )}

                </li>
              ))}
            </ul>
            <button style={styles.btnAdd} onClick={() => setIsAdding(true)}>+</button>
          </>
        )}

        {isAdding && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              backgroundColor: '#fafafa',
            }}
          >
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ width: '80px' }}>카테고리</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                }}
              >
                {CATEGORY_OPTIONS.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ width: '80px' }}>금액</label>
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="0"
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ width: '80px' }}>날짜</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                style={{
                  ...styles.btnAdd,
                  padding: '6px 16px',
                  backgroundColor: '#81c784',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
                onClick={handleSaveNewSpending}
              >
                저장
              </button>
              <button
                style={{
                  ...styles.btnAdd,
                  padding: '6px 16px',
                  backgroundColor: '#e57373',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
                onClick={() => setIsAdding(false)}
              >
                취소
              </button>
            </div>
          </div>

        )}
      </div>
    </CenterLayout>
  );
};

export default CategoryPage;

const styles = {
  container: { padding: '10px' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' },
  error: { color: 'red' },
  subtitle: { fontSize: '16px', fontWeight: 'bold' },
  list: { listStyle: 'none', padding: 0 },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    alignItems: 'center',
  },
  category: {
    flex: 1,
    paddingRight: '8px',
    fontSize: '13px',
  },
  amount: { flex: 2, textAlign: 'right' as const },
  date: { flex: 2, textAlign: 'right' as const },
  btnEdit: {
    backgroundColor: '#90caf9',
    marginLeft: '10px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    borderRadius: '15px',
    border: 'none',
  },
  btnDelete: {
    backgroundColor: '#f28b82',
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
};