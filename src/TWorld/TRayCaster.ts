/*
 * @Description:
 *
 * @Author: 贪玩的大橙子
 * @Date: 2024-04-19 19:56:52
 * @LastEditors: 贪玩的大橙子
 * @LastEditTime: 2024-04-19 22:01:52
 * @FilePath: TRayCaster.ts
 *
 * Copyright (c) 2024 by 贪玩的大橙子, All Rights Reserved.
 */
import { Camera, Object3D, Object3DEventMap, Raycaster, Scene, Vector2 } from "three";

export class TRayCaster {
  private canvas: HTMLCanvasElement;
  private camera: Camera;
  private scene: Scene;
  private pointerMoveEventCacheObj = new Map<string | number, Object3D>();
  private raycaster: Raycaster | undefined;

  constructor(canvas: HTMLCanvasElement, camera: Camera, scene: Scene) {
    this.canvas = canvas;
    this.camera = camera;
    this.scene = scene;
  }

  public createRaycaster = () => {
    const raycaster = new Raycaster();
    const container = this.canvas.parentElement || document.body;
    container.addEventListener("mousemove", (e) => this.triggerByPointer("hover", e));
    container.addEventListener("click", (e) => this.triggerByPointer("click", e));
    this.raycaster = raycaster;
    return raycaster;
  };

  private triggerByPointer = (type: "hover" | "click", event: PointerEvent | MouseEvent) => {
    const object3D = this.getObject3D(event);
    if (object3D) {
      // 触发相关事件
      if (type === "hover") {
        object3D.dispatchEvent({
          type: "mouseenter" as keyof Object3DEventMap
        });
      } else {
        object3D.dispatchEvent({ type: type as keyof Object3DEventMap });
      }
      this.pointerMoveEventCacheObj.set(object3D.id, object3D);
    } else {
      this.pointerMoveEventCacheObj.forEach((item) => {
        if (type === "hover") {
          item.dispatchEvent({
            type: "mouseleave" as keyof Object3DEventMap
          });
        }
      });
      this.pointerMoveEventCacheObj.clear();
    }
  };

  private getObject3D = (event: PointerEvent | MouseEvent): Object3D | null => {
    if (!this.raycaster) {
      throw new Error("raycaster is not defined");
    }
    const pointer = new Vector2();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(pointer, this.camera);
    const intersects = this.raycaster.intersectObject(this.scene, true);
    if (intersects.length > 0) {
      const res = intersects.filter((item) => {
        return item && item.object;
      })[0];
      if (res && res.object) {
        return res.object;
      }
      return null;
    } else {
      return null;
    }
  };
}
