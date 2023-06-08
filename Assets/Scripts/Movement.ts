import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Time } from "UnityEngine";

export default class Movement extends ZepetoScriptBehaviour {
    public movingTime: number = 1;
    public movingRangeX: number = 0;
    public movingRangeY: number = 2;
    private delta: number = 0;
    private movingFlag: boolean = true;

    Update() {    
        this.delta += Time.deltaTime;
        if(this.delta >= this.movingTime)
        {
            this.delta = 0;
            this.movingFlag = !this.movingFlag;
        }

        if(this.movingFlag)
        {
            this.transform.Translate(this.movingRangeX * Time.deltaTime, this.movingRangeY * Time.deltaTime, 0);
        }
        else {
            this.transform.Translate(-1 * this.movingRangeX * Time.deltaTime, -1 * this.movingRangeY * Time.deltaTime, 0);
        }
    }

}