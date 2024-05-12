# Vue 3 + TypeScript + Vite + Threejs

这个模板可以帮助你使用 Vue 3、TypeScript 和 Vite 开发 Threejs 应用程序。

## 快速开始

传入 canvas 的 dom 节点，即可创建一个 Threejs 的环境

```
 const world = new TWorld({
    canvas: canvas.value
  });
  const box = Box();
  world.addObject(box);
```

```
//返回的对象包括mesh：几何体，render：渲染函数
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
```

## TWorld 默认配置

```
const defaultTWorldConfig: TWorldConfig = {
  canvas: document.getElementById("canvas") as HTMLCanvasElement, // canvas
  renderConfig: { // 渲染配置
    clearColor: 0x000000 // 背景色
  },
  cameraConfig: {
    fov: 60,
    aspect: 1,
    near: 0.01,
    far: 5000,
    position: new Vector3(0, 0, 10)
  },
  gridConfig: { // 不想要grid可以传入null
    size: 1000,
    divisions: 400,
    color1: 0x444444,
    color2: 0x888888
  },
  axesHelperConfig: { // 不想要可以传入null
    size: 100
  }
};
```

## TWorld

所有的 threejs 相关的环境设置代码都在 TWorld 目录中。

Tworld.ts 所有的 threejs 通过 TWorld 进行管理。
TCamera.ts: 相机
TRenderLines.ts: 渲染器以及 Composer 合成
TLight.ts： 灯光
TOrbitController.ts： 键鼠控制
TRayCaster： 射线，用来检测鼠标事件
TGrid: grid 辅助线
TAxesHelper： 坐标轴辅助线
