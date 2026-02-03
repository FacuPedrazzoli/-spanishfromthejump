import type { WordDetectiveSection } from '../types/interfaces';

export class WordDetectiveComponent {
  private content: WordDetectiveSection;

  constructor(content: WordDetectiveSection) {
    this.content = content;
  }

  render(): string {
    const stepsHTML = this.content.evolution.steps.map((step, index) => `
      <div class="evolution-step" style="--shade-index: ${index}">
        <span class="evolution-step__word">${step}</span>
      </div>
    `).join('<div class="evolution-arrow">→</div>');

    return `
      <section class="word-detective" id="word-detective">
        <div class="container">
          <h2 class="section-title">${this.content.title}</h2>
          <h3 class="section-subtitle">${this.content.subtitle}</h3>
          <p class="section-description">${this.content.evolution.description}</p>
          <div class="evolution-flow">
            ${stepsHTML}
          </div>
        </div>
      </section>
    `;
  }
}
