import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ChakraProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  );
} else {
  console.error("Root element not found");
}


