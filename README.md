#no-js-analytics
##simple analytics middleware for [express](http://expressjs.com/)

no-js-analytics is really basic visitor analytics for people not so interested in nice graphs and stuff like that, but ho would like to instead trade those few requests and page loading time for something more useful. no-js-analytics works even if a visitor does not have javascript enabled, which some may find self esteem improving, because all those security paranoids running noscript will be caught too. no-js-analytics also saves statics of any call to API's and alike, without messing response data. no-js-analytics requires no database, because all visitor statics are held in **object**, geniously named as db. This makes no-js-analytics easy to adopt and the basic fundamental of speed is met, as the fact that visitor data will be lost in case of server crash or restart. Anyhow, the object containing the visitor statics is saved every two hours (by default) into logs, but no-js-analytics provides an easy way to expose that data in nice JSON format to anywhere you like using the analytics.stats() method. Here is an example output:

```
{
  "Browser": {
    "Firefox": {
      "views": 6
    },
    "Safari": {
      "views": 11
    }
  },
  "Platform": {
    "Microsoft Windows": {
      "views": 9
    },
    "Apple Mac": {
      "views": 3
    },
    "iPhone": {
      "views": 5
    }
  },
  "Type": {
    "desktop": {
      "views": 13
    },
    "mobile": {
      "views": 11
    }
  },
  "Path": {
    "/": {
      "views": 20
    },
    "/analytics": {
      "views": 4
    }
  },
  "Language": {
    "en-US": {
      "views": 24
    }
  },
  "overall": {
    "views": 24
  }
}
```

##Tests
   I made two tests locally on the default express page and below are the results.  
   [google analytics](http://snag.gy/WFO8T.jpg)  
   [no-js-analytics](http://snag.gy/qctlQ.jpg)  
   As you can see, the amount of requests went down by 4 and the overall response time reduced by 150ms - **locally**.

##Installation:   
```$ npm install no-js-analytics```

##Usage:
```javascript
var analytics = require('no-js-analytics');

app.configure(function(){
  ... (start of your express configuration)

  app.use(express.bodyParser());
  // Add analytics below express.bodyParser()
  app.use(analytics);

  ... (rest of your configurstion)
});
```

##Methods
###analytics.save()
   Writes the current data of db object into a new .txt file in ./analytics-logs
###analytics.stats()
   Renders the current data of db object in JSON format. For an example, you might want to show the data in /analytics page, which can easily be achieved as below.
```
app.get('/analytics', function(req, res){
  res.send(200, analytics.stats());
});
```
###Defaults
   Top of these methods no-js-analytics automatically saves visitor information into a text file every two hours, declared in milliseconds at lib/middleware.js. Below it you can also find the default interval of db flush, which is set to happen once in a day.

###To-do
1. Returning and new visitor counters
2. Some nice way to represent the data and more robust data structure
3. More analytic features
4. Spread to additional frameworks and languages
5. World domination and bye-bye to formal javascript analytics

###License (MIT)
   Copyright (c) 2013 Juuso Haavisto <juuso@mail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
