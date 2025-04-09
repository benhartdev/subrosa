import Link from 'next/link';
import '../styles/breadcrumb.css'; // ou "../styles/breadcrumb.css" selon ton projet

const Breadcrumb = () => {
  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-bar" />
      <nav className="breadcrumb">
        <Link href="/" className="breadcrumb-link">Accueil</Link>
        <span className="breadcrumb-separator">›</span>
        <Link href="/nos-artistes" className="breadcrumb-link">Artistes</Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Ben H</span>
      </nav>
      <div className="breadcrumb-bar" />
    </div>
  );
};

export default Breadcrumb;
