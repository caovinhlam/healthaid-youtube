This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Set up the Environment Variables

1. Create an account with [RapidApi](https://rapidapi.com/)
2. Subscribe to the following [API](https://rapidapi.com/ytdlfree/api/youtube-v31/)
3. Take note of ```X-RapidAPI-Key``` & ```X-RapidAPI-Host``` in your Header Parameters
4. Create a .env.local file with the following variables
   1. NEXT_PUBLIC_RAPID_API_KEY="X-RapidAPI-Key"
   2. NEXT_PUBLIC_RAPID_URL="X-RapidAPI-Host"
   3. NEXT_PUBLIC_API_ENDPOINT=
5. Paste ```X-RapidAPI-Key``` after NEXT_PUBLIC_RAPID_API_KEY
6. Paste ```X-RapidAPI-Host``` after NEXT_PUBLIC_RAPID_URL

### Running the Application

1. First, run the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Miscellaneous

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/youtube](http://localhost:3000/api/youtube). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`.