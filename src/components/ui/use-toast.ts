import { useState, useEffect } from 'react';

export interface ToastActionElement {
  type: 'action';
  action: React.ReactNode;
}

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = ({
    title,
    description,
    variant = 'default',
    ...props
  }: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);

    setToasts((prev) => [
      ...prev,
      {
        id,
        title,
        description,
        variant,
        ...props,
      },
    ]);

    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, toast, dismiss };
}