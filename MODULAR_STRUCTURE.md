# Modular Structure Documentation

This document outlines the new modular structure of the startup registration form.

## File Structure

```
├── lib/
│   ├── types.ts              # TypeScript interfaces and types
│   ├── constants.ts          # Dropdown options and constants
│   └── formUtils.ts         # Form data normalization and submission utilities
├── hooks/
│   └── useFormData.ts       # Custom hook for form state management
├── components/
│   └── forms/
│       ├── index.ts         # Export barrel for clean imports
│       ├── BasicInfoSection.tsx
│       ├── AddressSection.tsx
│       ├── ProductSection.tsx
│       ├── RevenueFundingSection.tsx
│       ├── EventIntentSection.tsx
│       └── ContactSection.tsx
└── app/register/
    └── page.tsx            # Main entry point using modular components
```

## Components Overview

### 1. **BasicInfoSection**
- Handles startup name, website URL, DPIIT number
- Manages file uploads (pitch deck, logo, banner)
- Uses `handleRootChange` for direct form data updates

### 2. **AddressSection**
- Manages address fields (street, city, state, pincode)
- Uses `handleNestedChange` for nested object updates

### 3. **ProductSection**
- Handles dynamic product list with add/remove functionality
- Manages product details, images, and media uploads
- Uses `handleProductChange` for product-specific updates

### 4. **RevenueFundingSection**
- Manages revenue bracket and user impact
- Handles funding type selection
- Uses `handleNestedChange` for nested updates

### 5. **EventIntentSection**
- Handles participation motivation and expectations
- Manages consent checkbox
- Uses `handleNestedChange` for nested updates

### 6. **ContactSection**
- Manages SPOC (Single Point of Contact) details
- Handles director information
- Uses `handleNestedChange` for nested updates

## Key Benefits

1. **Separation of Concerns**: Each component handles a specific section of the form
2. **Reusability**: Components can be easily reused or modified independently
3. **Maintainability**: Easier to debug and update specific sections
4. **Type Safety**: Strong TypeScript typing throughout
5. **Clean Imports**: Barrel exports for cleaner import statements
6. **Centralized State**: Custom hook manages all form state logic
7. **Utility Functions**: Separated business logic from UI components

## Usage

The main `page.tsx` now serves as a clean entry point that:
- Imports all necessary components
- Uses the `useFormData` hook for state management
- Handles form submission with utility functions
- Renders all form sections in a logical order

## Future Enhancements

- Add form validation schemas
- Implement form persistence
- Add loading states
- Create reusable form field components
- Add unit tests for each component
