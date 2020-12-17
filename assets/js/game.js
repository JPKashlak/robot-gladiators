//function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

// function to start a new game
var startGame = function() {
  // reset player stats
  playerInfo.reset;

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.Health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemy Names array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy Health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass the pickedEnemy Name variable's value into the fight function, where it will assume the value of the enemy Name parameter
      fight(pickedEnemyObj);
    }
    // if player is not alive, break out of the loop and let endGame function run
    else {
      break;
    }
  }

  // after loop ends, we are either out of player health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.Health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.Money + '.');
  } else {
    window.alert("You've lost your robot in battle!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert('Thank you for playing Battlebots! Come back soon!');
  }
};

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  
  while (playerInfo.Health > 0 && enemy.Health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === 'skip' || promptFight === 'SKIP') {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.Name + ' has decided to skip this fight. Goodbye!');
        // subtract money from player Money for skipping
        playerInfo.Money = Math.max(0, playerInfo.Money - 10);
        shop();
        break;
      }
    }

    // generate random damage value based on  player's attack power
    var damage = randomNumber(playerInfo.Attack - 3, playerInfo.Attack);
    enemy.Health = Math.max(0, enemy.Health - damage);
    console.log(
      playerInfo.Name + ' attacked ' + enemy.Name + '. ' + enemy.Name + ' now has ' + enemy.Health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.Health <= 0) {
      window.alert(enemy.Name + ' has died!');

      // award player money for winning
      playerInfo.Money = playerInfo.Money + 20;

      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm('The fight is over, visit the store before the next round?');

      // if yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.Name + ' still has ' + enemy.Health + ' health left.');
    }

    // generate random damage value based on  enemy's attack power
    var damage = randomNumber(enemy.Attack - 3, enemy.Attack);
    playerInfo.Health = Math.max(0, playerInfo.Health - damage);
    console.log(
      enemy.Name + ' attacked ' + playerInfo.Name + '. ' + playerInfo.Name + ' now has ' + playerInfo.Health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.Health <= 0) {
      window.alert(playerInfo.Name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.Name + ' still has ' + playerInfo.Health + ' health left.');
    }
  }
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice.'
  );

  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case 'refill':
    case 'REFILL':
      playerInfo.refillHealth();
      break;
    case 'upgrade':
    case 'UPGRADE':
      playerInfo.upgradeAttack();
      break;
    case 'leave':
    case 'LEAVE':
      window.alert('Leaving the store.');
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');
      shop();
      break;
  }
};

debugger;
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
    window.alert("REfilling player's health by 20 for 7 dollars.")
    this.health += 20;
    this.money -= 7; 
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
    this.attack += 6;
    this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// start first game when page loads
startGame();
