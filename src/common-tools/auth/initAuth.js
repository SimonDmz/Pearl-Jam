export const initAuth = () => {
  const configURL = `${window.location.origin}/configuration.json`;
  fetch(configURL)
    .then(response => response.json())
    .then(data => {
      switch (data.authenticationMode) {
        case 'anonymous':
          window.localStorage.setItem(
            'pearl-interviewer',
            JSON.stringify({
              name: 'Guest',
              idep: 'Guest-idep',
            })
          );
          break;

        case 'keycloak':
          console.log('not implemented yet');
          break;
        default:
      }
    });
};
