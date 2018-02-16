'use strict';

var productNum = [];
var lastThree = [];
var totalClicks = 0;

function Product(name, filepath, id) {
  this.name = name;
  this.filepath = filepath;
  this.id = id;
  this.timesShown = 0;
  this.timesClicked = 0;
  productNum.push(this);

  this.imageMaker = function() {
    var imageContainer = document.getElementById('imageContainer');
    var img = document.createElement('img');
    img.setAttribute('name', this.name);
    img.setAttribute('src', this.filepath);
    img.id = this.id;
    imageContainer.appendChild(img);
  };
}

new Product('Bag', 'img/bag.jpg', 'bag');
new Product('Banana', 'img/banana.jpg', 'banana');
new Product('Bathroom', 'img/bathroom.jpg', 'bathroom');
new Product('Boots', 'img/boots.jpg', 'boots');
new Product('Breakfast', 'img/breakfast.jpg', 'breakfast');
new Product('Bubblegum', 'img/bubblegum.jpg', 'bubblegum');
new Product('Chair', 'img/chair.jpg', 'chair');
new Product('Cthulhu', 'img/cthulhu.jpg', 'cthulhu');
new Product('Dog-duck', 'img/dog-duck.jpg', 'dog-duck');
new Product('Dragon', 'img/dragon.jpg', 'dragon');
new Product('Pen', 'img/pen.jpg', 'pen');
new Product('Pet-sweep', 'img/pet-sweep.jpg', 'pet-sweep');
new Product('Tauntaun', 'img/tauntaun.jpg', 'tauntaun');
new Product('Unicorn', 'img/unicorn.jpg', 'unicorn');
new Product('Usb', 'img/usb.gif', 'usb');
new Product('Water-can', 'img/water-can.jpg', 'water-can');
new Product('Wine-glass', 'img/wine-glass.jpg', 'wine-glass');

var randomNum = function() {
  return Math.floor(Math.random() * productNum.length);
};

var renderImages = function() {
  var imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = '';
  var currentThree = [];
  for (var i = 0; i < 3; i++) {
    var randomProduct = productNum[randomNum()];
    if (currentThree.includes(randomProduct) || lastThree.includes(randomProduct)){
      i--;
    } else {
      currentThree.push(randomProduct);
      randomProduct.imageMaker();
      console.log(currentThree);
    }
  }
  lastThree = currentThree;
};

function productSelector(event) {
  event.preventDefault();
  if(event.target.nodeName === 'IMG') {
    for (var i = 0; i < productNum.length; i++) {
      if (productNum[i].id === String(event.target.id) && totalClicks < 25) {
        productNum[i].timesClicked++;
        totalClicks++;
        renderImages();
      } else if (totalClicks === 25) {
        imageContainer.removeEventListener('click', productSelector);
        var elem = document.querySelector('#imageContainer');
        elem.parentNode.removeChild(elem);
        var canvas = document.getElementById('chart');
        canvas.style.display = 'visible';
        var footer = document.querySelector('footer');
        var thankYou = document.createTextNode('Thank you for taking the time to complete this survey. We truly value the information you have provided.');
        footer.appendChild(thankYou);
        var data = [];
        var name = [];
        for (var j = 0; j < productNum.length; j++) {
          data.push(productNum[j].timesClicked);
          name.push(productNum[j].name);
        }
        chart(name,data);
      }
    }
  }
}

var imageContainer = document.getElementById('imageContainer');
imageContainer.addEventListener('click', productSelector);

renderImages();

function chart(name, data) {

  var canvas = document.getElementById('chart');
  canvas.style.display = 'collapse';
  var ctx = canvas.getContext('2d');

  var chartConfig = {
    type: 'horizontalBar',
    data: {
      labels: name,
      datasets: [{
        label: 'clicked',
        data: data,
        backgroundColor: 'rgba(1, 103, 190, 0.2)',
        borderColor: 'rgba(3, 177, 196, 1)',
        borderWidth: 1
      }]
    },
    options: {
      animation: {
        duration: 3500
      },
      title: {
        display: true,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  };

  var myChart = new Chart(ctx, chartConfig);
}