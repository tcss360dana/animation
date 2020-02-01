var AM = new AssetManager();


function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
                return 1;
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}


//Background static image
function Background(game, spritesheet){
    this.animation = new Animation(spritesheet,2000,2000,2000, 4, 1, true, .75);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this,game, -295 ,-50);
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.draw = function(){
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.85);
    Entity.prototype.draw.call(this);
};

// UPDATE HERE TO CHANGE THE BACKGROUND
Background.prototype.update = function(){

};

function Bellmont(game, spritesheetWalk, spritesheetJump, spritesheetDown, spritesheetIdle, spritesheetStanding){
    this.animation = new Animation(spritesheetWalk,16,32,400, 8, 4, true, 2);
    this.jumpAnimation = new Animation(spritesheetJump,16,32,50, 1, 2, true, 2);
    this.fallAnimation = new Animation(spritesheetDown,16,32,400, .5, 4, true, 2);
    this.idleAnimation = new Animation(spritesheetIdle,18,32,200, .5, 1, false, 2);
    this.standingAnimation = new Animation(spritesheetStanding,18,32,40, .5, 1, true, 2);
    this.speedX = 1;
    this.speedY = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 520);
};

Bellmont.prototype = new Entity();
Bellmont.prototype.constructor = Bellmont;

Bellmont.prototype.draw = function(){
    if(this.x < 60){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }
    else if(this.x < 190){
        this.jumpAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        this.speedX += .1;
        this.speedY =-2;
    }
    else if(this.x < 200){
        this.fallAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        this.speedX -=.1;
        this.speedY = 1;
    }
    else if(this.x < 250){
        this.speedX = .5;
        this.speedY = 0;
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);

    }
    else if(this.game.gameTime >= 12){
        this.speedX = 7;
        this.speedY = 0;
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }
    else{
        this.speedY = 0;
        this.speedX = 0;
        this.idleAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 4)
        if(this.idleAnimation.isDone()){
           this.standingAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        }
    }
        Entity.prototype.draw.call(this);
};

Bellmont.prototype.update = function(){
    this.x += this.speedX;
    this.y += this.speedY
    this.animation.elapsedTime += 1;
    this.animation.time +=1;
};
function Godzilla(game, spritesheet, spritesheetKick, spritesheetRampage){
    this.animation = new Animation(spritesheet,74,70,600, .5, 8, true, 6);
    this.standing = new Animation(spritesheetKick,74,70,600, 1, 1, true, 6);
    this.rampage = new Animation(spritesheetRampage,78,70,397, 1, 2, true, 6);
    this.ctx = game.ctx;
    this.x = 0;
    this.y = 0;
    Entity.call(this, game, -600, 200);
};

Godzilla.prototype = new Entity();
Godzilla.prototype.constructor = Orb;

Godzilla.prototype.draw = function(){
    if(this.game.gameTime < 10){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }
    else if(this.game.gameTime < 12){
        this.standing.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }
    else{
        this.rampage.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }

};

Godzilla.prototype.update = function(){
    if(this.game.gameTime > 3 && this.game.gameTime < 10){
        this.x += 1;
    }
};


function Orb(game, spritesheetRed, spritesheetBlue){
    this.animation = new Animation(spritesheetRed,32,35,192, .2, 6, true, 3);
    this.animation2 = new Animation(spritesheetBlue,32,35,192, .5, 6, true, 3);
    this.ctx = game.ctx;
    this.x = 0;
    this.y = 0;
    Entity.call(this, game, 359, 250);
 
};

Orb.prototype = new Entity();
Orb.prototype.constructor = Orb;

Orb.prototype.draw = function(){
    if(this.game.gameTime < 5){
        this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }
    else if(this.game.gameTime < 9){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }
    else{
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }
};

Orb.prototype.update = function(){

};

function GameTimer(game){
    this.game = game;
    this.ctx = game.ctx;
    //this.gameTime = null;
};
GameTimer.prototype = new Entity();
GameTimer.prototype.constructor = GameTimer;
GameTimer.prototype.draw = function(){
    this.ctx.font="30px Arial";
    this.ctx.fillStyle = "aqua";
    if(this.game.gameTime >=9){
        this.ctx.fillStyle = "red";
    }
    this.ctx.fillText("Time: " + this.game.gameTime, 10, 50)
};
GameTimer.prototype.update = function(){
    this.game.gameTime = Date.now()/ 1000;
    this.game.gameTime -= this.game.test;
    this.game.gameTime = this.game.gameTime.toString();
    this.game.gameTime = this.game.gameTime.substring(0, this.game.gameTime.indexOf("."));
};



AM.queueDownload("./img/BellmontMove.png");
AM.queueDownload("./img/BelmontUp.png");
AM.queueDownload("./img/BelmontDown.png");
AM.queueDownload("./img/BelmontIdle.png");
AM.queueDownload("./img/DraculasCastle.png");
AM.queueDownload("./img/BelmontStanding.png");
AM.queueDownload("./img/orb1.png");
AM.queueDownload("./img/orb2.png");
AM.queueDownload("./img/GodzillaWalk.png");
AM.queueDownload("./img/GodzillaKick.png");
AM.queueDownload("./img/GodzillaRampage.png");



AM.downloadAll(function(){
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/DraculasCastle.png")));
    gameEngine.addEntity(new Bellmont(gameEngine, AM.getAsset("./img/BellmontMove.png"), AM.getAsset("./img/BelmontUp.png"), AM.getAsset("./img/BelmontDown.png"), AM.getAsset("./img/BelmontIdle.png"), AM.getAsset("./img/BelmontStanding.png")));
    gameEngine.addEntity(new Orb(gameEngine, AM.getAsset("./img/orb1.png"), AM.getAsset("./img/orb2.png")));
    gameEngine.addEntity(new GameTimer(gameEngine));
    gameEngine.addEntity(new Godzilla(gameEngine,  AM.getAsset("./img/GodzillaWalk.png"), AM.getAsset("./img/GodzillaKick.png"), AM.getAsset("./img/GodzillaRampage.png")   ));

    
    console.log("Thats it folks!");
});


