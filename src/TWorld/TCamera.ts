/*
 * @Description: Camera
 *
 * @Author: 贪玩的大橙子
 * @Date: 2024-04-19 11:21:20
 * @LastEditors: 贪玩的大橙子
 * @LastEditTime: 2024-05-12 09:47:09
 * @FilePath: TCamera.ts
 *
 * Copyright (c) 2024 by 贪玩的大橙子, All Rights Reserved.
 */
import { Camera, PerspectiveCamera, Vector3 } from "three";

export interface TCameraConfig {
  fov: number;
  aspect: number;
  near: number;
  far: number;
  position: Vector3;
}

export class TCamera {
  private config: TCameraConfig;

  constructor(cameraConfig: TCameraConfig) {
    this.config = {
      ...cameraConfig
    };
  }
  public createCamera(): Camera {
    const camera = new PerspectiveCamera(this.config.fov, this.config.aspect, this.config.near, this.config.far);
    camera.position.copy(this.config.position);
    return camera;
  }
}
