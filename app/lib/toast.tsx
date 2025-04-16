import { toast } from "sonner";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simplified options type
type ToastOptions = Record<string, any>;

// Helper to format the current date
const formatCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  const formattedDate = formatCurrentDate();
  
  return toast(
    <div className="flex items-start">
      <div className="pt-1">
        <CheckCircle className="h-5 w-5 text-green-500" />
      </div>
      <div className="flex-grow mx-2">
        <div>{message}</div>
        <div>{formattedDate}</div>
      </div>
      <div className="flex items-center justify-end">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Undo
        </Button>
      </div>
    </div>,
    {
      style: { 
        backgroundColor: "rgb(240 253 244)",
        border: "1px solid rgb(187 247 208)",
        color: "rgb(22 101 52)"
      },
      ...(options || {})
    } as any
  );
};

export const showWarningToast = (message: string, options?: ToastOptions) => {
  const formattedDate = formatCurrentDate();
  
  return toast(
    <div className="flex items-start">
      <div className="pt-1">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
      </div>
      <div className="flex-grow mx-2">
        <div>{message}</div>
        <div>{formattedDate}</div>
      </div>
      <div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Okay
        </Button>
      </div>
    </div>,
    {
      style: { 
        backgroundColor: "rgb(255 251 235)",
        border: "1px solid rgb(253 230 138)",
        color: "rgb(146 64 14)"
      },
      ...(options || {})
    } as any
  );
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  const formattedDate = formatCurrentDate();
  
  return toast(
    <div className="flex items-start">
      <div className="pt-1">
        <XCircle className="h-5 w-5 text-red-500" />
      </div>
      <div className="flex-grow mx-2">
        <div>{message}</div>
        <div >{formattedDate}</div>
      </div>
      <div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Try again
        </Button>
      </div>
    </div>,
    {
      style: { 
        backgroundColor: "rgb(254 242 242)",
        border: "1px solid rgb(254 202 202)",
        color: "rgb(153 27 27)"
      },
      ...(options || {})
    } as any
  );
}; 