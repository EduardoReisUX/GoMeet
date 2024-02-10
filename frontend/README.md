This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learnings

### nextjs client route

O arquivo, dentro de `src/app/`, que possui o nome "page.tsx" é uma página do next. Se algum arquivo com esse nome estiver dentro de uma pasta mais profunda, como em `.../room/[id]/page.tsx`, então o *route param* dessa página é seu id.

### use client

Quando utilizamos o `'use client'` dentro de um componente, significa que ele será renderizado pelo cliente. Isso acontecerá quando o componente possui um comportamento dinâmico definido pelos states do react.

### useRef

O hook `useRef` previne que o componente input renderize todas as vezes que o usuário digitar algo.

## Links

- [Real-time communication for the web](https://webrtc.org/)
- [Primeiros passos com as conexões de peering](https://webrtc.org/getting-started/peer-connections?hl=pt-br#initiating_peer_connections)
- [Repositório Semana do Herói 03](https://github.com/HeroCodeBR/semana-heroi-03)
- [STUN server](https://en.wikipedia.org/wiki/STUN)