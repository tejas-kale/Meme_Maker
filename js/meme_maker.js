function text_change_listener (evt) {
	// Event ID and value are fetched to upper the correct window element
	var id = evt.target.id;
	var text = evt.target.value;

	// Update upper or lower meme text
	if (id == "upper_line") {
		window.upper_line = text;
	} else {
		window.lower_line = text;
	}

	var text_obj = {
		"upper_line": window.upper_line,
		"lower_line": window.lower_line
	};

	redraw_meme(window.image_src, text_obj);
}

function redraw_meme (image, text) {
	// Create an empty text object if undefined
	if (typeof text == undefined) {
		text = {
			"upper_line": "",
			"lower_line": ""
		};
	}

	// Get canvas 2d context
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext("2d");

	// Draw image on canvas
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	// Set text font and fill properties
	ctx.font = "36px Impact";
	ctx.textAlign = "center";
	ctx.fillStyle = "#FFFFFF";

	// Add upper and lower text to 'fill'
	ctx.fillText(text.upper_line, canvas.width / 2, 40);
	ctx.fillText(text.lower_line, canvas.width / 2, 380);

	// Set stroke properties
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 3;

	// Add upper and lower text to 'stroke'
	ctx.strokeText(text.upper_line, canvas.width / 2, 40);
	ctx.strokeText(text.lower_line, canvas.width / 2, 380);
}

function save_file () {
	window.open(document.querySelector('canvas').toDataURL());
}

function handle_file_select (evt) {
	var file = evt.target.files[0];

	var reader = new FileReader();
	reader.onload = function (file_object) {
		var data = file_object.target.result;

		// Create an image object
		var image = new Image();
		image.onload = function () {
			window.image_src = this;
			redraw_meme(window.image_src);
		}

		// Set image data to background image
		image.src = data;
	};
	reader.readAsDataURL(file);
}

window.upper_line = "";
window.lower_line = "";

var input_upper = document.getElementById('upper_line');
input_upper.oninput = text_change_listener;

var input_lower = document.getElementById('lower_line');
input_lower.oninput = text_change_listener;

document.getElementById('image').addEventListener('change', handle_file_select, false);

document.querySelector('button').addEventListener('click', save_file, false);