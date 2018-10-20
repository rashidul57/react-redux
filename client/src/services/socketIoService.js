import io from 'socket.io-client';
import { interval, BehaviorSubject } from 'rxjs';


class SocketIoService {
    uploadStatusSubject = new BehaviorSubject(null);

    init() {
        const socket = io.connect('/', { autoConnect: true, reconnectionAttempts: Infinity, rejectUnauthorized: true});;

        socket.on('scraping-update', data => {
            // console.log('scraping-update', data);
            // this.dispatchUploadProgress(data);
            this.uploadStatusSubject.next(data);
        });
        
        socket.on('socket-pub-sub-connected', () => {
            // console.log('yes.....socket-pub-sub-connected')
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

    getUploadStatus() {
        return this.uploadStatusSubject;
    }
}

const socketIoService = new SocketIoService();

export {socketIoService};