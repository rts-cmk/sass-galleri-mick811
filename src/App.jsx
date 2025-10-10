export default function Home() {
  return (
    <>
      <header className="header-container">
        <h1 className="header-title">Explore</h1>
        <nav>
          <ul>
            <li>Lifestyle</li>
            <li>Food</li>
            <li>Home</li>
            <li>Travel</li>
            <li>More</li>
          </ul>
        </nav>
      </header>

      <div className="grid-container">
        {Array.from({ length: 15 }).map((_, idx) => (
          <img key={idx} src={`/img/${idx + 1}.jpg`} alt={`Image ${idx}`} />
        ))}
      </div>
    </>
  );
}
