/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , fs = require('fs')
  , moment = require('moment')
  , useragent = require('express-useragent');

/**
 * Initialize
 */

fs.mkdir('./analytics-logs');

var db = {}
  , pageviews = 1;

/**
 * Middleware
 */

var middleware = function (req, res, next) {

  ua = useragent.parse(req.headers['user-agent']);

  function checkType () {
    if (ua.isMobile === true) {
      return 'mobile'
    }
    else {
      return 'desktop'
    }
  }

  records(ua.Browser, ua.Platform, checkType(), req.url, req.headers['accept-language'].split(',')[0]);

  next();

};

/**
 * Records
 */

function records (browser, platform, type, path, language) {

  db[browser] = {
    'views': counter(browser)
  }

  db[platform] = {
    'views': counter(platform)
  }

  db[type] = {
    'views': counter(type)
  }

  db[path] = {
    'views': counter(path)
  } 

  db.overall = {
    'views': pageviews++
  }

  db[language] = {
    'views': counter(language)
  }

  console.log(db)

}

/**
 * Counter
 */

function counter (index) {

  if (db[index] === undefined) {
    return 1;
  }
  else {
    db[index].views++
    return db[index].views++
  }

}

/**
 * Save and export db object
 */

var save = function () {
  fs.writeFile('./analytics-logs/' + moment().format('LL') + '.txt', JSON.stringify(db), function (err) {
    if (err) throw err;
    console.log('Analytics saved to file ./analytics-logs/' + moment().format('LL') + '.txt');
  });
};

var stats = function () {
  return db;
}

/**
 * Automatically save db object once in every two hours
 */

setInterval(function() {
  save();
}, 7200000);

/**
 * Flush all data once in a day
 */

setInterval(function() {
  var db = {};
}, 86400000);

module.exports = middleware;
module.exports.save = save;
module.exports.stats = stats;