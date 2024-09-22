import { type Example } from '../common';
import dedent from 'dedent';

export const getExample = (): Array<Example> => {
  return [
    {
      text: dedent`
      wasnt a skit btw, i literally showed up at the exact moment they pulled me up on stage. sry for stressing everyone out. woke up in terrible shape, 35 mins before start time. ps: ill be on adins thing for a little, lets see what happens
      `,
      output: dedent`
      It was not a skit, by the way. I literally arrived at the exact moment they called me onto the stage. I apologize for causing stress to everyone. I woke up in poor condition, 35 minutes before the start time. P.S.: I will be participating in Adin's event for a while; let us see what happens.
      `,
    },
    {
      text: dedent`
      That’s how I envisioned the tooltips hover states for the hero section

      Not sure if I’ll keep that but it was worth exploring this concept
      `,
      output: dedent`
      That is how I envisioned the tooltip hover states for the hero section.

      I am uncertain if I shall maintain that, but it was worth exploring this concept.
      `,
    },
    {
      text: dedent`
      8 PM: "I'm so tired,  I'll go to bed early!"
      8:20 PM: "I'll just code a small POC for a feature..."
      22:30 PM: 🤦🏻‍♂️
      `,
      output: dedent`
      8 PM: "I am so tired, I shall go to bed early."
      8:20 PM: "I shall just code a small Proof of Concept for a feature..."
      22:30 PM: 🤦🏻‍♂️
      `,
    },
    {
      text: dedent`
      He's got 'em! He's got Hill! He's got Hill!
      `,
      output: dedent`
      He has got them! He has got Hill! He has got Hill!
      `,
    },
  ];
};
