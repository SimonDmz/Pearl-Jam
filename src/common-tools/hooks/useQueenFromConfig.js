import { useEffect } from 'react';

const useQueenFromConfig = url => {
  useEffect(() => {
    const scripts = [];
    fetch(url)
      .then(response => response.json())
      .then(conf => {
        fetch(`${conf.urlQueen}/asset-manifest.json`)
          .then(res => res.json())
          .then(data => {
            const jsFiles = data.entrypoints;
            jsFiles.map(scriptUrl => {
              const script = document.createElement('script');
              script.src = scriptUrl;
              script.async = true;
              document.body.appendChild(script);
              scripts.push(script);
            });
          });
      });

    return () => {
      for (const scriptElement in scripts) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [url]);
};

export default useQueenFromConfig;
