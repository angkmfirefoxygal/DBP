// src/pages/MyPage.tsx
import React, { useEffect, useState } from 'react';
import CenterLayout from '../components/CenterLayout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchStudentInfo, fixStudentInfo } from '../api/mypage';
import pigGif from '../assets/piggy.gif';

const MyPage = () => {
  const { sId, logout } = useAuth();
  const [student, setStudent] = useState<{ name: string; sid: string; snum: number } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newSId, setNewSId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!sId) return;
    fetchStudentInfo(sId)
      .then(data => {
        setStudent(data);
        setNewName(data.name);
        setNewSId(data.sid);
      })
      .catch(() => {
        alert('사용자 정보를 불러오는 데 실패했습니다.');
      });
  }, [sId]);

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  const handleEdit = async () => {
    if (!student) return;

    try {
      const payload: { name?: string; password?: string; sId?: string } = {};
      if (newName !== student.name) payload.name = newName;
      if (newPassword.trim()) payload.password = newPassword;
      if (newSId !== student.sid) payload.sId = newSId;

      const res = await fixStudentInfo(student.sid, payload);
      // alert(res.message || '정보가 수정되었습니다.');
      setEditMode(false);

      // 로그아웃 처리 if 아이디 바뀌었으면
      if (payload.sId && payload.sId !== sId) {
        alert('아이디가 변경되어 다시 로그인해야 합니다.');
        logout();
        navigate('/');
      } else {
        fetchStudentInfo(payload.sId || sId).then(setStudent);
      }

      setNewPassword('');
    } catch (error) {
      alert('수정에 실패했습니다.');
    }
  };

  if (!student) {
    return <CenterLayout>로딩 중...</CenterLayout>;
  }

  return (
    <CenterLayout>
      <div style={styles.backBtnWrapper}>
        <button onClick={() => navigate(-1)} style={styles.backBtn} aria-label="뒤로가기">⬅️</button>
      </div>

      <div style={styles.container}>
        <h2 style={styles.title}>내 정보</h2>
        <img src={pigGif} alt="귀여운 돼지" style={styles.gif} />

        <div style={styles.infoBox}><strong>학번:</strong> {student.snum}</div>

        {editMode ? (
          <>
            <div style={styles.inputBox}>
              <label>아이디</label>
              <input value={newSId} onChange={e => setNewSId(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.inputBox}>
              <label>이름</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.inputBox}>
              <label>새 비밀번호</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={styles.input} />
            </div>
            <button style={styles.saveButton} onClick={handleEdit}>저장하기</button>
            <button style={styles.cancelButton} onClick={() => setEditMode(false)}>취소</button>
          </>
        ) : (
          <>
            <div style={styles.infoBox}><strong>아이디:</strong> {student.sid}</div>
            <div style={styles.infoBox}><strong>이름:</strong> {student.name}</div>
            <button style={styles.editButton} onClick={() => setEditMode(true)}>정보 수정</button>
          </>
        )}

        <button style={styles.logoutButton} onClick={handleLogout}>로그아웃</button>
      </div>
    </CenterLayout>
  );
};

const styles: Record<string, React.CSSProperties> = {
  backBtnWrapper: {
    textAlign: 'left',
    width: '100%',
    marginBottom: '-10px',
  },
  backBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '30px',
    cursor: 'pointer',
    marginLeft: '25px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '360px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '30px',
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#333',
  },
  infoBox: {
    width: '80%',
    padding: '10px 14px',
    marginBottom: '10px',
    backgroundColor: '#f0f8ff',
    border: '1px solid #d0e0f0',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#333',
    textAlign: 'left',
  },
  inputBox: {
    width: '80%',
    marginBottom: '12px',
    textAlign: 'left',
    marginRight: '7%', // 왼쪽으로 이동
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '15px',
    marginTop: '6px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  editButton: {
    width: '90%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#ff69b4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '15px',
  },
  saveButton: {
    width: '90%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#ff69b4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '15px',
  },
  cancelButton: {
    width: '90%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#9e9e9e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  logoutButton: {
    width: '90%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#ccc',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  gif: {
    width: '120px',
    height: '120px',
    display: 'block',
    marginBottom: '30px',
  },
};

export default MyPage;
