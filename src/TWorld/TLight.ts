/*
 * @Description:
 *
 * @Author: 贪玩的大橙子
 * @Date: 2024-04-19 11:55:23
 * @LastEditors: 贪玩的大橙子
 * @LastEditTime: 2024-04-20 07:54:15
 * @FilePath: TLight.ts
 *
 * Copyright (c) 2024 by 贪玩的大橙子, All Rights Reserved.
 */
import { DirectionalLight, Scene } from "three";

export class TLight {
  private scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene;
    this.createLight();
  }
  public createLight = () => {
    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 100);
    this.scene.add(light);
  };
}
