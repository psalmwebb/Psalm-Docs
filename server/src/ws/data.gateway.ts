import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';

import { UserService } from '../users/users.service';



@WebSocketGateway({cors:true})
export class DataGateway implements OnGatewayConnection,OnGatewayDisconnect{

    constructor(private userService:UserService){}


    handleConnection(client: any, ...args: any[]) {
        // console.log('Client connected')
    }

    handleDisconnect(client: any) {
        // console.log('Client Disconnected')
    }

    @SubscribeMessage('data')
    async onData(client:any, dataObj){
        let realDocId = await this.userService.insertIntoDoc(dataObj);
        client.emit('docId',realDocId);
        client.emit('saved','');
    }

    @SubscribeMessage('rename-doc')
    async onRenameDoc(client:any,dataObj){
        await this.userService.renameDoc(dataObj);
        client.emit('saved','');
    }
}