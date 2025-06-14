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
    minHeight: '100dvh', // ⬅️ 최소 높이만 설정 (모바일 뷰포트 대응 포함)
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
};

export default CenterLayout;
