import io from 'socket.io-client'
import { PRODUCTION } from '../request'

const SOCKET_URL = PRODUCTION ? 'https://server.letrans-porteur.com' : 'http://localhost:3002'

class WSService {
    
    initializeSocket = async() => {
        try {

            this.socket = io(SOCKET_URL, {
                transports: PRODUCTION ? ["polling"] : ["websocket"]
                // transports: ["websocket", "polling", "webtransport"]
            })

            console.log('initializing socket', this.socket);

            this.socket.on('connect', (data) => {
                console.log("=== socket connected ===");
            })

            this.socket.on('disconnect', (data) => {
                console.log("=== socket disconnected ===");
            })

            this.socket.on('error', (data) => {
                console.log("socket error", data);
            })

        } catch (error) {
            console.log("socket is not initialized", error)
        }
    }

    emit(event, data = {}) {
        this.socket.emit(event, data)
    }
    on(event, callback) {
        this.socket.on(event, callback)
    }
    disconnect = ()=>{
        this.socket.on("disconnect", (reason) => {
            console.log(reason); 
            console.log("io client disconnect")
        });
        this.socket.disconnect();
    }
    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    }
    removeListeners() {
        this.socket.removeAllListeners()
    }
    close() {
        this.socket.close()
    }
}

const socketServices = new WSService();

export default socketServices;
export {WSService};