import type { HeroContent } from '../types/interfaces';

export class HeroComponent {
  private content: HeroContent;

  constructor(content: HeroContent) {
    this.content = content;
  }

  render(): string {
    return `
      <section class="hero" id="hero">
        <div class="hero__container">
          <div class="hero__content">
            <div class="hero__text">
              <h1 class="hero__headline">${this.content.headline}</h1>
              <p class="hero__subheadline">${this.content.subHeadline}</p>
              <p class="hero__description">${this.content.description}</p>
              <div class="hero__cta">
                <a href="#paypal" class="btn btn--primary">Start Learning Today</a>
              </div>
            </div>
            <div class="hero__image">
              <img src="/andy.jpeg" alt="Andy - Spanish from the Jump Founder" class="hero__img" />
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
