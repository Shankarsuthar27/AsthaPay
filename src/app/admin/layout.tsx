import type { Metadata } from 'next';
import { AdminLayoutWrapper } from '@/components/Admin/AdminLayoutWrapper';

export const metadata: Metadata = {
  title: 'AsthaPay Admin - B2B Operations & Leads Portal',
  description: 'Manage partner inquiries, proposals, and turnkey banking switches.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
