/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_CLIENT_ID: string;
  readonly VITE_WHATSAPP_PHONE: string;
  readonly VITE_WHATSAPP_MESSAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  paypal?: {
    Buttons: (config: any) => {
      render: (selector: string) => Promise<void>;
    };
  };
}
