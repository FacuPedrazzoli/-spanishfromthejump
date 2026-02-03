# PayPal Integration Setup Guide

This guide follows the **official PayPal JavaScript SDK** documentation for integrating PayPal Checkout buttons.

## 📋 Prerequisites

1. A PayPal Business account
2. Access to PayPal Developer Dashboard

## 🔧 Setup Steps

### 1. Create a PayPal App

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Log in with your PayPal account
3. Navigate to **Apps & Credentials**
4. Choose **Sandbox** (for testing) or **Live** (for production)
5. Click **Create App**
6. Give your app a name (e.g., "Spanish from the Jump")
7. Click **Create App**

### 2. Get Your Client ID

After creating the app, you'll see:
- **Client ID** (this is what you need)
- **Secret** (keep this secure, not needed for frontend)

Copy the **Client ID**.

### 3. Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your PayPal Client ID:
   ```env
   VITE_PAYPAL_CLIENT_ID=your_actual_client_id_here
   ```

### 4. Testing with Sandbox

For development, use the **Sandbox** Client ID:

1. In PayPal Developer Dashboard, go to **Sandbox** → **Accounts**
2. You'll see test buyer and seller accounts
3. Use these credentials to test payments
4. Test cards are available at: [PayPal Test Cards](https://developer.paypal.com/tools/sandbox/card-testing/)

**Example Sandbox Test Account:**
- Email: `sb-buyer@personal.example.com`
- Password: (provided in dashboard)

### 5. Going Live

When ready for production:

1. Switch to **Live** in PayPal Developer Dashboard
2. Get your **Live Client ID**
3. Update `.env` with the Live Client ID
4. Test thoroughly before accepting real payments

## 🎨 Current Implementation

The integration follows PayPal's official pattern:

```typescript
// src/utils/paypal.ts
import { loadScript } from '@paypal/paypal-js';

// Load PayPal SDK
const paypal = await loadScript({
  clientId: config.clientId,
  currency: config.currency,
});

// Render PayPal Buttons
paypal.Buttons({
  style: {
    layout: 'vertical',
    color: 'gold',
    shape: 'rect',
    label: 'paypal',
    height: 45,
  },
  createOrder: (data, actions) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          value: '50.00',
          currency_code: 'USD',
        },
        description: 'Spanish from the Jump - Tutoring Session',
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  },
  onApprove: async (data, actions) => {
    const order = await actions.order.capture();
    // Show success message with transaction ID
  },
  onError: (err) => {
    // Handle errors
  },
  onCancel: () => {
    // User cancelled payment
  },
}).render('#paypal-button-container');
```

## 💰 Customizing Payment Amount

To change the payment amount, edit `src/utils/paypal.ts`:

```typescript
amount: {
  value: '50.00', // Change this value
  currency_code: 'USD',
}
```

## 🌍 Currency Support

To change currency, update both:

1. **Environment** (optional):
   ```env
   VITE_PAYPAL_CURRENCY=EUR
   ```

2. **Code** (`src/main.ts`):
   ```typescript
   const paypalConfig: PayPalConfig = {
     clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
     currency: 'EUR', // Change currency
     intent: 'capture',
   };
   ```

Supported currencies: USD, EUR, GBP, CAD, AUD, JPY, and [many more](https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/).

## 🔒 Security Best Practices

1. **Never commit** your Client ID to version control
2. Use environment variables (`.env` is in `.gitignore`)
3. For production, implement **server-side verification**
4. Consider adding **webhook handlers** for payment notifications
5. Store transaction records in a database

## 📚 Official Documentation

- [PayPal JavaScript SDK](https://developer.paypal.com/sdk/js/)
- [Checkout Integration Guide](https://developer.paypal.com/docs/checkout/)
- [Orders API](https://developer.paypal.com/docs/api/orders/v2/)
- [Sandbox Testing](https://developer.paypal.com/tools/sandbox/)

## 🐛 Troubleshooting

### Button Not Showing
- Check browser console for errors
- Verify Client ID is correct
- Ensure `#paypal-button-container` exists in HTML

### "Invalid Client ID" Error
- Confirm you're using the correct environment (Sandbox vs Live)
- Check for typos in `.env` file
- Restart dev server after changing `.env`

### Payment Not Processing
- Check PayPal account status
- Verify app is approved (for Live)
- Check browser console for detailed errors

## 🚀 Next Steps

1. Set up PayPal webhooks for payment notifications
2. Implement server-side order verification
3. Add database to store transaction records
4. Create admin panel to manage payments
5. Add email notifications for successful payments

---

**Note**: This implementation uses the official `@paypal/paypal-js` package and follows PayPal's recommended integration patterns.
