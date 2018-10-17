import io from 'socket.io-client';


export class SocketIoService {
    static init() {
        debugger
        const socket = io.connect('/', { autoConnect: true, reconnectionAttempts: Infinity, rejectUnauthorized: true});;

        socket.on('scraping-update', data => {
            console.log('scraping-update', data);
        });
        
        socket.on('socket-pub-sub-connected', () => {
            console.log('yes.....socket-pub-sub-connected')
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
    }
}


// export {socket};