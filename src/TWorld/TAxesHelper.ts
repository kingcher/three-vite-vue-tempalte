import { AxesHelper, Scene } from "three";

export interface TAxesHelperConfig {
  size: number;
}

export class TAxesHelper {
  private config: TAxesHelperConfig;
  constructor(config: TAxesHelperConfig) {
    this.config = config;
  }
  public createAxesHelper(scene: Scene) {
    const axesHelper = new AxesHelper(this.config.size);
    scene.add(axesHelper);
  }
}
