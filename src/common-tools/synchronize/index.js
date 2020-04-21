const synchronizeQueen = () => {
  const data = { type: 'PEARL', command: 'SYNCHRONIZE' };
  const event = new CustomEvent('PEARL', { detail: data });
  window.dispatchEvent(event);
};

export const synchronize = async () => {
  synchronizeQueen();

  // TODO : pearl synch
};
