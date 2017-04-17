import * as qrcanvas from 'qrcanvas';

export interface IQrConfig {
  TypeNumber: number;
  CellSize: number;
  ColorFore: string;
  ColorBack: string;

  LogoUrl: string;
  LogoSize: number;
  LogoClearEdges: number;
  LogoMargin: number;
}

export class QrConfig {
  private options: any;

  constructor(qrConfig: IQrConfig) {
    this.options = {
      correctLevel: 'H',
      cellSize: qrConfig.CellSize,
      foreground: qrConfig.ColorFore,
      background: qrConfig.ColorBack,
      typeNumber: qrConfig.TypeNumber,
    };
    if (qrConfig.LogoUrl) {
      const image = new Image();
      image.src = qrConfig.LogoUrl;
      this.options.logo = {
        image,
        size: qrConfig.LogoSize,
        clearEdges: qrConfig.LogoClearEdges,
        margin: qrConfig.LogoMargin,
      };
    }
  }

  generate(data: string) {
    const options = Object.assign({ data }, this.options);
    return qrcanvas(options).toDataURL();
  }

}
