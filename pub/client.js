var socket = io();

Vue.createApp({
	data() {
		return {
			grid: [],
			whoseTurn: 0,
			numPeople: 0,
			size: 6,
			color: "grey"
		};
	},
	methods: {
		colorSquare(x, y) {
			socket.emit("colorSquare", x, y);
		},
		reset() {
			socket.emit("reset", this.size);
		},
		changeClassColor(val) { //css
			if (val == 0) return "red";
			else if (val == 1) return "white";
			else return "grey";
		}

	},
	mounted() {
		socket.on("updateUI", (grid, whoseTurn, numPeople) => { //sending vue results to server
			this.grid = grid;
			this.whoseTurn = whoseTurn;
			this.numPeople = numPeople;
		});

	},
	created() {
		if (this.numPeople == 1) {
			this.color = "red"
		} else if (this.numPeople = 2) {
			this.color = "white"
		}
	},
	computed: {
		message() {
			if (this.numPeople < 2) {
				return message = "Waiting for another player... "
			} else if (this.whoseTurn == 0) {
				return message = "Other players turn"
			} else if (this.whoseTurn == 1) {
				return message = "Your turn"
			}
		},
	}
}).mount("#app");
