import { useState, type ChangeEvent, type ReactElement } from 'react';
import { type NextPageWithLayout } from './_app';
import { RootLayout } from '~layout';
import { Resize, Textarea } from 'side-ui';

const Home: NextPageWithLayout = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <main>
      <div className="container mx-auto p-4">
        <Textarea
          className="bg-neutral-950 text-white"
          textareaClassName="placeholder:text-gray-400 hover:placeholder:text-gray-200 focus:placeholder:text-gray-200"
          placeholder="Start your journey..."
          styleless
          hasAutoSize
          resize={Resize.none}
          value={text}
          onChange={handleTextChange}
        />
      </div>
    </main>
  );
};

Home.getLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>;
export default Home;
