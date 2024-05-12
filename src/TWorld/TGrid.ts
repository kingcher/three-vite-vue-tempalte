import { ColorRepresentation, GridHelper, Scene } from "three";

export interface TGridConfig {
  size: number;
  divisions: number;
  color1: ColorRepresentation;
  color2: ColorRepresentation;
}

export class TGrid {
  private config: TGridConfig;
  constructor(gridConfig: TGridConfig) {
    this.config = gridConfig;
  }
  public createGrid(scene: Scene) {
    const grid = new GridHelper(this.config.size, this.config.divisions, this.config.color1, this.config.color2);
    grid.rotation.x = Math.PI / 2;
    scene.add(grid);
  }
}
