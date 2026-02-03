import type { MethodologySection } from '../types/interfaces';

export class MethodologyComponent {
  private content: MethodologySection;

  constructor(content: MethodologySection) {
    this.content = content;
  }

  render(): string {
    const cardsHTML = this.content.cards.map(card => `
      <div class="translation-card">
        <div class="translation-card__side translation-card__side--english">
          <span class="translation-card__label">English</span>
          <span class="translation-card__word">${card.english}</span>
        </div>
        <div class="translation-card__arrow">→</div>
        <div class="translation-card__side translation-card__side--spanish">
          <span class="translation-card__label">Spanish</span>
          <span class="translation-card__word">${card.spanish}</span>
        </div>
      </div>
    `).join('');

    return `
      <section class="methodology" id="methodology">
        <div class="container">
          <h2 class="section-title">${this.content.title}</h2>
          <div class="translation-cards">
            ${cardsHTML}
          </div>
        </div>
      </section>
    `;
  }
}
