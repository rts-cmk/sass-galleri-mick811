import { useState, useEffect } from 'react';
import Navigation from './components/navigation';

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    // Get initial category from URL
    const params = new URLSearchParams(window.location.search);
    setCurrentCategory(params.get('category') || '');

    // Listen for category changes
    const handleCategoryChange = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentCategory(params.get('category') || '');
    };

    window.addEventListener('categorychange', handleCategoryChange);
    return () => window.removeEventListener('categorychange', handleCategoryChange);
  }, []);

  return (
    <>
      <header className="header-container">
        <h1 className="header-title">Explore</h1>
        <Navigation />
      </header>

      <div className="grid-container">
        {Array.from({ length: 15 }).map((_, idx) => (
          <img key={idx} src={`/img/${idx + 1}.jpg`} alt={`Image ${idx}`} />
        ))}
      </div>
    </>
  );
}
