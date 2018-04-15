var willy = [
  {
    url: '../../assets/img/games/wiw/willy1.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 1321, y: 1020},
      rb: {x: 1370, y: 1028},
      lo: {x: 1321, y: 1072},
      ro: {x: 1370, y: 1072}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy2.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 354, y: 722},
      rb: {x: 424, y: 724},
      lo: {x: 354, y: 807},
      ro: {x: 421, y: 812}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy3.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 504, y: 479},
      rb: {x: 562, y: 479},
      lo: {x: 511, y: 539},
      ro: {x: 554, y: 543}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy4.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 17, y: 830},
      rb: {x: 82, y: 833},
      lo: {x: 17, y: 915},
      ro: {x: 82, y: 915}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy5.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 970, y: 632},
      rb: {x: 1010, y: 633},
      lo: {x: 970, y: 674},
      ro: {x: 1010, y: 674}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy6.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 587, y: 256},
      rb: {x: 623, y: 254},
      lo: {x: 592, y: 296},
      ro: {x: 620, y: 296}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy7.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 1425, y: 448},
      rb: {x: 1453, y: 448},
      lo: {x: 1425, y: 494},
      ro: {x: 1453, y: 494}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy8.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 513, y: 484},
      rb: {x: 548, y: 484},
      lo: {x: 513, y: 528},
      ro: {x: 548, y: 528}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy9.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 371, y: 554},
      rb: {x: 467, y: 548},
      lo: {x: 371, y: 669},
      ro: {x: 467, y: 669}
    }
  },
  {
    url: '../../assets/img/games/wiw/willy10.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 716, y: 215},
      rb: {x: 734, y: 215},
      lo: {x: 716, y: 239},
      ro: {x: 734, y: 239}
    },
  },
  {
    url: '../../assets/img/games/wiw/willy11.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 1391, y: 317},
      rb: {x: 1470, y: 317},
      lo: {x: 1413, y: 418},
      ro: {x: 1486, y: 368}
    },
  },
  {
    url: '../../assets/img/games/wiw/willy12.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 1328, y: 682},
      rb: {x: 1360, y: 682},
      lo: {x: 1328, y: 710},
      ro: {x: 1360, y: 710}
    },
  },
  {
    url: '../../assets/img/games/wiw/willy13.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 1259, y: 553},
      rb: {x: 1278, y: 553},
      lo: {x: 1259, y: 572},
      ro: {x: 1278, y: 572}
    },
  },
  {
    url: '../../assets/img/games/wiw/willy14.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 965, y: 487},
      rb: {x: 1029, y: 487},
      lo: {x: 965, y: 563},
      ro: {x: 1029, y: 563}
    },
  },
  {
    url: '../../assets/img/games/wiw/willy15.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 1518, y: 453},
      rb: {x: 1574, y: 453},
      lo: {x: 1518, y: 524},
      ro: {x: 1574, y: 524}
    },
  },
  {
    url: '../../assets/img/games/wiw/willy16.jpg',
    seen: false,
    imageObject: null,
    coords: {
      lb: {x: 510, y: 411},
      rb: {x: 568, y: 411},
      lo: {x: 510, y: 473},
      ro: {x: 568, y: 473}
    },
  },
];
var loadedWillys = 0;
var displayedWilly = 0;
var countDisplayedWillys = 0;
var score = 0;

document.addEventListener("DOMContentLoaded", function(event) {

});

function startGame(){
  changeVisibility("intro", false, "flex");//make invisible
  changeVisibility("gameContainer", true, "");//make visible
  preloadWillys();
  renderScore();
}

function endGame(){
  changeVisibility("gameContainer", false, "");//make invisible
  changeVisibility("end", true, "flex");//make visible
  var betekenis = document.getElementById("eindResultaatBetekenis");
  var eindResultaat = document.getElementById("eindResultaat");
  var percentage = Math.round((score/willy.length)*100);
  eindResultaat.innerHTML = percentage+"%";
  if(percentage <= 50){
    betekenis.innerHTML = "Ai ai! Zonder Willy is het geen echte repetitie!";
  }else if(percentage <= 75){
    betekenis.innerHTML = "Je kon de Willyaanse momenten van Willy opsporen, maar af en toe was hij je toch te snel af.";
  }else{
    betekenis.innerHTML = "Je bent een echte Willy-lookalike!";
  }
}

function preloadWillys(){
  for(var i = 0; i < willy.length; i++){
    var currentWilly = new Image();
    currentWilly.src = willy[i].url;
    willy[i].imageObject = currentWilly;
    currentWilly.onload = function (event) {
      willy[this].imageObject = event.currentTarget;
      willyPreloaded();
    }.bind(i);
  }
}

function willyPreloaded(){
  loadedWillys++;
  if(loadedWillys == willy.length){
    loadRandomWilly();
    loadClickListener();
  }
}

function loadClickListener(){
  var imageElement = document.getElementById("willyPicture");
  imageElement.addEventListener('click', function (e) {
    clickOpWilly(e.layerX, e.layerY);
  });
}

function clickOpWilly(x, y){
  var coords = willy[displayedWilly].coords;
  var imageElement = document.getElementById("willyPicture");
  var imageObject = willy[displayedWilly].imageObject;
  var hRatio = imageElement.width / imageObject.width;
  var vRatio = imageElement.height / imageObject.height;
  var scaledX = x/hRatio;//convert to original values
  var scaledY = y/vRatio;//convert to original values
  if(isWilly(coords, scaledX, scaledY)){
    score++;
    renderScore();
    loadRandomWilly();
  }
}

function isWilly(coords, x, y){
  var points = [
    [coords.lb.x, coords.lb.y],
    [coords.rb.x, coords.rb.y],
    [coords.ro.x, coords.ro.y],
    [coords.lo.x, coords.lo.y]
  ];
  return inside(x, y, points);
}

function loadRandomWilly(){
  var imageElement = document.getElementById("willyPicture");
  if(countDisplayedWillys == willy.length){
    endGame();
  }else{
    countDisplayedWillys++;
    var newIdx = Math.floor(Math.random()*willy.length);
    while(willy[newIdx].seen){
      newIdx = Math.floor(Math.random()*willy.length);
    }
    displayedWilly = newIdx;
    imageElement.src = willy[displayedWilly].url;
    willy[displayedWilly].seen = true;
  }
}

function renderScore(){
  var scoreField = document.getElementById("score");
  scoreField.innerHTML = "Aantal gevonden Willy's: "+score;
}

function changeVisibility(elementId, makeVisible, displayClass){
  var element = document.getElementById(elementId);
  if(makeVisible){
    element.className = element.className.replace("hidden", "") + displayClass;
  }else{
    element.className = element.className.replace(displayClass, "")+" hidden";
  }
}

//source: https://github.com/substack/point-in-polygon
function inside(x, y, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};
