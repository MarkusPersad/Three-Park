import { Object3D } from "three";

export interface ModelProps{
    path:string,
    func?:(object:Object3D)=>void,
    scale?:number,
}