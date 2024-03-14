import { Header } from './Header';
import { Sidebar } from './Sidebar';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='grid grid-rows-dashboardRows grid-cols-dashboardCol'>
      <Sidebar />

      <Header />

      <div className='col-span-1 row-span-1 bg-gray-400'>{children}</div>
    </section>
  );
}
