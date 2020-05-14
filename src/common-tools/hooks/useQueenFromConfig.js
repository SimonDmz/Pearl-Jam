import { useEffect } from 'react';

const useQueenFromConfig = url => {
  useEffect(() => {
    const scripts = [];
    fetch(url)
      .then(response => response.json())
      .then(conf => {
        localStorage.setItem('QUEEN_URL', conf.urlQueen);
        fetch(`${conf.urlQueen}/asset-manifest.json`)
          .then(res => res.json())
          .then(data => {
            const jsFiles = data.entrypoints;
            jsFiles.map(scriptUrl => {
              const script = document.createElement('script');
              script.src = `${conf.urlQueen}${scriptUrl}`;
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
