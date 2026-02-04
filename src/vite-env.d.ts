/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_CLIENT_ID: string;
  readonly VITE_WHATSAPP_PHONE: string;
  readonly VITE_WHATSAPP_MESSAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// PayPal SDK Types
interface PayPalButtonsComponentOptions {
  style?: {
    layout?: 'vertical' | 'horizontal';
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
    shape?: 'rect' | 'pill';
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay';
    height?: number;
  };
  createOrder: (data: any, actions: any) => Promise<string>;
  onApprove: (data: any, actions: any) => Promise<void>;
  onError?: (err: any) => void;
  onCancel?: (data: any) => void;
}

interface PayPalButtonsComponent {
  (options: PayPalButtonsComponentOptions): {
    render: (selector: string) => Promise<void>;
  };
}

interface PayPalNamespace {
  Buttons: PayPalButtonsComponent;
}

interface Window {
  paypal?: PayPalNamespace;
}
