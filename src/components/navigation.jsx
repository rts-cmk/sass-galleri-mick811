import { useState, useEffect, useRef } from 'react';

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const mainCategories = ['Lifestyle', 'Food', 'Home', 'Travel'];
  const moreCategories = ['Nature', 'City', 'Architecture', 'Portrait'];

  const handleCategoryClick = (category) => {
    // Update URL query parameter
    const url = new URL(window.location);
    url.searchParams.set('category', category.toLowerCase());
    window.history.pushState({}, '', url);
    
    // Close dropdown if open
    setIsDropdownOpen(false);
    
    // Dispatch custom event so App can react to changes
    window.dispatchEvent(new Event('categorychange'));
  };

  const handleMoreClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav>
      <ul>
        {mainCategories.map((category) => (
          <li key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </li>
        ))}
        
        <li className="more-item" ref={dropdownRef}>
          <button 
            className="more-button" 
            onClick={handleMoreClick}
            aria-expanded={isDropdownOpen}
          >
            More
            <svg 
              width="12" 
              height="8" 
              viewBox="0 0 12 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={isDropdownOpen ? 'chevron-open' : ''}
            >
              <path 
                d="M1 1L6 6L11 1" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {moreCategories.map((category) => (
                <div 
                  key={category} 
                  className="dropdown-item"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

