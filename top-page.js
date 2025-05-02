$(function () {
  var buck = document.createElement('div');
  buck.classList.add('buck');
  buck.innerHTML = document.getElementsByClassName('copyBuck')[0].innerHTML;
  document.body.append(buck);

  var pageHeight = document.getElementById('front').offsetHeight;

  $('.buck').css({
    height: pageHeight,
  });

  var archiveContent_w = document.getElementById('/archive1.png').offsetWidth;
  // スライドの初期設定
  $('.archiveContent li:last').prependTo('.archiveContent ul');
  var archiveContent = -archiveContent_w;
  $('.archiveContent li:first').css({ marginLeft: archiveContent });

  const loopSlide = setInterval(() => {
    $('.archiveContent li:first').animate(
      {
        marginLeft: -(archiveContent_w * 2),
      },
      500,
      function () {
        $('.archiveContent li:first').css({ marginLeft: 0 });
        $('.archiveContent li:first').appendTo('.archiveContent ul');
        $('.archiveContent li:first').css(
          { marginLeft: archiveContent + 'px' },
          function () {}
        );
      }
    );
  }, 5000);

  $('.transArrow').click(function () {
    var arrowCheck = $(this).attr('id');
    clearInterval(loopSlide);

    if (arrowCheck === 'arrowLeft') {
      $('.archiveContent li:first').animate(
        {
          marginLeft: 0,
        },
        function () {
          $('.archiveContent li:last').prependTo('.archiveContent ul');
          $('.archiveContent li:first').css({ marginLeft: archiveContent });
        }
      );
    } else if (arrowCheck === 'arrowRight') {
      $('.archiveContent li:first').animate(
        {
          marginLeft: -(archiveContent_w * 2),
        },
        500,
        function () {
          $('.archiveContent li:first').css({ marginLeft: 0 });
          $('.archiveContent li:first').appendTo('.archiveContent ul');
          $('.archiveContent li:first').css({ marginLeft: archiveContent });
        }
      );
    }
  });

  // //  archive終了

  // 色のやつの画像の変更やつ

  var getTh = sessionStorage.getItem('topPage');

  if (getTh === 'null') {
    var number = 1;
  } else {
    var number = Number(getTh);
    number += 1;
  }

  if (number >= 4) {
    number = 4;
  }

  for (i = 1; i <= 9; i++) {
    let storage = $('.transTarget0' + i).attr('id');
    $('.transTarget0' + i).css({
      backgroundImage:
        // 画像のパス
        'url(./images/color0' +
        // 何番目か
        number +
        //  写真の名前
        storage,
    });
  }

  for (i = 1; i <= 6; i++) {
    let storage = $('.transTarget1' + i).attr('id');
    $('.transTarget1' + i)
      .children('img')
      .attr('src', './images/color0' + number + storage);
  }

  $('.logoFixed').click(function () {
    sessionStorage.removeItem('topPage');
  });

  sessionStorage.setItem('topPage', number);
});
