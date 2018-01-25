var LEVEL1 = {
    
		preload: function(){
            
                //ForSound
            game.load.audio('sound', ['audio/mot.mp3','audio/mot.mp3']);
            game.load.audio('coin', ['audio/my_coin.wav']);
            game.load.audio('jump', ['audio/my_jump.wav']);
            game.load.audio('stomp', ['audio/my_stomp.wav']);


            this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16, 16);         
            this.load.spritesheet('tiles', 'assets/basic_icons.png', 16, 16);
            this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
            this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
            this.load.spritesheet('coin', 'assets/coin.png', 16, 16);

            this.load.tilemap('level', 'assets/super_mario_mapX.json', null, Phaser.Tilemap.TILED_JSON);

        },
    
    
			create: function(){
            
            game.scale.setGameSize(256, 240);
                
            		//Music playback
			backgroundSound = game.add.audio('sound');
			backgroundSound.play('',0,1,true);
              
           		 //Score
			scoretx = game.add.text(10, 10, '0',{
				font: "10px Arial",
				fill: "#fcfcfc",
				aligment: "center"
			});
			scoretx.fixedToCamera = true;
			scoretx.stroke = '#000000';
			scoretx.strokeThickness = 1;
			score = 0;
			
			//Lives
			livestx = game.add.text(10, 20, '2',{
				font: "10px Arial",
				fill: "#ffffff",
				aligment: "center"
			});
			livestx.fixedToCamera = true;
			livestx.stroke = '#000000';
			livestx.strokeThickness = 1;
			lives = parseInt(localStorage.getItem("lives"));
            
            
			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = 'rgba(65, 124, 235, 0.86)';

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');

			map.createLayer('background');

			layer = map.createLayer('solid');
			layer.resizeWorld();

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;

			game.camera.follow(player);

			cursors = game.input.keyboard.createCursorKeys();

		},
            
		update: function() {
            
            //Score Update
			scoretx.text = "Score: "+score;
			game.world.bringToTop(scoretx);
            
			//Lives Update
			livestx.text = "Lives: "+lives;
			game.world.bringToTop(livestx);
            
            
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);

			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
                    
                    //For jumpsound
                    jumpSound = game.add.audio('jump');
					jumpSound.play();
                    
                    
					player.body.velocity.y = -190;
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}
}

    
