/* global describe, it */

var assert = require('assert');
var canonicalizer = require('../canonicalizer');

function singularToPluralTest(opts) {
  opts.topics.forEach(function testPlurlization(topic, i) {
    var forms = canonicalizer.getSingularAndPluralForms(topic);
    assert.equal(forms[1], opts.expectedResults[i]);
  });
}

function pluralToSingularTest(opts) {
  opts.topics.forEach(function testPlurlization(topic, i) {
    var forms = canonicalizer.getSingularAndPluralForms(topic);
    assert.equal(forms[0], opts.expectedResults[i]);
  });
}

describe('Canonicalizer', function canonicalizerSuite() {
  it('Get plural forms of singular words', function basicPluralizing() {
    singularToPluralTest({
      topics: [
        'pipewrench',
        'karate manual',
        'hand sanitizer',
        'car battery',
        'interior flat paint'
      ],
      expectedResults: [
        'pipewrenches',
        'karate manuals',
        'hand sanitizers',
        'car batteries',
        'interior flat paints'
      ]
    });
  });

  it('Get plural forms of singular words that end in s', function singularTopicsThatEndInSTest() {
    singularToPluralTest({
      topics: ['epidermis', 'kiss', 'corpus'],
      expectedResults: ['epidermises', 'kisses', 'corpuses']
    });
  });

  it('Get singular forms of plural words', function pluralsingularToPluralTest() {
    pluralToSingularTest({
      topics: ['sandwiches', 'grappling hooks', 'harmonicas', 'geese'],
      expectedResults: ['sandwich', 'grappling hook', 'harmonica', 'goose']
    });
  });

  it('Get plural forms of mass nouns that do not change when pluralized', function massNounsingularToPluralTest() {
    singularToPluralTest({
      topics: [
        'corn syrup',
        'toilet paper',
        'milk',
        'mayonnaise',
        'blood',
        'sweatpants',
        'growth',
        'sourness',
        'counseling',
        'iOS',
        'Mars',
        'mars',
        'ALA',
        'pi',
        'earthenware',
        'pix',
        'surf',
        'usa',
        'ia',
        'oxygen',
        'estrogen',
        'narcissism',
        'democratization',
        'physics',
        'frost',
        'hemlock',
        'camouflauge',
        'paranoia'
      ],
      expectedResults: [
        'corn syrup',
        'toilet paper',
        'milk',
        'mayonnaise',
        'blood',
        'sweatpants',
        'growth',
        'sourness',
        'counseling',
        'ios',
        'mars',
        'mars',
        'ala',
        'pi',
        'earthenware',
        'pix',
        'surf',
        'usa',
        'ia! ia!',
        'oxygen',
        'estrogen',
        'narcissism',
        'democratization',
        'physics',
        'frost',
        'hemlock',
        'camouflauge',
        'paranoia'
      ]
    });
  });

  it('Get plural forms of possessive form nouns', function possessiveTest() {
    singularToPluralTest({
      topics: ["butcher's", "fishes'"],
      expectedResults: ['butchers', 'fishes']
    });
  });

  it('Get plural forms of abbreviated nouns', function abbrsingularToPluralTest() {
    singularToPluralTest({
      topics: ['sept', 'lb', 'lbs'],
      expectedResults: ['Septembers', 'pounds', 'pounds']
    });
  });

  it('Convert oddly pluralized topics', function oddPluralsTest() {
    singularToPluralTest({
      topics: [
        'criterion',
        'cafe',
        'phenomenon',
        'octopus',
        'drive-by',
        'cookie',
        'microwave',
        'corgi',
        'passerby',
        'wave'
      ],
      expectedResults: [
        'criteria',
        'cafes',
        'phenomena',
        'octopi',
        'drive-bys',
        'cookies',
        'microwaves',
        'corgis',
        'passersby',
        'waves'
      ]
    });

    pluralToSingularTest({
      topics: [
        'criteria',
        'phenomena',
        'octopi',
        'cookies',
        'pis',
        'microwaves',
        'corgis',
        'passersby',
        'waves'
      ],
      expectedResults: [
        'criterion',
        'phenomenon',
        'octopus',
        'cookie',
        'pi',
        'microwave',
        'corgi',
        'passerby',
        'wave'
      ]
    });
  });
});
