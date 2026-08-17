import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private JLR Research Dashboard | Sitora Research',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
