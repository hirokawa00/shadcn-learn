import { Navbar } from '@/components/admin-panel/navbar';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="">
      <Navbar title={title} />
      <div className="px-2">{children}</div>
    </div>
  );
}
