// @ts-check
const { test, expect } = require("@playwright/test");

test("Automate Dinosaure", async ({ page }) => {
  try {
    await page.goto("chrome://dino/");
  } catch (e) {}

  await page.evaluate(() => {
    function autoPlay() {
      this.Obstacle.types[0]["minGap"] = 150;
      this.Obstacle.types[1]["minGap"] = 150;

      setTimeout(function () {
        const myinstance = this.Runner.instance_;
        const myobstacles = myinstance.horizon.obstacles;

        myinstance.setSpeed(7);

        if (myinstance.tRex.ducking) {
          myinstance.tRex.setDuck(true);
        }
        if (myinstance.crashed) {
          console.log("Game over.");
          return;
        }

        if (myobstacles.length > 0) {
          let action = "JUMP";
          let obstacle_type = myobstacles[0]["typeConfig"]["type"];

          if (
            obstacle_type == "CACTUS_SMALL" ||
            obstacle_type == "CACTUS_LARGE"
          ) {
            action = "JUMP";
          } else if (obstacle_type == "PTERODACTYL") {
            if (myobstacles[0]["yPos"] == 75 || myobstacles[0]["yPos"] == 50)
              action = "DUCK";
          }

          if (myobstacles[0].xPos <= 100) {
            console.log(myobstacles[0]);
            //perform the action
            if (action == "JUMP") {
              console.log("JUMPING");
              let curr_speed = myinstance.currentSpeed;
              myinstance.tRex.startJump(curr_speed);
            } else if (action == "DUCK") {
              console.log("DUCKING");
              myinstance.tRex.setDuck(true);
            }
          }
        }

        autoPlay();
      }, 50);
    }
    console.log("Done, now start the game");
    autoPlay();
  });
  await page.keyboard.press("ArrowUp");
});
