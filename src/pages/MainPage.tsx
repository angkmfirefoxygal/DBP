import { useNavigate } from 'react-router-dom';
import CenterLayout from '../components/CenterLayout';
import piggyGif from '../assets/piggy.gif'
import pigGif from '../assets/pig_2.gif'
import { useAuth } from '../contexts/AuthContext';

const MainPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div style={styles.page}>
      <CenterLayout>
        <div style={{ position: 'relative' }}>
          {/* ✅ 박스 내부 우측 상단 프로필 버튼 */}
          {isLoggedIn && (
            <div style={styles.boxTopRight}>
              <button onClick={() => navigate('/user')} style={styles.profileButton}>
                👤 마이페이지
              </button>
            </div>
          )}

          {isLoggedIn ? (
            <div>
              <div style={{ ...styles.loginMessageWrapper }}>
                <h2 style={styles.title}>안녕하세요! 🎉</h2>
                <p style={styles.subtitle}>로그인 상태입니다.</p>
              </div>
              <img src={pigGif} alt="귀여운 돼지" style={styles.gif} />
              <div style={styles.buttonGroup}>
                <button onClick={() => navigate('/category')} style={styles.button}>
                  소비 내역 조회
                </button>
                <button onClick={() => navigate('/discount')} style={styles.button}>
                  할인 정보
                </button>
                <button
                  onClick={logout}
                  style={{ ...styles.button, backgroundColor: '#ccc', color: '#000' }}
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 style={styles.title}>대학생들을 위한 가계부</h2>
              <p style={styles.subtitle}>
                편리하게 내 소비를 관리하고 할인 정보를 확인하세요!
              </p>
              <img src={piggyGif} alt="귀여운 돼지" style={styles.gif} />
              <div style={styles.buttonGroup}>
                <button onClick={() => navigate('/signup')} style={styles.button}>
                  회원가입
                </button>
                <button onClick={() => navigate('/signin')} style={styles.button}>
                  로그인
                </button>
              </div>
            </>
          )}
        </div>
      </CenterLayout>
    </div>
  );
};



const styles = {
  page: {
    backgroundColor: '#ffffff', // ✅ 배경 흰색
    minHeight: '100vh',
  },
  loginMessageWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    padding: '10px',
    width: '100%',
    marginBottom: '24px',
  },

  banner: {
    backgroundColor: '#ff69b4', // 핫핑크
    color: '#fff',
    padding: '16px',
    fontSize: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boxTopRight: {
    position: 'absolute' as const,
    top: '0px',
    right: '0',
  },
  profileButton: {
    background: '#f0f0f0',       // 연한 회색
    border: 'none',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    padding: '4px 10px',
    borderRadius: '15px',        // 꼭짓점 라운드 처리
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',  // 약간의 그림자 추가해도 예쁨
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '8px',
    fontSize: '24px',
  },
  subtitle: {
    textAlign: 'center' as const,
    marginBottom: '20px',
    color: '#666',
    fontSize: '16px',
  },
  gif: {
    width: '140px',
    height: '140px',
    display: 'block',
    margin: '0 auto 24px auto',
  },
  buttonGroup: {
    top: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#ff69b4', // ✅ 버튼만 핑크
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default MainPage;
