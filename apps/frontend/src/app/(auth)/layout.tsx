import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';

/**
 * 認証済みページに表示する共通レイアウト
 * @param param0
 * @returns
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
