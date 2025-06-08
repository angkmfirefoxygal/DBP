// src/pages/SignupPage.tsx
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import React, { useState } from 'react';
import CenterLayout from '../components/CenterLayout';

const SignupPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [studentNum, setStudentNum] = useState('');
  const [limit, setLimit] = useState('');

  const navigate = useNavigate(); // ✅ 선언

  const handleSignup = () => {
    // 여기서 실제 API 요청이 들어갈 수 있음
    alert('회원가입에 성공했습니다!');
    navigate('/'); // ✅ 메인 페이지로 이동
  };

  return (
    <CenterLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>회원가입</h2>
        <p style={styles.subtitle}>회원 정보를 입력해주세요</p>
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
        <input
          placeholder="소비 한도"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleSignup}>회원가입</button>
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
    maxWidth: '320px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '8px',
    fontSize: '24px',
  },
  subtitle: {
    marginBottom: '24px',
    color: '#555',
    fontSize: '14px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#FF69B4', // 핑크 버튼
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default SignupPage;
