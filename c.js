 let PLAYER = [
     102, 103, 104, 105, 106, 107,
     152, 153, 154, 155, 156, 157,
     202, 203, 204, 205, 106, 207,

     102 + 41, 103 + 41, 104 + 41, 105 + 41, 106 + 41, 107 + 41,
     152 + 41, 153 + 41, 154 + 41, 155 + 41, 156 + 41, 157 + 41,
     202 + 41, 203 + 41, 204 + 41, 205 + 41, 106 + 41, 207 + 41,

     102 + 2200, 103 + 2200, 104 + 2200, 105 + 2200, 106 + 2200, 107 + 2200,
     152 + 2200, 153 + 2200, 154 + 2200, 155 + 2200, 156 + 2200, 157 + 2200,
     202 + 2200, 203 + 2200, 204 + 2200, 205 + 2200, 106 + 2200, 207 + 2200,

     102 + 2241, 103 + 2241, 104 + 2241, 105 + 2241, 106 + 2241, 107 + 2241,
     152 + 2241, 153 + 2241, 154 + 2241, 155 + 2241, 156 + 2241, 157 + 2241,
     202 + 2241, 203 + 2241, 204 + 2241, 205 + 2241, 106 + 2241, 207 + 2241

 ];

 ///

 let layerlength = TILE.layers.length;
 console.log(TILE.layers);
 //set layer player
 TILE.layers[layerlength] = {};
 TILE.layers[layerlength].data = [];
 for (a = 0; a < 2500; a++) {
     let v = 0;

     if (TILE.layers[0].data[a] == 29) v = 1;
     // if(Math.random()<0.1) v=1;
     TILE.layers[layerlength].data[a] = v;
 }

 let moved = 100;
 var map = {
     cols: TILE.width,
     rows: TILE.height,
     tsize: window.innerWidth / TILE.width,
     layers: TILE.layers,

     getTile: function(layer, col, row) {

         //console.log(col, row);
         let pid = row * map.cols + col;
         // console.log(this.layers[layer]);


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
         Loader.loadImage('tile', '../assets/ff.png'),
         Loader.loadImage('player', '../assets/kk.png')
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
     this.player = Loader.getImage('player');

     var canvas = document.getElementById('demo');
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
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
             let tileo = tile;
             var x = (c - startCol) * map.tsize + offsetX;
             var y = (r - startRow) * map.tsize + offsetY;
             // if (tile == 0) {
             //0 => empty tile

             let xx = 0;
             let yy = 0;


             if (tile == 0) continue;


             // if(tile>20)continue;

             //  xx = 0; 


             // draw tile




             //draw player

             if (layer == layerlength) {
                 if (tileo == 1) {
                     let pidp = r * map.cols + c;

                     // console.log(pidp);
                     for (let g = 0; g < PLAYER.length; g++) {
                         //  console.log(PLAYER[g], pidp);
                         if (PLAYER[g] == pidp)
                             this.ctx.drawImage(
                                 this.player, // image
                                 0, // source x
                                 0, //tile * map.tsize, // 1, // source y

                                 32 * 3, // source width
                                 32 * 4, // source height
                                 Math.round(x), // target x
                                 Math.round(y), // target y
                                 map.tsize, // target width
                                 map.tsize // target height
                             );
                     }
                 }
             } else

             {
                 for (a = 0; a < 100; a++)
                     if (tile > 16) {
                         tile = tile - 16;
                         yy += 32
                     } else break;

                 xx = (tile - 1) * 32;
                 this.ctx.drawImage(
                     this.tile, // image
                     xx, // source x
                     yy, //tile * map.tsize, // 1, // source y

                     32, // source width
                     32, // source height
                     Math.round(x), // target x
                     Math.round(y), // target y
                     map.tsize, // target width
                     map.tsize // target height
                 );
             }


         }
     }

     if (moved > 100) {
         moved = 0;
         moveplayer()
     }
     moved++;

     //  console.log(PLAYER);
 };

 Game.render = function() {


     for (let a = 0; a < map.layers.length; a++) {
         // draw map background layer
         //console.log(a);
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



 function moveplayer() {
     // console.log("MOVE");
     for (a = 0; a < PLAYER.length; a++) {
         let ran = [0, -1, +1, -50, -51, -49, 50, 51, 49, 0];
         let rrr = Math.floor(Math.random() * 10);
         let np = PLAYER[a] + ran[rrr];
         if (np > 0 && np < 2500)
             if (TILE.layers[layerlength].data[np] == 1) {
                 PLAYER[a] = np;
             }

     }

     //  console.log(PLAYER)

 }