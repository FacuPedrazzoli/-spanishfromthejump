import { HeroComponent } from './components/Hero';
import { MethodologyComponent } from './components/Methodology';
import { MorphologyComponent } from './components/Morphology';
import { WordDetectiveComponent } from './components/WordDetective';
import { EtymologyComponent } from './components/Etymology';
import { WhatsAppButton } from './utils/whatsapp';
import { landingPageContent } from './data/content';
import type { WhatsAppConfig } from './types/interfaces';

class App {
  private appContainer: HTMLElement | null;

  constructor() {
    this.appContainer = document.getElementById('app');
    this.init();
  }

  private async init(): Promise<void> {
    this.renderComponents();
    await this.waitForPayPal();
    this.initPayPal();
    this.initWhatsApp();
    this.addScrollAnimations();
  }

  private waitForPayPal(): Promise<void> {
    return new Promise((resolve) => {
      if (window.paypal) {
        resolve();
        return;
      }

      const checkPayPal = setInterval(() => {
        if (window.paypal) {
          clearInterval(checkPayPal);
          resolve();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkPayPal);
        console.error('PayPal SDK failed to load within timeout');
        resolve();
      }, 10000);
    });
  }

  private renderComponents(): void {
    if (!this.appContainer) {
      console.error('App container not found');
      return;
    }

    const hero = new HeroComponent(landingPageContent.hero);
    const methodology = new MethodologyComponent(landingPageContent.methodology);
    const morphology = new MorphologyComponent(landingPageContent.morphology);
    const wordDetective = new WordDetectiveComponent(landingPageContent.wordDetective);
    const etymology = new EtymologyComponent(landingPageContent.etymology);

    const componentsHTML = [
      hero.render(),
      methodology.render(),
      morphology.render(),
      wordDetective.render(),
      etymology.render(),
    ].join('');

    this.appContainer.innerHTML = componentsHTML;
  }

  private initPayPal(): void {
    const container = document.getElementById('paypal-button-container');
    
    if (!container) {
      console.error('PayPal container not found');
      return;
    }

    if (!window.paypal) {
      console.error('PayPal SDK not loaded');
      container.innerHTML = '<p style="color: red;">PayPal failed to load. Please refresh the page.</p>';
      return;
    }

    console.log('Initializing PayPal buttons...');

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        height: 45,
      },
      createOrder: (_data: any, actions: any) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              value: '20.00',
              currency_code: 'USD',
            },
            description: 'Spanish from the Jump - Class Session',
          }],
          application_context: {
            shipping_preference: 'NO_SHIPPING',
          },
        });
      },
      onApprove: async (_data: any, actions: any) => {
        try {
          const order = await actions.order.capture();
          console.log('Payment successful:', order);
          
          const transactionId = order.purchase_units[0]?.payments?.captures[0]?.id || 'N/A';
          
          alert('Payment successful! Welcome to the class.');
          
          const container = document.getElementById('paypal-button-container');
          if (container) {
            container.innerHTML = `
              <div class="payment-success">
                <h3>✓ Payment Successful!</h3>
                <p>Thank you for enrolling in Spanish from the Jump!</p>
                <p class="transaction-id">Transaction ID: ${transactionId}</p>
                <p>You'll receive a confirmation email shortly.</p>
              </div>
            `;
          }
        } catch (error) {
          console.error('Error capturing order:', error);
          alert('There was an error processing your payment. Please try again.');
        }
      },
      onError: (err: any) => {
        console.error('PayPal error:', err);
        alert('An error occurred with PayPal. Please try again later.');
      },
      onCancel: () => {
        console.log('Payment cancelled by user');
      },
    }).render('#paypal-button-container')
      .then(() => {
        console.log('PayPal buttons rendered successfully');
      })
      .catch((error: any) => {
        console.error('Failed to render PayPal buttons:', error);
        if (container) {
          container.innerHTML = '<p style="color: red;">Failed to load PayPal buttons. Please refresh the page.</p>';
        }
      });
  }

  private initWhatsApp(): void {
    const whatsappConfig: WhatsAppConfig = {
      phoneNumber: '5491164483158',
      message: 'Hi! I\'m interested in learning Spanish through your translation method.',
    };

    const whatsapp = new WhatsAppButton(whatsappConfig);
    whatsapp.init();
  }

  private addScrollAnimations(): void {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    setTimeout(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
      });
    }, 100);

    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }
}

new App();
