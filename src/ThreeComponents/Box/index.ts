/*
 * @Description:
 *
 * @Author: jinc
 * @Date: 2024-04-18 14:42:06
 * @LastEditors: jinc
 * @LastEditTime: 2024-04-18 14:47:13
 * @FilePath: index.ts
 *
 * Copyright (c) 2024 by jinc, All Rights Reserved.
 */
import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export const Box = () => {
  // 创建一个立方体几何对象
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new Mesh(geometry, material);

  const render = () => {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  };
  return {
    mesh,
    render
  };
};
