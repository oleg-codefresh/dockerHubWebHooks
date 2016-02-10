

describe('e2e test for dockerhub webhooks', function(){

 var hookData = {
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
}

   it('sanity', function(done){

     var url =  'http://localhost:3000/';
     var request = require('supertest')(url)

     request
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
       done();
    });
   })

   it.only('web hoosk', function(done){

     var url =  'http://localhost:3000';
     var request = require('supertest')(url)

     request
    .post('/dockerhub')
    .send(hookData)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
       console.log(res.body);
       done();
    });
   })
})
