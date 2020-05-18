import { useEffect } from 'react';

const useQueenFromConfig = url => {
  const scripts = [];
  useEffect(() => {
    const importQueenScript = async () => {
      const response = await fetch(url);
      const { QUEEN_URL } = await response.json();

      window.localStorage.setItem('QUEEN_URL', QUEEN_URL);

      const manifest = await fetch(`${QUEEN_URL}/asset-manifest.json`);
      const { entrypoints } = await manifest.json();

      entrypoints.forEach(scriptUrl => {
        if (scriptUrl.endsWith('.js')) {
          const script = document.createElement('script');
          script.src = `${QUEEN_URL}/${scriptUrl}`;
          script.async = true;
          document.body.appendChild(script);
          scripts.push(script);
        }
      });
    };
    importQueenScript();

    return () => {
      scripts.forEach(scriptElement => document.body.removeChild(scriptElement));
    };
  }, [url]);
};

export default useQueenFromConfig;
