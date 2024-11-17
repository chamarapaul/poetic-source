// pages/poems/random.tsx
import { GetServerSideProps } from 'next';
import { getAllPoems } from '@/lib/poems';

export const getServerSideProps: GetServerSideProps = async () => {
  const poems = getAllPoems();
  const randomPoem = poems[Math.floor(Math.random() * poems.length)];
  
  return {
    redirect: {
      destination: `/poems/${randomPoem.id}`,
      permanent: false,
    },
  };
};

// Need to export a component even though we'll always redirect
export default function RandomPoem() {
  return null;
}