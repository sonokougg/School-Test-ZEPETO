import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Collider, Quaternion, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class Teleport extends ZepetoScriptBehaviour {

    private zepetoCharacter : ZepetoCharacter;

    Start() {   
        // Set Local zepeto character 
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(()=>{
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
    }

    OnTriggerEnter(collider: Collider) {
        if(this.zepetoCharacter == null || collider.gameObject != this.zepetoCharacter.gameObject)
            return;
        
        // Teleport
        this.zepetoCharacter.Teleport(new Vector3(0,0,0), Quaternion.identity);
    }

}