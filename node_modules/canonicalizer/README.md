canonicalizer
=============

A module that handles getting singular and plural forms of nouns. Deals with input that is in possessive form, is an uncountable noun, and other edge cases. Does its heavy lifting with [inflection](https://github.com/dreamerslab/node.inflection).

Installation
------------

    npm install canonicalizer

Usage
-----

		var canonicalizer = require('canonicalizer');
		var forms = canonicalizer.getSingularAndPluralForms('passerby');
		console.log(forms[1], 'is the plural form of', forms[0], '.');
		// passersby is the plural form of passerby.

Tests
-----

Run tests with `make test`.

License
-------

MIT.
