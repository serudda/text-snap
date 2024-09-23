import { useEffect, useState } from 'react';
import { GetUserOperatingSystem, OperatingSystem } from '~/common';

export const RootFooter = () => {
  const currentOs = GetUserOperatingSystem();

  const prompts = [
    'Enhance your text instantly',
    'Transform your words now',
    'Make your message shine',
    'Upgrade your writing quickly',
    'Elevate your text effortlessly',
    'Polish your prose with ease',
    'Boost your content instantly',
    'Refine your sentences now',
    'Optimize your words quickly',
    'Improve your text in a snap',
  ];

  const [randomPrompt, setRandomPrompt] = useState(prompts[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * prompts.length);

    setRandomPrompt(prompts[randomIndex]);
  }, []);

  return (
    <footer className="grid place-items-center gap-4">
      <div className="flex select-none items-center gap-2 text-neutral-500">
        {randomPrompt}
        <kbd className="flex items-center rounded-md bg-neutral-900 p-2 text-xs">
          {currentOs === OperatingSystem.windows ? 'CTRL' : '⌘'}
        </kbd>
        <kbd className="flex aspect-square items-center rounded-md bg-neutral-900 p-2 text-xs">K</kbd>
      </div>
      <p className="mb-6 text-center text-lg font-semibold text-neutral-200">
        With 💘 from&nbsp;
        <a href="https://x.com/serudda" className="text-primary-300 transition-colors hover:text-primary-200">
          @serudda
        </a>
        &nbsp;and&nbsp;
        <a href="https://x.com/zyruks" className="text-primary-300 transition-colors hover:text-primary-200">
          @zyruks
        </a>
      </p>
    </footer>
  );
};
