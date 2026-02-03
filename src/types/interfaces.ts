export interface HeroContent {
  headline: string;
  subHeadline: string;
  description: string;
}

export interface TranslationCard {
  english: string;
  spanish: string;
  label?: string;
}

export interface MorphologyExample {
  prefix: string;
  root: string;
  suffix: string;
  english: string;
  spanish: string;
}

export interface WordEvolution {
  steps: string[];
  description: string;
}

export interface EtymologyStory {
  title: string;
  content: string;
  wordPair: {
    spanish: string;
    english: string;
  };
  character: string;
}

export interface MethodologySection {
  title: string;
  cards: TranslationCard[];
}

export interface MorphologySection {
  title: string;
  examples: MorphologyExample[];
}

export interface WordDetectiveSection {
  title: string;
  subtitle: string;
  evolution: WordEvolution;
}

export interface EtymologySection {
  title: string;
  story: EtymologyStory;
}

export interface LandingPageContent {
  hero: HeroContent;
  methodology: MethodologySection;
  morphology: MorphologySection;
  wordDetective: WordDetectiveSection;
  etymology: EtymologySection;
}

export interface PayPalConfig {
  clientId: string;
  currency: string;
  intent: 'capture' | 'authorize';
}

export interface WhatsAppConfig {
  phoneNumber: string;
  message: string;
}
