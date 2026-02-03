import { loadScript } from '@paypal/paypal-js';
import type { PayPalConfig } from '../types/interfaces';

export class PayPalIntegration {
  private config: PayPalConfig;
  private containerId: string;

  constructor(config: PayPalConfig, containerId: string = 'paypal-button-container') {
    this.config = config;
    this.containerId = containerId;
  }

  async init(): Promise<void> {
    try {
      const paypal = await loadScript({
        clientId: this.config.clientId,
        currency: this.config.currency,
      });

      if (!paypal || !paypal.Buttons) {
        console.error('PayPal SDK failed to load');
        return;
      }

      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error(`Container #${this.containerId} not found`);
        return;
      }

      paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 45,
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            intent: this.config.intent.toUpperCase(),
            purchase_units: [{
              amount: {
                value: '50.00',
                currency_code: this.config.currency,
              },
              description: 'Spanish from the Jump - Tutoring Session',
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            },
          });
        },
        onApprove: async (_data: any, actions: any) => {
          if (!actions.order) return;
          
          try {
            const order = await actions.order.capture();
            console.log('Payment successful:', order);
            
            this.showSuccessMessage(order);
          } catch (error) {
            console.error('Error capturing order:', error);
            this.showErrorMessage();
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          this.showErrorMessage();
        },
        onCancel: () => {
          console.log('Payment cancelled by user');
        },
      }).render(`#${this.containerId}`);

    } catch (error) {
      console.error('Failed to initialize PayPal:', error);
    }
  }

  private showSuccessMessage(order: any): void {
    const container = document.getElementById(this.containerId);
    if (container) {
      const transactionId = order.purchase_units[0]?.payments?.captures[0]?.id || 'N/A';
      container.innerHTML = `
        <div class="payment-success">
          <h3>✓ Payment Successful!</h3>
          <p>Thank you for enrolling in Spanish from the Jump!</p>
          <p class="transaction-id">Transaction ID: ${transactionId}</p>
          <p>You'll receive a confirmation email shortly.</p>
        </div>
      `;
    }
  }

  private showErrorMessage(): void {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = `
        <div class="payment-error">
          <p>Payment failed. Please try again or contact support.</p>
          <button onclick="location.reload()">Retry</button>
        </div>
      `;
    }
  }
}
