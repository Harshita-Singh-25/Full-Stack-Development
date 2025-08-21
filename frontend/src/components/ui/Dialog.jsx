// src/components/ui/Dialog.jsx
import * as React from 'react';
import { cn } from '../../lib/utils';

const Dialog = ({ open, onOpenChange, ...props }) => {
  return (
    <div 
      className={cn(
        'fixed inset-0 z-50 flex items-start justify-center sm:items-center',
        open ? 'block' : 'hidden'
      )}
      {...props}
    />
  );
};

const DialogContent = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'fixed z-50 grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg sm:rounded-lg',
        'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
        className
      )}
      {...props}
    />
  );
};

const DialogHeader = ({ className, ...props }) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  );
};

const DialogTitle = ({ className, ...props }) => {
  return (
    <h2
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
};

const DialogDescription = ({ className, ...props }) => {
  return (
    <p
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  );
};

const DialogFooter = ({ className, ...props }) => {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  );
};

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};