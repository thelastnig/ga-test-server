emojisource
==================

This is a thin, opinionated wrapper around [node-emoji](https://github.com/omnidan/node-emoji). It provides random emoji and provides a filter for "boring" emoji.

Installation
------------

    npm install emojisource

Usage
-----

    var emojisource = require('emojisource');
    var emoji = emojisource.getRandomTopicEmoji();
    if (!emojisource.emojiValueIsOKAsATopic('🆒')) {
      console.log('Not OK! Emoji is too boring.');
    }

Tests
-----

Run tests with `make test`.

License
-------

MIT.
