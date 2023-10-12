<h1 align="center">Hi 👋, we're FrontendCafé</h1>

A community of people interested in technology and computing where we talk about programming languages, web design, infrastructure, we share doubts, we ask and we answer.

## Project Links

- Website: [https://frontend.cafe/](https://frontend.cafe/)
- CSM Dashboard: [https://frontend.cafe/studio](https://frontend.cafe/studio)
<!-- - Storybook:  -->

## Languages and Tools

<a href="https://www.typescriptlang.org/" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" alt="TypeScript" title='TypeScript' width="40" height="40"/>
</a>
<a href="https://react.dev/" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="React" title="React" width="40" height="40"/>
</a>
<a href="https://nextjs.org/" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="NextJS" title="NextJS" width="40" height="40"/>
</a>
<a href="https://tailwindcss.com/" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" alt="Tailwind CSS" title="Tailwind CSS" width="40" height="40"/>
</a>
<a href="https://www.sanity.io/" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/sanity.svg" alt="Sanity" title="Sanity" width="40" height="40"/>
</a>
<a href="https://storybook.js.org/" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/storybook-1.svg" alt="Storybook" title="Storybook" width="40" height="40"/>
</a>

## Getting Started

These instructions will help you install and run the project locally.

### Prerequisites

Before you run the project, make sure that you have the following tools and software installed on your computer:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) `20.8.0+`
- [PNPM](https://pnpm.io/installation) `v8.x`
- [Vercel CLI](https://vercel.com/docs/cli#installing-vercel-cli)

### Installation

To install the project on your local machine, follow these steps:

1. Clone the repository.

   ```bash
   git clone https://github.com/hifrontendcafe/website.git
   ```

2. Navigate to the project directory.

   ```bash
   cd website
   ```

3. Install project dependencies by running the command:

   ```bash
   pnpm install
   ```

4. Get the enviroment variables from Vercel.

   > [!NOTE]
   > Contact an administrator to request environment variables; if you already have been granted access to the Vercel's project, just run it.

   ```bash
   vercel env pull
   ```

   > [!IMPORTANT]
   > Make sure you run it in the project directory!

5. Link the local repository with the Vercel project.

   ```bash
   vercel link --yes -S hifrontendcafe -p website
   ```

### Running locally

To run the project, follow these steps:

1. Start the development server by executing the command:

   ```bash
   pnpm run dev
   ```

2. Open a web browser and navigate to [`http://localhost:3000`](https://localhost:3000/) to view the project's home page.

## Connect with us

<a href="https://twitter.com/frontendcafe" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/twitter-3.svg" alt="FrontendCafé Twitter" height="30" width="30" />
</a>
<a href="https://www.linkedin.com/company/frontendcafe/" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg" alt="FrontendCafé LinkedIn" height="30" width="30" />
</a>
<a href="https://discord.gg/frontendcafe" target="_blank" style="margin:0px 6px">
  <img src="https://cdn.worldvectorlogo.com/logos/discord.svg" alt="FrontendCafé Discord" height="30" width="30" />
</a>

<br/>

<a href="https://twitter.com/frontendcafe" target="_blank" style="margin:0px 6px">
  <img src="https://img.shields.io/twitter/follow/frontendcafe?logo=twitter&style=for-the-badge" alt="FrontendCafé Twitter" />
</a>

---

<a href="https://vercel.com/?utm_source=hifrontendcafe&utm_campaign=oss" style="margin:0px 6px" >
  <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by Vercel" title="Powered by Vercel" />
</a>
<a href="https://sanity.io" style="margin:0px 6px" >
  <img src="https://cdn.sanity.io/images/3do82whm/next/51af00784c5addcf63ae7f0c416756acca7e63ac-353x71.svg?w=190&fm=png&dl=sanity-logo.png" alt="Sanity" title="Sanity" />
</a>
