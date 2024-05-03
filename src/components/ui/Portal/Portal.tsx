import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  wrapperId?: string;
}

export function Portal({
  children,
  wrapperId = 'portal-wrapper',
}: PortalProps) {
  let element = document.getElementById(wrapperId);

  if (!element) return;

  return createPortal(children, element);
}
