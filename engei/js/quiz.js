'use strict';

const scene = $('#scene');
const enoughSentence = $('#enough_sentence');
const missingSentence = $('#missing_sentence');
const buttons = $('.btn');
const points = $('#points');
const card = $('.card');
const resultArea = $('#result-area');

const success = {
  icon: 'success',
  title: '正解',
  text: '',
  confirmButtonText: '次の問題',
};
const error = {
  icon: 'error',
  title: '不正解',
  text: '',
  confirmButtonText: '次の問題',
};

let questionNumber = 0;
let point = 0;

const sceneSentences = [
  '',
  '近所に住んでいる友達の欽ちゃん(kinchan)が寿限無と一緒に学校に行くために誘いにくる場面',
  '寿限無のお母さんが寿限無を起こしに行くがなかなか起きなくて…',
  '寿限無のお母さんと寿限無と一緒に学校に行くために誘いにきた欽ちゃんが話している',
  '寿限無が欽ちゃんの頭を叩いてたんこぶができた場面',
  '',
  'オリの中で美味しそうなドーナツ（パン）を持っている少年を見つけた「虎」は朝から何も食べていないことに気付いて少年にパンをねだった。',
  '',
  '',
  '男の子からあんぱんを脅し取った男はそのあともライオンを見に来る親子を驚かし続けました。すると園内アナウンスがなり、これからライオンと虎の決闘ショーがあるというのです。焦る男は長谷川さんを呼ぶも、誰も来ません。会場にはさっきドーナッツを脅し取った親子もいました。“ねぇねぇあの虎弱そうじゃない？”',
];

const enoughSentences = [
  '寿限無のタイトルの英訳',
  'ある日近所の欽ちゃんが学校に誘うために来て、言いました。',
  '寿限無のお母さん、あいつの名前長すぎだよ。今日の学校の時間終わっちゃったよ。',
  'あらま、欽ちゃんいい子ね！',
  'たんこぶ',
  'What is his job.',
  '和訳',
  '和訳',
  '和訳',
  '和訳',
];

const missingSentences = [
  '',
  'One day his neighbor  Kinchan came to ( ) for school and Kinchan said ~',
  'Man, his name was so long. school for today is ( ) finished.',
  '( )Kinchan your so nice',
  '',
  'The job is much simpler than that. The job is a “TIGER”. You are to become a “TIGER”.',
  'The tiger stood up and caught the donut in his hands!!!',
  'ruff,ruff',
  'Oh, there’s a little boy over there in the back, holding a donut <span class="text-danger">a japanese sweet red beans donut</span>',
  'What do you expect from a tiger that eats red bean donuts',
];

const correctAnswers = [
  'jugemu jugemu gokounosurikire',
  'pick him up',
  'already',
  'aramaa',
  'bump',
  '虎真似',
  '虎が前足でドーナツをつかんでる！',
  '犬の鳴きまね',
  'あんぱん',
  'ドーナツを食べる虎が強いわけないでしょ',
];

const answers = [
  [
    'jugemu jugemu gokounosurikire',
    'So many So many infinity',
    'auspicious auspicious blissful',
  ],
  ['get out to meet', 'pick him up', 'Invite'],
  ['already', 'yet', 'always'],
  ['well', 'I see', 'aramaa'],
  ['wound', 'bump', 'tankobu'],
  ['虎のお世話', '虎の撮影', '虎真似'],
  [
    '虎がドーナツを食べた！',
    '虎にあげるドーナツはない！',
    '虎が前足でドーナツをつかんでる！',
  ],
  ['犬の鳴きまね', '羊の鳴きまね', '虎の鳴きまね'],
  ['むしぱん', 'あんぱん', '饅頭'],
  [
    'ドーナツを食べる虎が強いわけないでしょ',
    '虎がとったドーナッツのお返しをするわけないでしょ',
    'ドーナツからどうやって虎を連想するのよ',
  ],
];

// 初期化
insert(questionNumber);
resultArea.hide();

buttons.click((e) => {
  const button = $(e.currentTarget);
  const answer = button.text();

  const result = judge(answer);
  if (questionNumber < 9) {
    swal.fire(result).then(() => {
      questionNumber += 1;
      if (questionNumber == 5) {
        $('#intro').html(
          '<h3 class="text-center">「動物園」より</h3>' +
            '<div class="text-center mb-4"><a href="https://www.youtube.com/watch?v=uaDe0Mn5Yr8">動画はこちら</a></div>' +
            '<div class="text-center my-3"><img src="images/javier-virues-ortega-xWg2JqRmitI-unsplash.jpg" alt="" style="width: 30%;"></div>' +
            '<p class="text-center">ある男が動物園に職を探しにきました。<br>園長が男に与えた職は「虎」！<br>虎の訓練でも餌でも撮影でもない<br>その仕事の内容とは…？</p>'
        );
      }
      insert(questionNumber);
    });
  } else {
    success.confirmButtonText = '結果を見る';
    error.confirmButtonText = '結果を見る';
    swal.fire(result).then(() => {
      resultArea.show();
      $('main').remove();
      points.html(
        `あなたの結果：<br>${enoughSentences.length}問中${point}問正解`
      );
    });
  }
});

function judge(answer) {
  if (answer == correctAnswers[questionNumber]) {
    point += 1;
    return success;
  } else {
    return error;
  }
}

function insert(questionNumber) {
  scene.html(sceneSentences[questionNumber]);
  enoughSentence.html(enoughSentences[questionNumber]);
  missingSentence.html(missingSentences[questionNumber]);
  buttons.each((i, e) => {
    $(e).text(answers[questionNumber][i]);
  });
}
