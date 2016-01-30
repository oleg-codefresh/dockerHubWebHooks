var table = require("text-table");
var convert = require('object-array-converter');
var _ = require('lodash');
var template = require('formatter');
var formatter = function()
{

  var data =
   {
   "push_data": {
      "pushed_at": 1449017033,
      "images": [],
      "tag": "newtag",
      "pusher": "biscarch"
   },
   "callback_url": "https://registry.hub.docker.com/u/biscarch/webhook-tester-repo/hook/2i5e3gj1bi354asb3f05gchi4ccjg0gas/",
   "repository": {
      "status": "Active",
      "description": "",
      "is_trusted": false,
      "full_description": null,
      "repo_url": "https://registry.hub.docker.com/u/biscarch/webhook-tester-repo/",
      "owner": "biscarch",
      "is_official": false,
      "is_private": false,
      "name": "webhook-tester-repo",
      "namespace": "biscarch",
      "star_count": 0,
      "comment_count": 0,
      "date_created": 1449016916,
      "repo_name": "biscarch/webhook-tester-repo"
   }
};
 var key = _.keys(data.push_data);
 var values  = _.values(data.push_data);

 var array = convert.toArray(data.push_data);
 var strings = _.map(array, function(d){
   return JSON.stringify(d);
 })
 var t = table([
     [ 'beep', '1024' ],
     [ 'boop', '334.212' ],
     [ 'foo', '1006' ],
     [ 'bar', '45.6' ],
     [ 'baz', '123.' ]
 ], { align: [ 'l', '.' ] });

 var hookFormatter = template('we are processing hook pushed at {{0}} \n added images {{1}}\n with tag {{2}}');

var pushedData = data.push_data;
var julian = require('julian');
//jd = pushedData.pushed_at;
//pushedData.pushed_at = julian.toDate(1.417566161e+09)
 console.log(hookFormatter(
    pushedData.pushed_at,
    pushedData.images,
    pushedData.tag));

};

formatter();
