import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

// function subscribeToTimer(cb) {
//     socket.on('scraping-update', timestamp => cb(null, timestamp));
//     socket.emit('subscribeToTimer', 1000);
//   }
//   export { subscribeToTimer };

console.log('besh...')

  
socket.on('scraping-update', data => {
    console.log(data);
});

socket.on('socket-pub-sub-connected', () => {
    console.log('yes.....')
  // if (sessionType) {
  //     if (sessionType === 'new-session') {
  //         this.socket.emit('user:clean-duplicate-sessions');
  //     }
  //     this.conEmitter.emit(true);
  //     observer.next(sessionType);
  //     observer.complete();

  //     sessionType = null;
  // }
  // this.processUnprocessedEvents();
});

export {socket};