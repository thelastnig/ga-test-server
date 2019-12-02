var inflection = require('inflection');
var uncountableNouns = require('./uncountablenouns');
var uncountableSuffixes = require('./uncountablesuffixes');
var find = require('lodash.find');
var oddities = require('./canonicaloddities');
var abbr = require('./abbr');

function getSingularAndPluralForms(word) {
  word = word.toLowerCase();

  function endsWithUncountableNoun(uncountable) {
    return endsWith(word, uncountable);
  }

  word = depossess(word);
  word = abbr.expand(word);

  var isUncountable =
    isAGerund(word) ||
    find(uncountableNouns, endsWithUncountableNoun) ||
    find(uncountableSuffixes, endsWithUncountableNoun);

  var pluralWord = word;
  var singularWord = word;

  if (!isUncountable) {
    if (oddities.wordIsInOddities(word)) {
      var forms = oddities.getBothForms(word);
      singularWord = forms[0];
      pluralWord = forms[1];
    } else if (endsWith(word, 'is') || endsWith(word, 'us')) {
      pluralWord = pluralWord + 'es';
    } else {
      singularWord = inflection.singularize(word);
      pluralWord = inflection.pluralize(word);
    }
  }

  return [singularWord, pluralWord];
}

// http://stackoverflow.com/questions/280634/endswith-in-javascript
function endsWith(str, suffix) {
  if (str.length < 1 || str.length < suffix.length) {
    return false;
  } else {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
}

function isAGerund(word) {
  return endsWith(word, 'ing');
}

// Assumed word ends in 's.
function depossess(word) {
  var depossessed = word;
  if (endsWith(word, "'s")) {
    // Singular possessive.
    depossessed = word.substr(0, word.length - 2);
  } else if (word[0] !== "'" && endsWith(word, "s'")) {
    // Plural possessive.
    depossessed = word.substr(0, word.length - 1);
  }
  return depossessed;
}

module.exports = {
  getSingularAndPluralForms: getSingularAndPluralForms
};
