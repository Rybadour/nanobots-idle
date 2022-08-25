import createjs from "createjs-module";

export function formatNumber(n: number, minimumFractionDigits: number, maximumFractionDigits: number): string {
  if (isNaN(n)) return '';

  return n.toLocaleString(undefined, {minimumFractionDigits, maximumFractionDigits});
}

export function getExponentialValue(base: number, growth: number, growthCount: number) {
  return base * Math.pow(growth, growthCount);
}

export function centerDisplayOn(x: number, y: number, display: createjs.DisplayObject) {
  const b = display.getBounds();
  display.setTransform(x - b.width/2, y - b.height/2);
}