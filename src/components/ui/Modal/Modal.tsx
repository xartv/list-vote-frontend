import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { Portal } from '../Portal';

export interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  title: string;
  classNames?: {
    content?: string;
    title?: string;
  };
  handleClose: () => void;
}

export function Modal({
  children,
  isOpen,
  classNames = {},
  title,
  handleClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className='fixed inset-0 flex h-screen w-screen items-center justify-center'>
        <div
          className={`fixed z-10 rounded-md border-2 border-black-light bg-black-middle  p-[24px] ${classNames.content}`}
        >
          <div className='flex gap-[24px]'>
            <h2
              className={`text-[24px] font-bold leading-[28px] text-text-white ${classNames.title}`}
            >
              {title}
            </h2>
            <X
              onClick={handleClose}
              color={'#fff'}
              className='flex-shrink-0 cursor-pointer'
            />
          </div>
          <div className='modal-content'>{children}</div>
        </div>
        <div
          className='fixed inset-0 h-screen w-screen cursor-pointer bg-[#000] opacity-50'
          onClick={handleClose}
        />
      </div>
    </Portal>
  );
}
