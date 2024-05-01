import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

export default function ListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex h-screen w-full flex-col gap-[24px] pb-[42px]'>
      <Header />

      <div className='flex h-full items-start justify-center gap-[24px] px-[32px]'>
        <Sidebar />

        <section className='grow-1 h-[calc(100vh-122px)] w-full max-w-[906px]'>
          {children}
        </section>
      </div>
    </section>
  );
}
