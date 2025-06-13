import React, { useEffect, useState } from 'react';
import CenterLayout from '../components/CenterLayout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchStudentInfo } from '../api/mypage';
import pigGif from '../assets/piggy.gif'


const MyPage = () => {
  const { sId, logout } = useAuth();
  const [student, setStudent] = useState<{name: String, sid: String, snum : number} | null>(null);
  const navigate = useNavigate();

   useEffect(() => {
    if (!sId) return;
    fetchStudentInfo(sId)
      .then(setStudent)
      .catch(() => {
        alert('사용자 정보를 불러오는 데 실패했습니다.');
      });
  }, [sId]);

  console.log('불러온 사용자 정보:', student);

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  if (!student) {
    return <CenterLayout>로딩 중...</CenterLayout>;
  }


  return (
    <CenterLayout>
      <div style={{textAlign: 'left'}}>
          <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',   // 배경 투명
            border: 'none',              // 테두리 없음
            fontSize: '30px',            // 화살표 크기 조절
            cursor: 'pointer',
            marginLeft: '25px',
            }}
          aria-label="뒤로가기"
          >
          ⬅️
        </button>
        </div>
      <div style={styles.container}>
        
        
        <h2 style={styles.title}>내 정보</h2>
        <img src={pigGif} alt="귀여운 돼지" style={styles.gif} />

        <div style={styles.infoBox}><strong>학번:</strong> {student.snum}</div>
        <div style={styles.infoBox}><strong>아이디:</strong> {student.sid}</div>
        <div style={styles.infoBox}><strong>이름:</strong> {student.name}</div>


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
    marginBottom: '40px',
    fontSize: '24px',
  },
  infoBox: {
    width: '80%',
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
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  gif: {
    width: '140px',
    height: '140px',
    display: 'block',
    margin: '0 auto 24px auto',
    marginBottom: '50px',
  },
};

export default MyPage;
