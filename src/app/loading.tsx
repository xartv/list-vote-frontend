import s from './loading.module.scss';

export default function Loading() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className={s.loader}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
