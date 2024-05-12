/*
 * @Description:
 *
 * @Author: 贪玩的大橙子
 * @Date: 2024-04-19 19:52:04
 * @LastEditors: 贪玩的大橙子
 * @LastEditTime: 2024-04-19 20:16:49
 * @FilePath: TOrbitController.ts
 *
 * Copyright (c) 2024 by 贪玩的大橙子, All Rights Reserved.
 */
import { Camera } from "three";
import { OrbitControls } from "three/addons";

export class TOrbitController {
  private camera: Camera;
  private canvas: HTMLCanvasElement;
  constructor(camera: Camera, canvas: HTMLCanvasElement) {
    this.camera = camera;
    this.canvas = canvas;
  }
  public createController = () => {
    return new OrbitControls(this.camera, this.canvas);
  };
}
