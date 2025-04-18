# P3 Color Converter

A web tool for converting standard sRGB colors to Display P3 format, building P3 gradients, and converting color palettes.

## Why Display P3?

Display P3 color space offers approximately 50% more colors than the traditional sRGB color space, allowing for more vibrant and saturated colors on compatible devices. Modern devices like recent iPhones, iPads, and Macs can display these richer colors, but there aren't many accessible tools for web developers to easily convert their existing colors to P3 format.

## Features

- **P3 Color Converter**: Convert any hex, RGB, or HSL color to Display P3 format
- **P3 Gradient Builder**: Create beautiful gradients using the wider P3 color gamut
- **Shadcn Color Converter**: Convert Shadcn UI color palettes to P3 format
- **Interactive Preview**: Compare sRGB and Display P3 colors side by side
- **CSS Export**: Easily export your colors as CSS variables

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

This project is built with:

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Culori](https://culorijs.org/) - Color conversion library
- [TypeScript](https://www.typescriptlang.org/) - For type safety

## Learn More

- [P3 Color Space](https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/) - Apple's WebKit blog on Display P3
- [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) - The CSS specification that includes Display P3

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
