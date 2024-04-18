import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return <LoaderCircle className={clsx('animate-spin', className)} />;
}
