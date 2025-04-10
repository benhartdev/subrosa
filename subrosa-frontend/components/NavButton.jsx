'use client'
import { useRouter } from 'next/navigation';

const NavButton = ({ to, label, className }) => {
  const router = useRouter();

  return (
    <button className={className} onClick={() => router.push(to)}>
      {label}
    </button>
  );
};

export default NavButton;
