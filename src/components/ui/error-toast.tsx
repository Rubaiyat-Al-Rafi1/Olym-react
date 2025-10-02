import React from 'react';
import { toast } from './use-toast';
import { AlertCircle } from 'lucide-react';

export const showErrorToast = (message: string) => {
  toast({
    variant: "destructive",
    title: "Error",
    description: message,
    icon: <AlertCircle className="h-5 w-5" />,
  });
};

export const showSuccessToast = (message: string) => {
  toast({
    title: "Success",
    description: message,
  });
};