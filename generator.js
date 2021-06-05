download_img = function (el) {
  var image = canvas.toDataURL("image/png");
  el.href = image;
  var form = document.forms["form"];

  width = parseInt(form["width"].value);
  height = parseInt(form["height"].value);

  unit = parseInt(form["unit"].value);
  minor = parseInt(form["minor"].value);
  major = parseInt(form["major"].value);

  el.download = `PixelGrid-${width}x${height}-${unit},${minor},${major}.png`;
};

function generate() {
  var form = document.forms["form"];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  width = parseInt(form["width"].value);
  height = parseInt(form["height"].value);

  unit = parseInt(form["unit"].value);
  minor = parseInt(form["minor"].value);
  major = parseInt(form["major"].value);

  label = form["label"].checked;

  ctx.canvas.width = width;
  ctx.canvas.height = height;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  grid(`rgb(200,200,200)`, unit, canvas, ctx);
  grid(`rgb(150,150,150)`, minor, canvas, ctx);
  grid("black", major, canvas, ctx);

  if (label) {
    ctx.fillStyle = "blue";
    ctx.font = "30px Arial";
    ctx.fillText(
      `${width}x${height}:${unit},${minor},${major}`,
      10,
      canvas.height - 10
    );
  }

  return false;
}

function grid(colour, spacing, canvas, ctx) {
  ctx.strokeStyle = colour;
  for (let x = 0; x < canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function checkbox() {
  var checkBox = document.getElementById("labelCheckbox");
  var label = document.getElementById("labelLabel");

  if (checkBox.checked == false) {
    label.classList.remove("btn-success");
    label.classList.add("btn-secondary");
  } else {
    label.classList.remove("btn-secondary");
    label.classList.add("btn-success");
  }
}
