const useQueenFromConfig = url => {
  const importQueenScript = async () => {
    const response = await fetch(url);
    let { QUEEN_URL } = await response.json();
    QUEEN_URL = 'http://localhost:5000';
    const script = document.createElement('script');
    script.src = `${QUEEN_URL}/entry.js`;
    document.body.appendChild(script);
  };
  importQueenScript();
};

export default useQueenFromConfig;
