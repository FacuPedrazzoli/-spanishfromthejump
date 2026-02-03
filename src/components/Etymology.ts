import type { EtymologySection } from '../types/interfaces';

export class EtymologyComponent {
  private content: EtymologySection;

  constructor(content: EtymologySection) {
    this.content = content;
  }

  render(): string {
    const { story } = this.content;
    
    return `
      <section class="etymology" id="etymology">
        <div class="container">
          <h2 class="section-title">${this.content.title}</h2>
          <div class="etymology-card">
            <h3 class="etymology-card__title">${story.title}</h3>
            <p class="etymology-card__content">${story.content}</p>
            <div class="etymology-card__word-pair">
              <span class="etymology-card__word etymology-card__word--spanish">${story.wordPair.spanish}</span>
              <span class="etymology-card__connector">→</span>
              <span class="etymology-card__word etymology-card__word--english">${story.wordPair.english}</span>
            </div>
            <p class="etymology-card__character">${story.character}</p>
          </div>
        </div>
      </section>
    `;
  }
}
