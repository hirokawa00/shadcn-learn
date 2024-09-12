import { Navbar } from '@/components/admin-panel/navbar';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="flex flex-col h-screen auto">
      <Navbar title={title} />
      <div className="px-2 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
