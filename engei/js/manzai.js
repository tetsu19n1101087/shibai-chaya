'use strict';

const buttons = $('.btn');

const text = ['<h4 class="border m-0 py-3">正解は…</h4><p class="border m-0 py-3">あの、ツッコミが<br>よくないんじゃないかと。</p>',
              '<h4 class="border m-0 py-3">正解は…</h4><p class="border m-0 py-3">お札の束を取り出す。</p>',
              '<h4 class="border m-0 py-3">正解は…</h4><p class="border m-0 py-3">福沢諭吉じゃねぇか！！</p>']

buttons.click((e) => {
  const button = $(e.currentTarget);
  const id = button.attr('id').split('btn')[1];
  const textarea = $(`#boke${id}`);
  const pro = $(`#pro${id}`);
  const tweetDivided = document.getElementById(`tweet-area${id}`);

  $(`#t${id}`).remove()
  if (textarea.val()) {
    button.hide();
    
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('')
      + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('id', `t${id}`)
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', textarea.val());
    anchor.innerText = 'Tweet';
    tweetDivided.appendChild(anchor);
    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
    
    textarea.val('');
    pro.html(text[id-1]);
  }
});