import type { LandingPageContent } from '../types/interfaces';

export const landingPageContent: LandingPageContent = {
  hero: {
    headline: 'Learn Spanish Through Translation',
    subHeadline: 'Hello, My name is Andy, I created Spanishfromthejump.',
    description: 'This system is specifically designed for English speakers to learn Spanish through Translation.',
  },
  
  methodology: {
    title: 'CONNECT WHAT YOU KNOW WITH WHAT YOU ARE LEARNING',
    cards: [
      {
        english: 'TEETH',
        spanish: 'DIENTES',
      },
      {
        english: 'DENTIST',
        spanish: 'DENTISTA',
      },
    ],
  },
  
  morphology: {
    title: 'DIVE INTO MORPHOLOGY',
    examples: [
      {
        prefix: 'TRANS',
        root: 'PORT',
        suffix: '',
        english: 'TRANSPORT',
        spanish: 'TRANSPORTAR',
      },
      {
        prefix: 'IN',
        root: 'PORT',
        suffix: '',
        english: 'IMPORT',
        spanish: 'IMPORTAR',
      },
    ],
  },
  
  wordDetective: {
    title: 'BECOME A WORD DETECTIVE',
    subtitle: 'FOUR SHADES OF CAT',
    evolution: {
      steps: ['CAT', 'CATO', 'GAT', 'GATO'],
      description: 'Watch how English transforms into Spanish through phonetic evolution',
    },
  },
  
  etymology: {
    title: 'MAKE ETYMOLOGY GREAT AGAIN',
    story: {
      title: 'From algodón to cotton',
      content: 'Discover the fascinating journey of words across languages and cultures.',
      wordPair: {
        spanish: 'algodón',
        english: 'cotton',
      },
      character: 'Meet Al Cotton',
    },
  },
};
