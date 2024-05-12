/*
 * @Description: TWorld 入口，3d相关内容的控制器
 * @Author: 贪玩的大橙子
 * @Date: 2024-04-18 14:42:06
 * @LastEditors: 贪玩的大橙子
 * @LastEditTime: 2024-05-12 12:21:32
 * @FilePath: TWorld.ts
 *
 * Copyright (c) 2024 by 贪玩的大橙子, All Rights Reserved.
 */
import { Camera, ColorRepresentation, Object3D, Renderer, Scene, Vector3 } from "three";

import { TAxesHelper, TAxesHelperConfig } from "./TAxesHelper";
import { TCamera, TCameraConfig } from "./TCamera";
import { TGrid, TGridConfig } from "./TGrid";
import { TLight } from "./TLight";
import { TOrbitController } from "./TOrbitController";
import { TRayCaster } from "./TRayCaster";
import { TRendererLines } from "./TRendererLines";

export interface TWorldConfig {
  canvas: HTMLCanvasElement;
  renderConfig: {
    clearColor: ColorRepresentation;
  };
  cameraConfig: TCameraConfig;
  gridConfig?: TGridConfig;
  axesHelperConfig?: TAxesHelperConfig;
}

export interface TObject {
  mesh: Object3D | Object3D[];
  render: () => void;
}

const defaultTWorldConfig: TWorldConfig = {
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  renderConfig: {
    clearColor: 0x000000
  },
  cameraConfig: {
    fov: 60,
    aspect: 1,
    near: 0.01,
    far: 5000,
    position: new Vector3(0, 0, 10)
  },
  gridConfig: {
    size: 1000,
    divisions: 400,
    color1: 0x444444,
    color2: 0x888888
  },
  axesHelperConfig: {
    size: 100
  }
};

export class TWorld {
  private config: TWorldConfig;

  public scene: Scene = new Scene();

  private renderer: Renderer;

  private camera: Camera;

  private renderList: (() => void)[] = [];

  constructor(enginConfig?: Partial<TWorldConfig>) {
    this.config = {
      ...defaultTWorldConfig,
      ...enginConfig
    };
    const { cameraConfig } = this.config;

    // 相机
    this.camera = new TCamera({
      fov: cameraConfig.fov,
      aspect: this.config.canvas.clientWidth / this.config.canvas.clientHeight,
      near: cameraConfig.near,
      far: cameraConfig.far,
      position: cameraConfig.position
    }).createCamera();
    // 渲染器
    this.renderer = new TRendererLines({
      canvas: this.config.canvas,
      clearColor: this.config.renderConfig.clearColor,
      scene: this.scene,
      camera: this.camera
    }).createRendererLines();

    // 键鼠控制器
    new TOrbitController(this.camera, this.config.canvas).createController();
    // 射线，用于鼠标交互
    new TRayCaster(this.config.canvas, this.camera, this.scene).createRaycaster();

    // 灯光
    new TLight(this.scene).createLight();

    // 网格
    if (this.config.gridConfig) {
      new TGrid(this.config.gridConfig).createGrid(this.scene);
    }
    // 坐标轴
    if (this.config.axesHelperConfig) {
      new TAxesHelper(this.config.axesHelperConfig).createAxesHelper(this.scene);
    }
  }

  // 渲染
  public animate() {
    this.renderList.forEach((item) => item());
    this.renderPipeline();
    requestAnimationFrame(this.animate.bind(this));
  }

  private renderPipeline() {
    this.renderer.render(this.scene, this.camera);
  }

  // 添加物体
  public addObject(object: TObject) {
    if (Array.isArray(object.mesh)) {
      this.scene.add(...object.mesh);
    } else {
      this.scene.add(object.mesh);
    }
    this.renderList.push(object.render);
  }
}
