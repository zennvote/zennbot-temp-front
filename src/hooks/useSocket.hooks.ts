import io from 'socket.io-client';

export const useSocket = () => {
  const socket = io.connect(process.env.REACT_APP_SOCKET_URL ?? '', {
    transports: ['websocket'],
  });

  return socket;
};
