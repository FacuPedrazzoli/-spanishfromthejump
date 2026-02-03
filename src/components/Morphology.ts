import type { MorphologySection } from '../types/interfaces';

export class MorphologyComponent {
  private content: MorphologySection;

  constructor(content: MorphologySection) {
    this.content = content;
  }

  render(): string {
    const examplesHTML = this.content.examples.map(example => `
      <div class="morphology-card">
        <div class="morphology-card__english">
          <div class="morphology-card__breakdown">
            <span class="morphology-card__part morphology-card__part--prefix">${example.prefix}</span>
            <span class="morphology-card__part morphology-card__part--root">${example.root}</span>
          </div>
          <div class="morphology-card__word">${example.english}</div>
        </div>
        <div class="morphology-card__arrow">→</div>
        <div class="morphology-card__spanish">
          <div class="morphology-card__breakdown">
            <span class="morphology-card__part morphology-card__part--prefix">${example.prefix}</span>
            <span class="morphology-card__part morphology-card__part--root">${example.root}</span>
            <span class="morphology-card__part morphology-card__part--suffix">(AR)</span>
          </div>
          <div class="morphology-card__word">${example.spanish}</div>
        </div>
      </div>
    `).join('');

    return `
      <section class="morphology" id="morphology">
        <div class="container">
          <h2 class="section-title">${this.content.title}</h2>
          <div class="morphology-cards">
            ${examplesHTML}
          </div>
        </div>
      </section>
    `;
  }
}
