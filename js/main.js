var mainInner = $('.main-inner.index');
var listItems = $('.project-list li');
var folder = '/images/';
var imgArray = ['index_mockup3.jpg', 'image_thumbnail_for_logovideo.jpg', 'all.45.jpg', 'card_mockups.jpg', 'cookies.jpeg'];
var i = 0;
var lightGray = 'rgba(0,0,0,0.54)';
var percent = 1;

// set color when page loads
$(mainInner).css('background-image', 'url(/images/'+imgArray[i]+')');
$(listItems).eq(i).children().css('color', 'black');

// search through images folder
// $.ajax({
//   url: folder,
//   success: function (data) {
//     $(data).find('a').attr('href', function (i, val) {
//         var images = val.split('i');
//
//       if( val.match(/\.(jpe?g|png|gif)$/) ) {
//         // var images = val.split(val[i].indexOf(''));
//         // var sub = val.substring(0, val.indexOf('.')+4);
//         // var images = val.split(sub).pop();
//       }
//     });
//   }
// });

function previousImage() {
  if (i <= 0) {
    i = imgArray.length - 1;
    $(mainInner).css('background-image', 'url(/images/'+imgArray[i]+')');
    $(listItems).eq(i).children().css('color', 'black');
    $(listItems).eq(i).next('li').children().css('color', lightGray);

    // if the first element in each column is highlighted
    if ((i % 2 === 0)+1) {
      // resets color to first list item
      $(listItems).first().children().css('color', lightGray);
    }

  } else {
    i-=1;
    $(mainInner).css('background-image', 'url(/images/'+imgArray[i]+')');
    $(listItems).eq(i).children().css('color', 'black');
    $(listItems).eq(i).next('li').children().css('color', lightGray);

    // if the first element in each column is highlighted
    if ((i % 2 === 0)+1) {
      $(listItems).eq(i+1).children().css('color', lightGray);
    }
  }
}

function nextImage() {
  if (i === (imgArray.length - 1)) {
    i=0;
    $(mainInner).css('background-image', 'url(/images/'+imgArray[i]+')');
    $(listItems).eq(i).children().css('color', 'black');
    $(listItems).eq(i).prev('li').children().css('color', lightGray);

    // if the last element in each column is highlighted
    if (i % 2 === 0) {
      // resets color to last list item
      $(listItems).last().children().css('color', lightGray);
    }
  } else {
    i+=1;
    $(mainInner).css('background-image', 'url(/images/'+imgArray[i]+')');
    $(listItems).eq(i).children().css('color', 'black');
    $(listItems).eq(i).prev('li').children().css('color', lightGray);

    // if the last element in each column is highlighted
    if (i % 2 === 0) {
      $(listItems).eq(i-1).children().css('color', lightGray);
    }
  }
}

$(document).keydown(function(e) {
  var arrow = { left: 37, up: 38, right: 39, down: 40 };
  switch(e.which) {
    case arrow.left:
      previousImage();
      break;

    case arrow.right:
      nextImage();
      break;

    case arrow.up:
      previousImage();
      break;

    case arrow.down:
      nextImage();
      break;

    default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

$('.portfolio-link').click(function() {
  $('.overlay').show(0);
  $('.wrapper').removeClass('hidden');
  $('body').css('overflow-y', 'hidden');
  $('header').not('header.portfolio-header').css('opacity', '0');

  $('.projects').toggleClass('active');

  $('.portfolio').toggleClass('active');
  $('.portfolio-header').toggleClass('active');
  $('.portfolio-header nav').toggleClass('active');
  $('.overlay-bottom-border').toggleClass('active');
});

$('.overlay a').click(function() {
  // window.history.popState();
  $('.wrapper').addClass('hidden');
  $('.overlay').delay(400).hide(0);
  $('body').css('overflow-y', 'initial');
  $('header').not('header.portfolio-header').css('opacity', '1');

});

function fadeAwayBlocks() {
  setTimeout(function(){
    $('.block-left').css('transform','translateX(-100%)').fadeOut(800);
    $('.block-right').css('transform','translateX(100%)').fadeOut(800);
    $('#progressWrapper, .percent').fadeOut(400);
  }, 300);
}

(function loop(i) {
   setTimeout(function () {
      $('.percent').text(percent + '%');
      if (percent < 10) {
        $('.percent').prepend('0');
      }
      percent++;
      if (--i) {
        loop(i); // iteration counter
      }
   }, 40); // delay
})(100); // iterations count

function move() {
  var height = 1;
  function frame() {
    if (height >= 100) {
      clearInterval(id);
      fadeAwayBlocks();
    } else {
      height++;
      $('#myBar').css('height', ''+height+'%');
    }
  }
  var id = setInterval(frame, 43);
}

(function() {
  // if local storage is supported
  if (typeof(Storage) !== "undefined") {
    // if local storage is empty
    if (localStorage.getItem("pageVisited") === null) {
      $('.block').css('display', 'initial');
      // Store
      localStorage.setItem("pageVisited", "1");
    } else {
      $('.block').css('display', 'none');
    }
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }

  move();
  // add 100 ms transition delay for each new added list
  $('.projects').each(function(i) {
    $(this).css('transition-delay', i*100+'ms');
  });

  if (document.location.href.indexOf('portfolio') > -1) {
    $('.portfolio-link').addClass('current');
  } else {
    $('.portfolio-link').removeClass('current');
  }

  if (document.location.href.indexOf('about') > -1) {
    $('.about-link').addClass('current');
  } else {
    $('.about-link').removeClass('current');
  }
})();
