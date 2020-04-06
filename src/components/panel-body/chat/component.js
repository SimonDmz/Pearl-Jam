import React from 'react';
import Navigation from 'components/common/navigation';

const ChatPage = () => {
  return (
    <>
      <Navigation />
      <div className="panel-body chat">
        <iframe
          id="rocketChat"
          width="100%"
          height="100%"
          title="Rocket Chat"
          src="https://rocket-chat.stable.innovation.insee.eu/channel/pearl"
        />
      </div>
    </>
  );
};

export default ChatPage;
