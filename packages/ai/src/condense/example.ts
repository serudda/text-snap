import { type Example } from '../common';
import dedent from 'dedent';

export const getExample = (): Array<Example> => {
  return [
    {
      text: dedent`
      My friend left his 9-5 job as a banker to pursue building an AI tool 🤖.

      With a month of Python learning under his belt, his determination is impressive. 

      However, he's also a parent with about a year's runway.

      I recommended he prioritize establishing his target audience or community first 🫂 and reserve the complex coding for later when the needs are confirmed.

      What do you think? 
      Any advice for my buddy?
      `,
      output: dedent`
      My pal quit banking for AI development 🤖.

      After a month of Python study, he's determined.

      But he's a parent with limited time.

      I suggested focusing on the audience 🫂 and delaying complex coding until needs are certain.

      Thoughts? Advice for my friend?
      `,
    },
    {
      text: dedent`
      I have done an in depth analysis of the products of my favourite indie hackers within the buildinpublic community!

      The result is a forecast of revenue and / or profits for each until and of the year!

      The system is complex, yet simple! Taking all my knowledge from my MSc in Finance!

      Takes into account the market they are in, the moat / defensibility of idea, tech stack, pricing and marketing effort!

      I write their Twitter handle in the sand and count the waves until they touch their name!
      `,
      output: dedent`
      Analyzed favorite indie hackers' products in the buildinpublic community.

      Forecasted their revenue/profits for the year based on market, idea, tech, price, and marketing.

      Count waves touching their name in sand with Twitter handle.
      `,
    },
    {
      text: dedent`
      The plan for Obsidian is to never grow beyond 10-12 people, never take VC funding, never collect personal data or analytics.

      Continue building with the assumption that software is ephemeral, files matter more than apps. Use formats that are open and durable.

      See our manifesto. (please let us know whats your first impression 🙏)
      `,
      output: dedent`
      Obsidian's plan: 

      Stay small with 10-12 people, avoid VC funding, eschew personal data or analytics. 

      Build with files as priority over apps, using lasting, open formats. 

      Read our manifesto. (Impressions welcome! 🙏)
      `,
    },
  ];
};
