import type { Metadata } from 'next';
import { AdminDataProvider } from '@/components/admin/data-provider';
import { AdminShell } from '@/components/admin/shell';
import { ToastProvider } from '@/components/admin/toast';

export const metadata: Metadata = {
  title: 'Админ-панель — Tiling Work',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminDataProvider>
      <ToastProvider>
        <AdminShell>{children}</AdminShell>
      </ToastProvider>
    </AdminDataProvider>
  );
}
