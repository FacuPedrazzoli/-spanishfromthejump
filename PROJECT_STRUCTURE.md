# Project Directory Tree

```
spanish-from-the-jump/
│
├── src/
│   ├── components/              # Modular UI Components
│   │   ├── Hero.ts             # Hero section with headline and CTA
│   │   ├── Methodology.ts      # Translation card comparisons
│   │   ├── Morphology.ts       # Word morphology breakdown
│   │   ├── WordDetective.ts    # Word evolution visualization
│   │   └── Etymology.ts        # Etymology storytelling section
│   │
│   ├── data/                   # Content Data Layer
│   │   └── content.ts          # Centralized content (typed)
│   │
│   ├── styles/                 # Stylesheets
│   │   └── main.css            # Main stylesheet with CSS variables
│   │
│   ├── types/                  # TypeScript Type Definitions
│   │   └── interfaces.ts       # All interfaces and types
│   │
│   ├── utils/                  # Utility Functions
│   │   ├── paypal.ts           # PayPal SDK integration
│   │   └── whatsapp.ts         # WhatsApp floating button
│   │
│   └── main.ts                 # Application entry point & orchestration
│
├── public/                     # Static assets (auto-created by Vite)
│
├── dist/                       # Production build output (generated)
│
├── index.html                  # HTML entry point with SEO meta tags
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
└── PROJECT_STRUCTURE.md        # This file
```

## File Descriptions

### Configuration Files

- **`package.json`**: Project dependencies, scripts, and metadata
- **`tsconfig.json`**: TypeScript compiler options (strict mode enabled)
- **`vite.config.ts`**: Vite build tool configuration
- **`.gitignore`**: Files and folders excluded from version control

### Source Files (`src/`)

#### Components (`src/components/`)
Each component is a TypeScript class that accepts typed content and returns HTML strings:

- **`Hero.ts`**: Landing hero with headline, subheadline, description, and CTA
- **`Methodology.ts`**: Renders translation card pairs (TEETH → DIENTES)
- **`Morphology.ts`**: Displays word morphology breakdown (TRANS-PORT-AR)
- **`WordDetective.ts`**: Shows word evolution flow (CAT → GATO)
- **`Etymology.ts`**: Etymology storytelling (algodón → cotton)

#### Data (`src/data/`)
- **`content.ts`**: All page content in a typed structure, separated from logic

#### Styles (`src/styles/`)
- **`main.css`**: Complete stylesheet with:
  - CSS custom properties (variables) for theming
  - Responsive design with mobile-first approach
  - Smooth transitions and animations
  - Component-specific styles

#### Types (`src/types/`)
- **`interfaces.ts`**: TypeScript interfaces for:
  - Content structures (Hero, Methodology, etc.)
  - Configuration objects (PayPal, WhatsApp)
  - Component props

#### Utils (`src/utils/`)
- **`paypal.ts`**: PayPal SDK integration class with payment handling
- **`whatsapp.ts`**: WhatsApp floating button component

#### Main Entry
- **`main.ts`**: Application orchestration:
  - Initializes all components
  - Renders content to DOM
  - Sets up PayPal and WhatsApp
  - Adds scroll animations

### Root Files

- **`index.html`**: Semantic HTML5 structure with:
  - SEO meta tags
  - Open Graph tags
  - Navigation
  - PayPal container
  - Footer

## Data Flow

```
content.ts (data)
    ↓
interfaces.ts (types)
    ↓
Component classes (logic)
    ↓
main.ts (orchestration)
    ↓
index.html (DOM)
```

## Build Output

When you run `npm run build`, Vite generates:

```
dist/
├── assets/
│   ├── index-[hash].js      # Bundled JavaScript
│   └── index-[hash].css     # Bundled CSS
└── index.html               # Optimized HTML
```

## Scalability Notes

- **Adding Content**: Update `src/data/content.ts`
- **New Component**: Create in `src/components/`, add interface, import in `main.ts`
- **Styling**: Modify CSS variables in `main.css` for global changes
- **Types**: Add to `src/types/interfaces.ts` for type safety
- **Utilities**: Add reusable logic to `src/utils/`

This structure ensures:
- ✅ Separation of concerns
- ✅ Type safety throughout
- ✅ Easy content updates
- ✅ Scalable component architecture
- ✅ Production-ready build process
