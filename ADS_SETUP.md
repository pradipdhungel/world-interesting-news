# Advertising Setup

The site is ad-ready. Until AdSense approves the site and slot IDs are configured, visitors see clearly labeled placeholder ad blocks.

## 1. Apply For AdSense

Apply at https://www.google.com/adsense/start/.

Use the live site URL:

```text
https://world-interesting-news.onrender.com/
```

## 2. Add Render Environment Variables

After AdSense approval, create display ad units and add these variables in Render:

```text
GOOGLE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
AD_SLOT_HOME_TOP=1234567890
AD_SLOT_FEED_INLINE=1234567890
AD_SLOT_SIDEBAR=1234567890
AD_SLOT_ARTICLE_INLINE=1234567890
AD_SLOT_ARTICLE_SIDEBAR=1234567890
AD_SLOT_FOOTER=1234567890
```

Only use real values from your AdSense account.

## 3. Current Placements

- Homepage top banner
- Homepage latest-feed inline placement
- Homepage sidebar placement
- Article inline placement after key points
- Article sidebar placement

All ad blocks are labeled "Advertisement" and avoid deceptive labels.

## 4. Important Policy Notes

- Do not click your own ads.
- Do not ask visitors to click ads.
- Do not label ads as news, menu items, downloads, or recommendations.
- Keep enough original content around each ad.
- Keep Privacy, Terms, Contact, Editorial Policy, and Corrections pages public.
