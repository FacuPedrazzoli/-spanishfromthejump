import { HeroComponent } from './components/Hero';
import { MethodologyComponent } from './components/Methodology';
import { MorphologyComponent } from './components/Morphology';
import { WordDetectiveComponent } from './components/WordDetective';
import { EtymologyComponent } from './components/Etymology';
import { PayPalIntegration } from './utils/paypal';
import { WhatsAppButton } from './utils/whatsapp';
import { landingPageContent } from './data/content';
import type { PayPalConfig, WhatsAppConfig } from './types/interfaces';

class App {
  private appContainer: HTMLElement | null;

  constructor() {
    this.appContainer = document.getElementById('app');
    this.init();
  }

  private init(): void {
    this.renderComponents();
    this.initPayPal();
    this.initWhatsApp();
    this.addScrollAnimations();
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
    const paypalConfig: PayPalConfig = {
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
      currency: 'USD',
      intent: 'capture',
    };

    const paypal = new PayPalIntegration(paypalConfig);
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        paypal.init();
      });
    } else {
      paypal.init();
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
