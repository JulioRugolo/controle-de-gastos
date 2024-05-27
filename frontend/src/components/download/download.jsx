import { useState, useEffect } from 'react';
import DesktopDownload from './desktop';
import MobileDownload from './mobile';
import './styles.css';
import Header from '../header/header';

const DownloadPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
        <Header user={localStorage.getItem('user')} />
        <div className="download-page">
        {isMobile ? <MobileDownload /> : <DesktopDownload />}
        </div>
    </>
  );
};

export default DownloadPage;
