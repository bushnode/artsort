# artsort

Package for Reddit articles processed output.

## Installation

```sh
git clone tps://github.com/bushnode/artsort.git
```

## Usage

```javascript
var request = require('sync-request');
var artsort = require('./artsort');
var data = request('GET', 'https://www.reddit.com/r/javascript/.json').getBody('utf8');
console.log(artsort(data, 'aggregate', {field: 'created_utc', ascending: false},
console.log(artsort(data, 'sort', {field: 'score', ascending: true}, 'csv', {delimiter: '; '}));
  'sql', {table: 'art', fields: ['domain', 'articles', 'score']}));
```

### Input data

```json
{"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "t3", "data": {"domain": "self.javascript", "banned_by": null, "media_embed": {}, "subreddit": "javascript", "selftext_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;Did you find or create something cool this week in javascript? &lt;/p&gt;\n\n&lt;p&gt;Show us here!&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;", "selftext": "Did you find or create something cool this week in javascript? \n\nShow us here!", "likes": null, "suggested_sort": null, "user_reports": [], "secure_media": null, "link_flair_text": "Showoff Saturday", "id": "4qwq64", "from_kind": null, "gilded": 0, "archived": false, "clicked": false, "report_reasons": null, "author": "AutoModerator", "media": null, "score": 6, "approved_by": null, "over_18": false, "hidden": false, "num_comments": 13, "thumbnail": "", "subreddit_id": "t5_2qh30", "hide_score": false, "edited": false, "link_flair_css_class": "showoff", "author_flair_css_class": null, "downs": 0, "secure_media_embed": {}, "saved": false, "removal_reason": null, "stickied": true, "from": null, "is_self": true, "from_id": null, "permalink": "/r/javascript/comments/4qwq64/showoff_saturday_july_02_2016/", "locked": false, "name": "t3_4qwq64", "created": 1467483733.0, "url": "https://www.reddit.com/r/javascript/comments/4qwq64/showoff_saturday_july_02_2016/", "author_flair_text": null, "quarantine": false, "title": "Showoff Saturday (July 02, 2016)", "created_utc": 1467454933.0, "distinguished": null, "mod_reports": [], "visited": false, "num_reports": null, "ups": 6}}, ...
```

### Input parameters

```text
json - JSON string
strategy - 'sort' or 'aggregate'
strategyParams - {field: 'created_utc' | 'score', ascending: true | false}
format - 'sql' or 'csv'
params - possible {table: 'xxx', fields: [...]} for SQL or {delimiter: '?'} for CSV
```

### Output

```sql
INSERT INTO art (domain,articles,score) VALUES ('self.javascript',14,72);
INSERT INTO art (domain,articles,score) VALUES ('asep.co',1,24);
INSERT INTO art (domain,articles,score) VALUES ('github.com',2,9);
INSERT INTO art (domain,articles,score) VALUES ('medium.com',4,310);
INSERT INTO art (domain,articles,score) VALUES ('doclets.io',1,2);
INSERT INTO art (domain,articles,score) VALUES ('youtube.com',1,1);
INSERT INTO art (domain,articles,score) VALUES ('educative.io',1,12);
INSERT INTO art (domain,articles,score) VALUES ('houssein.me',1,7);
INSERT INTO art (domain,articles,score) VALUES ('notes.almccann.com',1,0);
INSERT INTO art (domain,articles,score) VALUES ('closuretools.blogspot.com',1,1);
```

### Tests

```sh
npm run test
```