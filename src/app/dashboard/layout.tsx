import { Header } from './Header';
import { Sidebar } from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex h-screen w-full flex-col gap-[24px] pb-[42px]'>
      <Header />

      <div className='flex h-full items-start justify-center gap-[24px] px-[32px]'>
        <Sidebar />

        <section className='grow-1 w-full max-w-[906px]'>New list</section>
      </div>
    </section>
  );
}
