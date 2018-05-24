var welcomeCanvas = document.createElement('canvas');

welcomeCanvas.id = 'c';


welcomeCanvas.style.position = 'absolute';
welcomeCanvas.style.top = '520px';
welcomeCanvas.style.left = '0px';
welcomeCanvas.width = innerWidth;
welcomeCanvas.height = 100;
welcomeCanvas.style.display = 'block';

document.body.appendChild(welcomeCanvas);

var myCanvas = document.getElementById('c'),
    myContext = welcomeCanvas.getContext('2d');


myContext.strokeStyle = 'white';
myContext.lineWidth = 5;




var y = 0;
function animate() {
    requestAnimationFrame (animate);
    myContext.moveTo(0, 0);
    myContext.lineTo(y,0);

    myContext.lineWidth = 2;

    myContext.moveTo(0, 10);
    myContext.lineTo(y,10);

    myContext.moveTo(0, 20);
    myContext.lineTo(y,20);

    myContext.stroke();
    y += 1;
}

animate();


function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 2000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('body', true);
  setVisible('#loading', false);
});

