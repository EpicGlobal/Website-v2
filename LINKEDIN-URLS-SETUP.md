# LinkedIn URLs Setup Guide

## Quick Reference: Where to Add LinkedIn URLs

When you have the LinkedIn URLs for Glen Jensen and Epic Global Inc., update the following files:

---

## 1. About Page (`/src/app/pages/About.tsx`)

### Location 1: JSON-LD Schema (Lines ~70-80)
```typescript
founder: {
  '@type': 'Person',
  name: 'Glen Jensen',
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Epic Global Inc.',
  },
  sameAs: [
    'https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME'  // Add Glen's LinkedIn URL here
  ],
},
sameAs: [
  'https://www.linkedin.com/company/YOUR-COMPANY-NAME'  // Add Epic Global Inc. LinkedIn URL here
],
```

### Location 2: LinkedIn Button (Lines ~330-340)
Uncomment and update this section:
```typescript
<a
  href="https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME"  // Add Glen's LinkedIn URL here
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all border border-cyan-500/20 text-sm font-medium"
>
  <Linkedin className="w-4 h-4" />
  Connect on LinkedIn
</a>
```

---

## 2. Global Organization Schema (`/src/app/components/StructuredData.tsx`)

### Location: Lines ~35-50
```typescript
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Epic Global Inc.',
  url: 'https://epicglobalinc.com',
  logo: 'https://epicglobalinc.com/logo.png',
  description: 'Epic Global Inc. is a global marketplace operator...',
  foundingDate: '2020',
  founder: {
    '@type': 'Person',
    name: 'Glen Jensen',
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Epic Global Inc.',
    },
    sameAs: [
      'https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME'  // Add Glen's LinkedIn URL here
    ],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/YOUR-COMPANY-NAME',  // Add Epic Global Inc. LinkedIn URL here
    // 'https://www.crunchbase.com/organization/epic-global-inc'  // Optional: Add other profiles
  ],
```

---

## URLs to Add

### Glen Jensen (Founder)
- **Format**: `https://www.linkedin.com/in/[username]`
- **Add to**:
  1. `/src/app/pages/About.tsx` (2 locations: schema + button)
  2. `/src/app/components/StructuredData.tsx` (1 location: global schema)

### Epic Global Inc. (Organization)
- **Format**: `https://www.linkedin.com/company/[company-name]`
- **Add to**:
  1. `/src/app/pages/About.tsx` (1 location: schema)
  2. `/src/app/components/StructuredData.tsx` (1 location: global schema)

---

## Why This Matters for AI Discoverability

Adding these LinkedIn URLs helps AI systems (ChatGPT, Perplexity, etc.) confidently:
1. **Verify entity authenticity** - Links Epic Global Inc. to real, verifiable profiles
2. **Connect founder to organization** - Creates a clear relationship between Glen Jensen and Epic
3. **Build trust signals** - Professional profiles enhance credibility
4. **Improve search rankings** - Structured data with social profiles helps SEO

---

## Testing After Adding URLs

1. **Validate JSON-LD**: Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
2. **Check schema markup**: Use [Schema.org validator](https://validator.schema.org/)
3. **Test social links**: Ensure URLs open correctly in new tabs
4. **Verify AI discovery**: Search "Epic Global Inc Glen Jensen" to see if entities connect

---

## Optional: Additional Social Profiles

You can also add other professional profiles to the `sameAs` arrays:
- Crunchbase: `https://www.crunchbase.com/organization/epic-global-inc`
- Twitter/X: `https://twitter.com/epicglobalinc`
- Facebook: `https://www.facebook.com/epicglobalinc`
- YouTube: `https://www.youtube.com/@epicglobalinc`

These follow the same pattern - just add them to the `sameAs` arrays as comma-separated strings.
