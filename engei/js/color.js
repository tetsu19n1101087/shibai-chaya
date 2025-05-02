'use strict';
let num = Number(sessionStorage.getItem('num'));
let color = [50,0]
if (num) {
  $('header').css('filter', `grayscale(${color[num - 1]}%)`)
  $('img').css('filter', `grayscale(${color[num - 1]}%)`)
  num = 2
  sessionStorage.setItem('num', `${num}`);
} else {
  $('header').css('filter', 'grayscale(100%)')
  $('img').css('filter', 'grayscale(100%)')
  sessionStorage.setItem('num', '1')
}