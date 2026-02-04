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

  private init(): void {
    this.renderComponents();
    this.initPayPalWithPolling();
    this.initWhatsApp();
    this.addScrollAnimations();
  }

  /**
   * Defensive PayPal initialization with polling mechanism
   * Checks every 100ms for SDK availability, timeout after 10 seconds
   */
  private initPayPalWithPolling(): void {
    const POLL_INTERVAL = 100; // Check every 100ms
    const TIMEOUT = 10000; // Give up after 10 seconds
    const startTime = Date.now();

    const pollForPayPal = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // Timeout check
      if (elapsed >= TIMEOUT) {
        clearInterval(pollForPayPal);
        console.error('❌ PayPal SDK failed to load within 10 seconds');
        this.showPayPalError('PayPal SDK failed to load. Please refresh the page.');
        return;
      }

      // Check if PayPal SDK is loaded
      if (window.paypal && typeof window.paypal.Buttons === 'function') {
        clearInterval(pollForPayPal);
        console.log('✅ PayPal SDK loaded successfully');
        this.initPayPal();
      }
    }, POLL_INTERVAL);
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

  /**
   * Initialize PayPal buttons - Only called after SDK is confirmed loaded
   */
  private initPayPal(): void {
    // Step 1: Verify container exists in DOM
    const container = document.getElementById('paypal-button-container');
    
    if (!container) {
      console.error('❌ PayPal container #paypal-button-container not found in DOM');
      return;
    }

    // Step 2: Double-check PayPal SDK is available
    if (!window.paypal || typeof window.paypal.Buttons !== 'function') {
      console.error('❌ PayPal SDK not available');
      this.showPayPalError('PayPal SDK not loaded properly.');
      return;
    }

    console.log('🔄 Initializing PayPal buttons...');

    try {
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay',
          height: 45,
        },
        
        createOrder: async (_data, actions) => {
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
        
        onApprove: async (_data, actions) => {
          try {
            const order = await actions.order.capture();
            console.log('✅ Payment captured successfully:', order);
            
            const transactionId = order.purchase_units[0]?.payments?.captures[0]?.id || 'N/A';
            
            // Success alert
            alert('🎉 Payment successful! Welcome to Spanish from the Jump!');
            
            // Replace buttons with success message
            const successHTML = `
              <div class="payment-success">
                <h3>✓ Payment Successful!</h3>
                <p>Thank you for enrolling in Spanish from the Jump!</p>
                <p class="transaction-id">Transaction ID: ${transactionId}</p>
                <p>You'll receive a confirmation email shortly.</p>
              </div>
            `;
            
            if (container) {
              container.innerHTML = successHTML;
            }
          } catch (error) {
            console.error('❌ Error capturing payment:', error);
            alert('There was an error processing your payment. Please try again or contact support.');
          }
        },
        
        onError: (err) => {
          console.error('❌ PayPal Button Error:', err);
          alert('An error occurred with PayPal. Please refresh the page and try again.');
        },
        
        onCancel: (data) => {
          console.log('⚠️ Payment cancelled by user:', data);
        },
        
      }).render('#paypal-button-container')
        .then(() => {
          console.log('✅ PayPal buttons rendered successfully');
        })
        .catch((error) => {
          console.error('❌ Failed to render PayPal buttons:', error);
          this.showPayPalError('Failed to render payment buttons.');
        });
        
    } catch (error) {
      console.error('❌ Exception during PayPal initialization:', error);
      this.showPayPalError('PayPal initialization failed.');
    }
  }

  /**
   * Display error message in PayPal container
   */
  private showPayPalError(message: string): void {
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = `
        <div class="payment-error">
          <p style="color: #dc2626; text-align: center; padding: 1rem;">
            ⚠️ ${message}
          </p>
          <button 
            onclick="location.reload()" 
            style="display: block; margin: 1rem auto; padding: 0.5rem 1rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; cursor: pointer;"
          >
            Refresh Page
          </button>
        </div>
      `;
    }
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
