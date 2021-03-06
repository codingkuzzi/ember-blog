import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('post', params.post_id);
  },
  actions: {
    createComment(params) {
      var newComment = this.store.createRecord('comment', params);
      var newPost = params.post;
      newPost.get('comments').addObject(newComment);
      newComment.save().then(function(){
        newPost.save();
      });
      this.transitionTo('post');
    }, //end of createComment action
    delete(post) {
      if (confirm('Are you sure you want to delete this post?')) {
        //this.sendAction('destroyRental', rental);
        var comment_deletions = post.get('comments').map(function(comment) {
          return comment.destroyRecord();
        });
        Ember.RSVP.all(comment_deletions).then(function() {
          return post.destroyRecord();
        });
        this.transitionTo('index');
      } //end of if
    }, //end of delete
    gotoUpdate(post){
      this.transitionTo('update-post');
    }
  } //end of actions
});
