var test = require('tape');
var emojisource = require('../emojisource');
var isEmoji = require('is-emoji');

test('Random emoji', function randomEmojiTest(t) {
  t.plan(3);

  var emoji = emojisource.getRandomTopicEmoji();
  t.equal(typeof emoji, 'string');
  t.ok(emoji.length > 0);
  t.ok(isEmoji(emoji));
});

test('Filter boring emoji', function filterBoringEmojiTest(t) {
  t.plan(2);

  t.ok(!emojisource.emojiValueIsOKAsATopic('🆒'));
  t.ok(emojisource.emojiValueIsOKAsATopic('🐍'));
});
