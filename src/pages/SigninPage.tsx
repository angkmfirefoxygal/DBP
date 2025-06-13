// src/pages/SigninPage.tsx
import React, { useState } from 'react';
import CenterLayout from '../components/CenterLayout';
import { login as loginApi } from '../api/login.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const SigninPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
  const data = await loginApi(id, password);
  if (data.status === 'success') {
    login(id, data.snum);
    navigate('/');
  } else {
    alert(data.message);
  }
};

  return (
    <CenterLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>로그인</h2>
        <p style={styles.subtitle}>아이디와 비밀번호를 입력하세요</p>
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
        <button style={styles.button} onClick={handleLogin}>로그인</button>

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
    backgroundColor: '#FF69B4', // 연한 파랑
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default SigninPage;
