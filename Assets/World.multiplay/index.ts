import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { Player, Transform, Vector3 } from "ZEPETO.Multiplay.Schema";
import { DataStorage } from "ZEPETO.Multiplay.DataStorage";

export default class extends Sandbox {

    onCreate(options: SandboxOptions) {
        this.onMessage("onChangedTransform",(client,message)=>{
            const player = this.state.players.get(client.sessionId);

            const transform = new Transform();
            transform.position = new Vector3();
            transform.position.x = message.position.x;
            transform.position.y = message.position.y;
            transform.position.z = message.position.z;

            transform.rotation = new Vector3();
            transform.rotation.x = message.rotation.x;
            transform.rotation.y = message.rotation.y;
            transform.rotation.z = message.rotation.z;

            if(!player) {
                console.log(`Player with sessionId ${client.sessionId} not found`);
                return;
            }
            player.transform = transform;
        })

        this.onMessage("onChangedState", (client, message) => {
            const player = this.state.players.get(client.sessionId);
            if(!player) {
                console.log(`Player with sessionId ${client.sessionId} not found`);
                return;
            }
            player.state = message.state;
        }
        )
    }

    async onJoin(client: SandboxPlayer) {
        console.log(`[OnJoin] sessionId: ${client.sessionId}, HashCode: ${client.hashCode}, userId: ${client.userId}`);

        const player = new Player();
        player.sessionId = client.sessionId;

        if(client.hashCode) {
            player.zepetoHash = client.hashCode;
        }
        if(client.userId) {
            player.zepetoUserId = client.userId;
        }
        const storage: DataStorage = client.loadDataStorage();

        let visit_cnt = await storage.get("VisitCount") as number;
        if(visit_cnt == null) visit_cnt = 0;

        console.log(`[OnJoin] sessionId: ${client.sessionId}'s visiting count : ${visit_cnt}`);

        await storage.set("VisitCount", ++visit_cnt);

        this.state.players.set(client.sessionId, player);
    }

    onLeave(client: SandboxPlayer, consented?: boolean) {
        this.state.players.delete(client.sessionId);
    }
}