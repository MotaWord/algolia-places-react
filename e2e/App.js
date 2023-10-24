import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
} from 'rebass';
import { ThemeProvider } from 'styled-components';
import Markdown from 'react-markdown';
import FiredCallbacks from './FiredCallbacks';
import Autocomplete from './Autocomplete';

function App() {
  const [enabled, setEnabled] = useState(true);
  const [firedCallbacks, setFiredCallbacks] = useState([]);

  const handleReset = () => {
    setEnabled(false);
    setFiredCallbacks([]);
    setTimeout(() => {
      setEnabled(true);
    }, 100);
  };

  const addFiredCallback = ({ name, args }) => {
    setFiredCallbacks((prevFiredCallbacks) => [
      {
        name,
        args,
      },
      ...prevFiredCallbacks,
    ]);
  };

  return (
    <ThemeProvider theme={{ /* your theme object here */ }}>
      <>
        <a href="https://github.com/kontrollanten/algolia-places-react">
          {/* GitHub ribbon */}
        </a>
        <Heading pb={40}>Algolia Places React component in action</Heading>
        <Button onClick={handleReset} mb={20}>Reset</Button>
        <Flex mx={-2}>
          <Box width={1 / 3} px={2}>
            <Heading fontSize={3}>UI</Heading>
            {enabled && <Autocomplete onCallback={addFiredCallback} />}
            <Markdown>
              {
                `\`\`\`js
              <AlgoliaPlaces
                placeholder='Write an address here'
                onChange={handleChange}
                onClear={handleClear}
                onCursorChanged={handleCursorChanged}
                onError={handleError}
                onFocus={handleFocus}
                onLimit={handleLimit}
                onSuggestions={handleSuggestions}
              /
              
              \`\`\`
              `
              }
            </Markdown>
            <Link href="/api">
              Read API documentation here
            </Link>
          </Box>
          <Box width={2 / 3} px={2}>
            <FiredCallbacks callbacks={firedCallbacks} />
          </Box>
        </Flex>
      </>
    </ThemeProvider>
  );
}

export default App;
