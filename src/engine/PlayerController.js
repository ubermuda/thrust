class PlayerController {
    constructor(player, key, timeout) {
        this.player = player;
        this.key = key;

        this.onKeyDown = this.onKeyDown.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.thrustTimeout;

        this.timeout = timeout;
        this.cooldown = 0;
        this.listening = false;

        document.body.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(event) {
        if (this.listening && event.keyCode == this.key) {
            clearTimeout(this.thrustTimeout);

            this.listening = false;
            this.player.thrust();
            this.thrustTimeout = setTimeout(this.endThrust, this.timeout);
        }
    }

    endThrust() {
        this.player.endThrust();
        this.listening = true;
    }
}

export default PlayerController;
