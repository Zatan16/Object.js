/**
 * The main class of the Object.js library
 */

class object {
	/**
	 * The main object class of object.js file
	 * @param {string} type the type of the object
	 * @param {data} data the data about the object
	 */
	constructor(type, data) {
		this.type = type;
		this.data = data;
		this.change(data, type);
	}

	/**
	 * The method of object class used to change the data and type of the object
	 * @param {any} data the data about the object
	 * @param {string} type the type of the object
	 */
	change(data, type) {
		this.data = data;
		// Object.keys(this.data).forEach(v => {
		// 	if(v != "type" && v != "data") this[v] = this.data[v];
		// 	else throw new SyntaxError(`data attribute object must not contain properties named "type"/"data" but had property "${v}"`);
		// });
		if(type) this.type = type;
		if(this.type === "canvas shape") {
			/**
			 * The x position of the shapes
			 * @type number
			 */
			this.x = data.x || null;
			/**
			 * The y position of the shapes
			 * @type number
			 */
			this.y = data.y || null;
			/**
			 * The width
			 * @type number
			 */
			this.w = data.w || null;
			/**
			 * The height
			 * @type number
			 */
			this.h = data.h || null;
			/**
			 * The radius
			 * @type number
			 */
			this.r = data.r || null;
			/**
			 * The fill color
			 * @type color
			 */
			this.fill = data.fill || null;
			/**
			 * The thickness of the border
			 * @type number
			 */
			this.thickness = data.thickness || null;
			/**
			 * The stroke color of the border
			 * @type color
			 */
			this.stroke = data.stroke || null;
			/**
			 * The context to which everything should be drawn
			 * @type CanvasPath
			 */
			this.ctx = data.ctx || null;
			/**
			 * The ending angle
			 * @type number
			 */
			this.startAngle = data.startAngle|| null;
			/**
			 * The starting angle of arcs
			 * @type number
			 */
			this.endAngle = data.endAngle || null;
			this.draw = data.draw || function() {};
			delete this.update;
		}
		if(this.type !== "math") {
			delete this.pow;
			delete this.square;
			delete this.cube;
		}
		if(this.type !== "comp") {
			delete this.convert;
		}
	}

	update() {
		let ctx = this.ctx;
		ctx.beginPath();
		ctx.fillStyle = this.fill;
		ctx.strokeStyle = this.stroke;
		ctx.lineWidth = this.thickness;
		this.draw();
		if(this.fill) ctx.fill();
		if(this.stroke) ctx.stroke();
		ctx.closePath();
	}

	// canvas shape
	/**
	 * draw a rectangle onto the canvas
	 * @param {number} x the x position of the top-left corner of the rectangle
	 * @param {number} y the y position of the top-left corner of the rectangle
	 * @param {number} width the length of the width of the rectange
	 * @param {number} height the length of the height of the rectangle
	 */
	rect(x, y, width, height) {
		this.ctx.rect(x, y, width, height);
	}

	/**
	 * draw a square onto the canvas
	 * @param {number} x the x position of the top-left corner of he square
	 * @param {number} y the y position of the top-left corner of the square
	 * @param {number} side the length of the side of the square
	 */
	square(x, y, side) {
		this.ctx.rect(x, y, width, height);
	}

	/**
	 * draw an arc/curve line onto the canvas
	 * @param {number} x the x position of the center of the arc
	 * @param {number} y the y position of the center of the arc
	 * @param {number} r the length of the radius of the arc (distance of arc from its center)
	 * @param {number} startAngle the starting angle of the arc
	 * @param {number} endAngle the ending angle of the arc
	 * @param {boolean} counterClockwise [optional] should the arc be drawn on the opposite side to which it is drawn now?
	 */
	arc(x, y, r, startAngle, endAngle, counterClockwise) {
		this.ctx.arc(x, y, r, startAngle, endAngle, counterClockwise);
	}

	// comp
	/**
	 * convert the binary/octal/hexa-decimal modes to one-another
	 * @param {string} from the mode form which to be converted
	 * @param {string} to the mode to which to be converted
	 * @param {string} value the value which is to be converted
	 */
	convert(from, to, value) {
		// let converting = {
		// 	binary: ["decimal", "hexa-decimal"],
		// }
		let answer, mode = 0;
		switch(from) {
			case "binary": mode = 2; break;
			case "octal": mode = 8; break;
			case "hexa-deciaml": mode = 16; break;
		}
	}

	// math
	/**
	 * Returns the value of base expression takes to a specified power
	 * @param {number} x The base value of the expression
	 * @param {number} y The power value of the expression
	 */
	pow(x, y) {
		return Math.pow(x, y);
	}

	/**
	 * Returns the square of the given expression
	 * @param {number} x The number to be squared
	 */
	square(x) {
		return x*x;
	}

	/**
	 * Returns the cube of the given expression
	 * @param {number} x The number to be cubed
	 */
	cube(x) {
		return x*x*x;
	}
}

/**
 * Creates a new loop and returns the instance for a future crearing of the loop
 * @param {number} fps frame per second of the loop
 * @param {GameLoop} loop the loop which should be created
 */
function createLoop(fps, loop) {
	let prevTick = 0;
	if (loop) {
		return setTimeout(() => {
			let now = Math.round(fps * Date.now() / 1000);
			if(now == prevTick) return;
			prevTick = now;
			requestAnimationFrame(() => {
				loop();
				createLoop(fps, loop);
			});
		}, 1000 / fps);
	}
}

/**
 * Removes an existing loop using the instance of the loop
 * @param {GameLoop} loop the loop which should be removed
 */
function removeLoop(loop) {
	clearTimeout(loop);
}

/**
	const color = typeof color;
 */

/**
 * set the backgroun color to something
 * @param {string} color the color of the background
 * @param {CanvasPath} ctx the context of the canvas
 */
function background(color, ctx) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.lineWidth = 0;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fill();
	ctx.closePath();
}

function getCanvas(getter) {
	return document.querySelector(`canvas, #${getter}`);
}

function fullScreen(canvas) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function setCanvasSize(canvas, width, height) {
	canvas.width = width;
	canvas.height = height;
}
