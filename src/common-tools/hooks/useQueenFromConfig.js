import { useEffect } from 'react';

const useQueenFromConfig = url => {
  const scripts = [];
  useEffect(() => {
    const importQueenScript = async () => {
      const response = await fetch(url);
      const { urlQueen } = await response.json();

      window.localStorage.setItem('QUEEN_URL', urlQueen);

      const manifest = await fetch(`${urlQueen}/asset-manifest.json`);
      const { entrypoints } = await manifest.json();

      entrypoints.forEach(scriptUrl => {
        if (scriptUrl.endsWith('.js')) {
          const script = document.createElement('script');
          script.src = `${urlQueen}/${scriptUrl}`;
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
