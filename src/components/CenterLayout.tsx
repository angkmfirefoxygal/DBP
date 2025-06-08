// src/components/CenterLayout.tsx
import React from 'react';

const CenterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100dvh', // ✅ 디바이스 뷰포트 전체 높이 확보 (모바일 대응 포함)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '50px',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  box: {
    width: '100%',
    maxWidth: '400px',
    height: '100%',         // ✅ 내부 box도 전체 높이 차지
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // ✅ 내부 콘텐츠도 수직 중앙 정렬
    background: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
};

export default CenterLayout;
