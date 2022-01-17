 
var map = {
       cols: TILE.width,
       rows:  TILE.height,
       tsize: 32,
       layers: TILE.layers,
   
       getTile: function(layer, col, row) {

       //console.log(col, row);
       let pid = row * map.cols + col;
      // console.log(pid);
           let a = this.layers[layer].data[pid];
           
           return a;
       }
   };
   
   
   // for (let t = 0; t < 900; t++) {
   //     let x = 1;
   //     if (Math.random() < 0.3) x = 2;
   //     if (Math.random() < 0.2) x = 3;
   //     map.layers[0][t] = x;
   // }
   
   let camerax = 0;
   let cameray = 0;
   
   function Camera(map, width, height) {
       var cw = document.getElementById('demo');
       map.tsize = Math.max(cw.width / map.rows, map.tsize);
       this.x = camerax;
       this.y = cameray;
       this.width = width;
       this.height = height;
       this.maxX = map.cols * map.tsize - width;
       this.maxY = map.rows * map.tsize - height;
   
   
   
   }
   
   Camera.SPEED = 500; // pixels per second
   
   Camera.prototype.move = function(delta, dirx, diry) {
       // move camera
       this.x += dirx * Camera.SPEED * delta;
       this.y += diry * Camera.SPEED * delta;
       // clamp values
       this.x = Math.max(1, Math.min(this.x, this.maxX));
       this.y = Math.max(1, Math.min(this.y, this.maxY));
   
       camerax = this.x;
       cameray = this.y;
   };
   
   Game.load = function() {
       return [
           Loader.loadImage('tile', '../assets/fff.png'),
       //     Loader.loadImage('tiles2', '../assets/kindbg.png'),
       //     Loader.loadImage('grass', '../assets/grass.png'),
       //     Loader.loadImage('t2', '../assets/T3.png'),
       ];
   };
   
   Game.init = function() {
       Keyboard.listenForEvents(
           [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
      // this.tileAtlas = Loader.getImage('grass');
      // this.logo = Loader.getImage('tiles2');
       this.tile = Loader.getImage('tile');
       //this.t2 = Loader.getImage('t2');
   
       var canvas = document.getElementById('demo');
       canvas.width = window.innerWidth - 10;
       canvas.height = window.innerHeight - 80;
       this.camera = new Camera(map, canvas.width, canvas.height);
   };
   
   let dir2x = 0;
   let dir2y = 0;
   Game.update = function(delta) {
       // handle camera movement with arrow keys
       var dirx = 0;
       var diry = 0;
       if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
       if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
       if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
       if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }
       //console.log(Game.camera);
       dirx = dirx + dir2x;
       diry = diry + dir2y;
       dir2x = 0;
       dir2y = 0;
       this.camera.move(delta, dirx, diry);
   };
   
   Game._drawLayer = function(layer) {
       var startCol = Math.floor(this.camera.x / map.tsize);
       var endCol = startCol + (this.camera.width / map.tsize);
       var startRow = Math.floor(this.camera.y / map.tsize);
       var endRow = startRow + (this.camera.height / map.tsize);
       var offsetX = -this.camera.x + startCol * map.tsize;
       var offsetY = -this.camera.y + startRow * map.tsize;
   
       for (var c = startCol; c < endCol; c++) {
           for (var r = startRow; r < endRow; r++) {
               var tile = map.getTile(layer, c, r);
               var x = (c - startCol) * map.tsize + offsetX;
               var y = (r - startRow) * map.tsize + offsetY;
               // if (tile == 0) {
               //0 => empty tile
   
               let xx = 0;
               let yy = 0;
       
               
               if(tile == 0) continue;


                 // if(tile>20)continue;
              for(a=0;a<100;a++)
              if(tile>21){tile=tile-21;yy+=map.tsize} else break;
              
                 xx =  ( tile - 1 ) * map.tsize;
           //  xx = 0; 
 
             this.ctx.drawImage(
              this.tile, // image
              xx, // source x
              yy, //tile * map.tsize, // 1, // source y
              map.tsize, // source width
              map.tsize, // source height
              Math.round(x), // target x
              Math.round(y), // target y
              map.tsize, // target width
              map.tsize // target height
          );
             
   
            
           }
       }
   };
   
   Game.render = function() {


      for(a=0;a  < map.layers.length;a++){
       // draw map background layer
       
       this._drawLayer(a);
      }
   };
   
   // setInterval(function() {
   //    
   //     console.log(map.tsize)
   // }, 10000)
   
   function zoomin() {
       map.tsize++;
   
       Game.init();
   }
   
   function zoomout() {
       map.tsize--;
       Game.init();
   }
   
   function sleep(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
   }
   
   async function move(a) {
       STOP = 1;
       for (aa = 0; aa < 100; aa++) {
           if (!STOP) break;
           await sleep(100);
   
           if (a == 1) { dir2x = -1 }
           if (a == 2) { dir2x = 1; }
           if (a == 4) { dir2y = -1; }
           if (a == 3) { dir2y = 1; }
           console.log(dir2x, dir2y)
       }
   }
   
   function stop() {
       STOP = 0;
   }