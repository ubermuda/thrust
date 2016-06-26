import Avatar from './Avatar.js';

class Camera {
    constructor(canvas, map, player, scale, y) {
        this.y = y;
        this.scale = scale;
        this.map = map;
        this.canvas = canvas;
        this.player = player;
        this.avatar = new Avatar(player, y === 0);
    }

    draw(alterEgo = null, difference = 0) {
        const { x, y, size } = this.updateAvatar();
        const { start, end } = this.getViewPort();

        for (let  i = this.map.corridor.rooms.length - 1; i >= 0; i--) {
            let room = this.map.corridor.rooms[i];
            if (room.match(start, end)) {
                this.drawRoom(room);
            }
        }

        this.canvas.drawImage(this.avatar.draw(), x, y, size, size);

        if (alterEgo) {
            const aex = this.getAlterEgoPosition(x, size, difference);
            this.canvas.drawImage(alterEgo.draw(), aex, y, size, size);
        }
    }

    getAlterEgoPosition(x, size, difference) {
        return x + size + difference;
    }

    drawRoom(room) {
        this.canvas.drawImage(
            this.getView(room),
            this.translate(room.start),
            this.y,
            room.view.element.width,
            this.canvas.element.height / 2
        );
    }

    getView(room) {
        return room.view.element;
    }
}

export default Camera;
