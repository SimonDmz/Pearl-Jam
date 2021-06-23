import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import {
  getMessages,
  getUserFromApi,
  markMessageADelete,
  markMessageAsRead,
} from './api/messageAPI';
import { getIdep } from './api/utils';
const StompJs = require('@stomp/stompjs');

const useMessageService = (cb, apiUrl, apiAuthMode) => {
  console.log('new MessageService : ', apiUrl, ' - ', apiAuthMode);
  const [apiUser, setApiUser] = useState(undefined);
  const [ouId, setOuId] = useState(undefined);
  const [idep, setIdep] = useState(undefined);
  const [fetchMessages, setFetchMessages] = useState(() => {});
  const [markAsRead, setMarkAsRead] = useState(() => {});
  const [markAsDeleted, setMarkAsDeleted] = useState(() => {});

  useEffect(() => {
    console.log('🤖get user from API');
    if (apiUrl && apiAuthMode) {
      getUserFromApi(apiUrl, apiAuthMode).then(res => {
        console.log('🤖user from API:');
        console.log(res);
        setApiUser(res);
      });
    } else {
      console.log('🤖missing api parameters');
    }
  }, [apiUrl, apiAuthMode]);

  useEffect(() => {
    const idepFromToken = getIdep();
    console.log('idepFromToken ', idepFromToken);
    setIdep(idepFromToken);
  }, []);

  useEffect(() => {
    if (apiUser && apiUser.organizationUnit) {
      setOuId(apiUser.organizationUnit.id);
      console.log('ouid = ', apiUser.organizationUnit.id);
    } else {
      console.log('pb with apiUser : ', apiUser);
    }
  }, [apiUser]);

  useEffect(() => {
    const fetchMessagesService = () => {
      console.log(apiUrl, ' ~ ', apiAuthMode);
      getMessages(apiUrl, apiAuthMode)
        .then(res => res.json())
        .then(data => {
          console.log('fetched messages ', data);
          cb(data);
        });
    };

    const markAsReadService = id => {
      // IDB

      // API
      markMessageAsRead(
        apiUrl,
        apiAuthMode
      )(id).then(res => {
        cb(res);
      });
    };

    const markAsDeletedService = id => {
      // IDB

      // API
      markMessageADelete(
        apiUrl,
        apiAuthMode
      )(id).then(res => {
        cb(res);
      });
    };

    const listenToWS = () => {
      const callback = message => {
        // called when the client receives a STOMP message from the server
        if (message.body) {
          fetchMessagesService();
          console.log('got notif with body: ' + message.body);
        } else {
          console.log('got empty message');
        }
      };

      const client = new StompJs.Client();

      client.webSocketFactory = () => new SockJS(`${apiUrl}/mywebsockets`);

      client.debug = str => console.log('WS debug : ', str);

      client.onConnect(() => {
        client.subscribe(`/notifications/${idep}`, callback);
        client.subscribe(`/notifications/${ouId}`, callback);
      });

      client.activate();
    };
    const launchWebSocket = () => {
      console.log('🚀 launch webSocket 🚀');
      listenToWS(cb);
      setFetchMessages(fetchMessagesService);
      setMarkAsRead(markAsReadService);
      setMarkAsDeleted(markAsDeletedService);
    };

    if (apiUrl && cb && idep && ouId) {
      launchWebSocket();
    } else {
      console.log('missing arguments for websocket');
    }
  }, [apiAuthMode, apiUrl, cb, idep, ouId]);

  return { fetchMessages, markAsRead, markAsDeleted };
};

export default useMessageService;
