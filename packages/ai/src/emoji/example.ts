import { Example } from '../common';
import dedent from 'dedent';

export const getExample = (): Array<Example> => {
  return [
    {
      text: dedent`
      It took 4 years to get here, but we did it:

      $83,333+/mo revenue

      11,996 customers
      740 payments/mo
      208 cron jobs
      $115 avg payment

      ($83k is special because * 12 is $1M)
      `,
      output: dedent`
      It took 4 years to get here, but we did it:

      $83,333+/mo revenue

      💳 11,996 customers
      💸 740 payments/mo
      🤖 208 cron jobs
      🧧 $115 avg payment

      ($83k is special because * 12 is $1M)
      `,
    },
    {
      text: dedent`
      Today - Mar 22 ⇢ https://twitch.tv/serudda

      Side Project Review - GPTube by @node_srojas1
      News about http://twon.app
      We talk about the new Side Project
      `,
      output: dedent`
      Today - Mar 22 ⇢ https://twitch.tv/serudda

      🚀 Side Project Review - GPTube by @node_srojas1
      😎 News about http://twon.app
      🤗 We talk about the new Side Project
      `,
    },
    {
      text: dedent`
      Creating side projects not only hones my programming skills but also propels the refinement of various other abilities.

      In particular, my design proficiency is skyrocketing, progressing by leaps and bounds.

      Innovation and mastery are becoming second nature to me.
      `,
      output: dedent`
      Creating side projects not only hones my programming skills 💻 but also propels the refinement of various other abilities.

      In particular, my design proficiency is skyrocketing 🚀, progressing by leaps and bounds.

      Innovation and mastery are becoming second nature to me.
      `,
    },
    {
      text: dedent`
      Another Hackagu session with 19 Indiehackers demoing what they've worked on today

      Always great to see others building their products, giving thoughts and advice and collectively learning from each other!
      `,
      output: dedent`
      Another Hackagu session with 19 Indiehackers demoing what they've worked on today 🔥

      👉 Always great to see others building their products, giving thoughts and advice and collectively learning from each other! 💪
      `,
    },
  ];
};
