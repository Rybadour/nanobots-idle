import createjs from 'createjs-module';
// @ts-ignore
window.createjs = createjs;

const sprites = ['nano-core'];

class Assets {
  public isLoaded: boolean = false;

  images: Record<string, object>;

  onLoad: () => void;

  constructor(onLoad: () => void) {
    var queue = new createjs.LoadQueue();
    queue.on("complete", (event) => {
      this.images = {};
      sprites.forEach(sprite => {
        this.images[sprite] = queue.getResult(sprite);
      });
      
      this.isLoaded = true;
      onLoad();
    });

    sprites.forEach((sprite) => {
      queue.loadFile({src: `sprites/${sprite}.png`, id: sprite});
    });
    queue.load();
  }

  getSprite(id: string) {
    return new createjs.Bitmap(this.images[id]);
  }
}

export default Assets;