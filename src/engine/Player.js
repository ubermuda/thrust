import PlayerController from './PlayerController'

class Player {

    static speed = 300;

    constructor(key) {
        this.thrust = this.thrust.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.position = Player.speed;
        this.speed = Player.speed;
        this.maxSpeed = Player.speed * 4;
        this.thrusting = false;
        this.wallEventListener = null;
        this.allowDoubleThrust = true;

        this.controller = new PlayerController(this, key, this.allowDoubleThrust ? 400 : 500);
    }

    reset() {
        this.position = Player.speed;
        this.speed = Player.speed;
        this.thrusting = false;
    }

    thrust() {
        this.thrusting = true;
    }

    endThrust() {
        this.thrusting = false;
    }

    increaseSpeed() {
        this.speed = Math.min(this.speed + Player.speed / 5, this.maxSpeed);

        if (this.allowDoubleThrust) {
            this.controller.listening = true;
        }
    }

    resetSpeed() {
        this.speed = Player.speed;
        if (this.wallEventListener) {
            this.wallEventListener();
        }
    }

    update(delta) {
        this.position = Math.round(this.position + this.speed * delta);

        return this.position;
    }

    setWallEventListener(callback) {
        this.wallEventListener = callback;
    }
}

export default Player;
