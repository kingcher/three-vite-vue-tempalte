/*
 * @Description:
 *
 * @Author: 贪玩的大橙子
 * @Date: 2024-04-19 11:15:13
 * @LastEditors: 贪玩的大橙子
 * @LastEditTime: 2024-05-12 12:29:25
 * @FilePath: TRendererLines.ts
 *
 * Copyright (c) 2024 by 贪玩的大橙子, All Rights Reserved.
 */
import { Camera, ColorRepresentation, PerspectiveCamera, Renderer, Scene, WebGLRenderer } from "three";

export interface RendererConfig {
  canvas: HTMLCanvasElement;
  clearColor: ColorRepresentation;
  scene: Scene;
  camera: Camera;
}

export class TRendererLines {
  public renderConfig: RendererConfig;
  constructor(renderConfig: RendererConfig) {
    this.renderConfig = renderConfig;
  }

  private onWindowResize = (canvas: HTMLCanvasElement, renderer: Renderer, camera: Camera) => {
    const container = canvas.parentElement || document.body;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const perspectiveCamera = camera as PerspectiveCamera;
    renderer.setSize(width, height);
    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();
  };

  public createRendererLines = () => {
    const { canvas, clearColor, camera } = this.renderConfig;
    const renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.setClearColor(clearColor);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    window.addEventListener("resize", () => {
      this.onWindowResize(canvas, renderer, camera);
    });
    return renderer;
  };
}
