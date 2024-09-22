import { Example } from '../common';
import dedent from 'dedent';

export const getExample = (): Array<Example> => {
  return [
    {
      text: dedent`
          for some reason I do terrible work in offices, doesn't matter if they are open or closed

          i love them for snacks and socializing tho
          `,
      output: dedent`
          For some reason, I always struggle to produce quality work in office environments. It doesn't matter if they're open or closed.

          However, I do appreciate offices for the snacks and socializing opportunities they provide.
          `,
    },
    {
      text: dedent`
          Two things I know I love for sure:

          Hiking and backpacking. I can get up at 04.00 a.m. to hike, and I get up excited.

          Coding. I can prioritize coding over everything—even dismiss marketing. 

          You?
          `,
      output: dedent`
          There are two things that I absolutely love:

          1) Hiking and backpacking. I am willing to wake up at 4:00 a.m. just to hit the trails, and I feel an overwhelming sense of excitement.

          2) Coding. I prioritize coding above everything else, even marketing.

          How about you? What are your passions?
          `,
    },
    {
      text: dedent`
          Da real struggle for solopreneurs ain't just time

          It's more 'bout keepin' yourself accountable with no outside forces

          And stayin' motivated when things get mad stressful

          It's pretty tough, fo' real 😅
          `,
      output: dedent`
          The real difficulty for solopreneurs isn't just time

          It's more about keeping yourself accountable with no outside forces

          And staying motivated when things seem stressful

          It's quite tough indeed 😅
          `,
    },
  ];
};
