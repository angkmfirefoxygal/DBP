import React from 'react';
import CenterLayout from '../components/CenterLayout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const dummyUserInfo = {
  loginId: 'user555',
  name: 'user555',
  email: 'user555@example.com',
};

const MyPage = () => {
  const { sId, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <CenterLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>내 정보</h2>

        <div style={styles.infoBox}>
          <strong>학번:</strong> {sId ?? '로그인 정보 없음'}
        </div>
        <div style={styles.infoBox}>
          <strong>아이디:</strong> {dummyUserInfo.loginId}
        </div>
        <div style={styles.infoBox}>
          <strong>이름:</strong> {dummyUserInfo.name}
        </div>
        <div style={styles.infoBox}>
          <strong>이메일:</strong> {dummyUserInfo.email}
        </div>
        

        <button style={styles.button} onClick={handleLogout}>
          로그아웃
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
    maxWidth: '360px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '16px',
    fontSize: '24px',
  },
  infoBox: {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '10px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#333',
    textAlign: 'left',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default MyPage;
