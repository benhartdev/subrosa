// components/SubrosaLogo.jsx
import Image from 'next/image';

export default function SubrosaLogo() {
  return (
    <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '2rem' }}>
      <Image
        src="/images/gallerie SUB logo.svg"
        alt="Logo SUB ROSA"
        width={440}
        height={200}
        style={{ opacity: 1 }}
      />
    </div>
  );
}
