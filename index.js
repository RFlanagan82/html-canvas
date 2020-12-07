const canvas = document.querySelector('#draw');

// Draw on the context which in this case is 2D and that is what we need to create
const ctx = canvas.getContext('2d');

//resize up the canvas to always be the exact size of the window width wise
canvas.width = window.innerWidth;

//resize up the canvas to always be the exact size of the window height wise
canvas.height = window.innerHeight;

//need to set up a few of the base settings for our virtual 'pen'
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = "round";
ctx.lineWidth = 10;

//need to set up a few dummy settings
let isDrawing = false;

//define start of a line and end of a line
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

//set up click and draw functionality
function draw(e) {
  if (!isDrawing) return; //will stop the function from running when they are not moused down
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  //starting from
  ctx.moveTo(lastX, lastY);
  //going to
  ctx.lineTo(e.offsetX, e.offsetY); //values are coming from the mouse event
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  // lastX = e.offsetX;
  // lastY = e.offsetY;

  //increment hues from 1 to 360
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  //alter the line width based on the pixel size of the current line
  if(ctx.lineWidth >= 30 || ctx.lineWidth <= 1) {
      direction =!direction;
  }

  if(direction) {
    ctx.lineWidth++;
  } else {
      ctx.lineWidth--;
  }
  
};

//associate the moving of the mouse with draw if activated
canvas.addEventListener("mousemove", draw);

//set up variables for mouse activity based on what the user is doing with the mouse
//bringing in the last x and last y position allow you to draw different lines / not just one continous one
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];

});

//Stop the draw function if mouse is not clicked or goes off the canvas
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

