# Spanish from the Jump

A modern, production-ready landing page for a Spanish tutoring service built with TypeScript, Vite, and modern web standards.

## 🚀 Features

- **TypeScript-First Architecture**: Fully typed components and data structures
- **Modular Component System**: Scalable, reusable component architecture
- **Modern CSS**: CSS Variables for theming, responsive design, smooth animations
- **PayPal Integration**: Secure payment processing with PayPal SDK
- **WhatsApp Integration**: Floating contact button for instant communication
- **SEO Optimized**: Semantic HTML, meta tags, and structured data
- **Performance Focused**: Vite for lightning-fast builds and HMR
- **Responsive Design**: Mobile-first approach with breakpoints

## 📁 Project Structure

```
spanish-from-the-jump/
├── src/
│   ├── components/          # UI Components
│   │   ├── Hero.ts
│   │   ├── Methodology.ts
│   │   ├── Morphology.ts
│   │   ├── WordDetective.ts
│   │   └── Etymology.ts
│   ├── data/               # Content Data
│   │   └── content.ts
│   ├── styles/             # Stylesheets
│   │   └── main.css
│   ├── types/              # TypeScript Interfaces
│   │   └── interfaces.ts
│   ├── utils/              # Utility Functions
│   │   ├── paypal.ts
│   │   └── whatsapp.ts
│   └── main.ts             # Application Entry Point
├── index.html              # HTML Template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Tech Stack

- **TypeScript**: Type-safe development
- **Vite**: Next-generation frontend tooling
- **CSS3**: Modern styling with variables and animations
- **PayPal SDK**: Payment integration
- **HTML5**: Semantic markup

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🏃 Development

```bash
# Start development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

### PayPal Setup

1. Get your PayPal Client ID from [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Update the `clientId` in `src/main.ts`:

```typescript
const paypalConfig: PayPalConfig = {
  clientId: 'YOUR_PAYPAL_CLIENT_ID', // Replace with your actual Client ID
  currency: 'USD',
  intent: 'capture',
};
```

### WhatsApp Setup

Update the WhatsApp configuration in `src/main.ts`:

```typescript
const whatsappConfig: WhatsAppConfig = {
  phoneNumber: '1234567890', // Replace with your WhatsApp number (include country code)
  message: 'Hi! I\'m interested in learning Spanish through your translation method.',
};
```

## 🎨 Customization

### Colors & Theming

All design tokens are defined as CSS variables in `src/styles/main.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #f59e0b;
  --color-accent: #10b981;
  /* ... more variables */
}
```

### Content Management

All content is centralized in `src/data/content.ts`. Update the `landingPageContent` object to modify:

- Hero section text
- Translation examples
- Morphology examples
- Word evolution steps
- Etymology stories

### Adding New Sections

1. Create an interface in `src/types/interfaces.ts`
2. Add content to `src/data/content.ts`
3. Create a component in `src/components/`
4. Import and render in `src/main.ts`

## 🏗️ Component Architecture

Each component follows a class-based pattern:

```typescript
export class ComponentName {
  private content: ContentType;

  constructor(content: ContentType) {
    this.content = content;
  }

  render(): string {
    return `<!-- HTML template -->`;
  }
}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🚢 Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the production-ready files
```

Deploy the `dist/` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Cloudflare Pages

## 🔒 Security Notes

- Never commit your PayPal Client ID to version control
- Use environment variables for sensitive data in production
- Implement server-side validation for payments

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💻 Author

Created by Andy - Spanish from the Jump

---

**Note**: This is a portfolio-ready, production-grade implementation showcasing modern frontend architecture and best practices.
