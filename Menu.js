var Menu = {

	preload: function() {
        
		game.load.image('background', 'assets/mario-wall.jpg');
		game.load.image('LEVEL1', 'assets/button_level_1.png');
		game.load.image('LEVEL2', 'assets/button_level_2.png');

	},
	
	create: function() {

		var L1;
		var L2;
        
        game.scale.setGameSize(1920, 1080);
        
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var ima = game.add.image(0, 0, 'background');


		L1 = game.add.button(810 , 630, "LEVEL1", action1, kk, this, function(){


		});
		L1.alpha = 0.5;
		L1.anchor.set(0.1, 0.1);
		L1.onInputOver.add(kk, this);
		L1.onInputOut.add(kkX, this);
		
		L2 = game.add.button(810, 730, "LEVEL2", action2, kkX, this, function(){


		});
		L2.alpha = 0.5;
		L2.anchor.set(0.1, 0.1);
		L2.onInputOver.add(kk, this);
		L2.onInputOut.add(kkX, this);

		function action1 () {
    		game.state.start('LEVEL1');
		}

		function action2 () {
    		game.state.start('LEVEL2');
		}

		function kk (L1, L2) {
			L1.alpha = 1;
			L2.alpha = 1;
		}

		function kkX (L1, L2) {
			L1.alpha = 0.6;
			L2.alpha = 0.6;
		}

		ascent = 0;
		score = 0;
		lives = 3;
		finishcheck = 0;
	},

	update: function(){
	}
}	