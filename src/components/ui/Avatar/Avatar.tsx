import Image from 'next/image';

interface AvatarProps {
  userName?: string;
  imageSrc?: string;
  className?: string;
}

export function Avatar({ userName, imageSrc, className }: AvatarProps) {
  const firstLetter = (userName?.[0] ?? 'U').toUpperCase();

  return (
    <div
      className={`flex h-[32px] w-[32px] items-center justify-center rounded bg-green ${className}`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt='avatar'
          width={32}
        />
      )}

      {!imageSrc && <div className='text-white text-[15px]'>{firstLetter}</div>}
    </div>
  );
}
