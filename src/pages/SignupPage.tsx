import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CenterLayout from '../components/CenterLayout';
import { CATEGORY_OPTIONS } from '../constants/categories';
import { signup } from '../api/signup'; // signup API 함수

const SignupPage = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [studentNum, setStudentNum] = useState('');
  const [categoryInputs, setCategoryInputs] = useState<
    { categoryName: string; limitAmount: string }[]
  >([]);

  const navigate = useNavigate();

  const handleAddCategory = () => {
    if (categoryInputs.length >= 7) {
      alert('최대 7개의 카테고리만 등록할 수 있습니다.');
      return;
    }
    setCategoryInputs([...categoryInputs, { categoryName: '', limitAmount: '' }]);
  };

  const handleCategoryChange = (index: number, key: 'categoryName' | 'limitAmount', value: string) => {
    const newInputs = [...categoryInputs];
    newInputs[index][key] = value;
    setCategoryInputs(newInputs);
  };

  const handleSignup = async () => {

    if (!studentNum.trim() || isNaN(Number(studentNum.trim()))) {
      alert("학번은 숫자로 정확히 입력해주세요.");
      return;
    }

    const categoryBudgets = categoryInputs
      .filter(i => i.categoryName && i.limitAmount)
      .map(i => ({
        categoryName: i.categoryName,
        limitAmount: Number(i.limitAmount) * 10000,
      }));

    const success = await signup({
      name,
      sId: id,
      password,
      sNum: Number(studentNum.trim()),
      categoryBudgets,
    });

    console.log("실제 넘기는 값:", Number(studentNum.trim())); // NaN이면 문제 확정

    if (success) {
      // alert('회원가입 성공!');
      navigate('/');
    } else {
    }
  };

  return (
    <CenterLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>회원가입</h2>

        <input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="학번"
          value={studentNum}
          onChange={(e) => setStudentNum(e.target.value)}
          style={styles.input}
        />

        <h4 style={{ marginTop: 20 }}>카테고리별 소비 한도 추가</h4>
        {categoryInputs.map((input, idx) => (
          <div key={idx} style={styles.categoryRow}>
            <select
              value={input.categoryName}
              onChange={(e) => handleCategoryChange(idx, 'categoryName', e.target.value)}
              style={styles.select}
            >
              <option value="">카테고리 선택</option>
              {CATEGORY_OPTIONS.filter(
                (cat) => !categoryInputs.some((ci, i) => ci.categoryName === cat && i !== idx)
              ).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="한도 (만원)"
              value={input.limitAmount}
              onChange={(e) => handleCategoryChange(idx, 'limitAmount', e.target.value)}
              style={styles.limitInput}
            />
          </div>
        ))}

        <button onClick={handleAddCategory} style={styles.addButton}>
          카테고리 추가
        </button>

        <button style={styles.button} onClick={handleSignup}>
          회원가입
        </button>
      </div>
    </CenterLayout>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '340px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '12px',
    fontSize: '24px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  categoryRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    width: '100%',
  },
  select: {
    flex: 'none',
    width: '140px', // ✅ 폭 줄임
    padding: '8px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc', // ✅ 회색 테두리
    boxSizing: 'border-box',
  },

  limitInput: {
    width: '160px',
    padding: '10px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  addButton: {
    padding: '8px',
    backgroundColor: '#ddd',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#FF69B4',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
  },
};

export default SignupPage;
