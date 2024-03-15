import Image from 'next/image';

interface AvatarProps {
  userName?: string;
  imageSrc?: string;
}

export function Avatar({ userName, imageSrc }: AvatarProps) {
  const firstLetter = (userName?.[0] ?? 'U').toUpperCase();

  return (
    <div className='w-[60px] h-[60px] rounded-full border border-solid border-white bg-sky-400 flex justify-center items-center'>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt='avatar'
          width={40}
        />
      )}

      {!imageSrc && <div className='text-white text-3xl'>{firstLetter}</div>}
    </div>
  );
}
