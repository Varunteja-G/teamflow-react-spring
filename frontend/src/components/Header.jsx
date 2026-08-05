export default function Header({ onCreate }) {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="brand" href="/" aria-label="TeamFlow home">
          <span className="brand-mark">TF</span>
          <span>TeamFlow</span>
        </a>
        <button className="primary-button" onClick={onCreate}>+ New task</button>
      </div>
    </header>
  );
}
