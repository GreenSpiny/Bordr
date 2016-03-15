//declare Angular app name
var app = angular.module("App", []);
//add controller to app
app.controller("Controller",
function($scope, $http) {
		socket.on('tweet', function (data) {
			console.log(data.input);
			//worst way to do this, I know
			angular.element(document.getElementById('ticker')).append(("<a href=" + data.input.user.url + " target='_blank'> <li class='tweet list-group-item' data-toggle='tooltip' data-placement='right' title="+ data.input.user.url + "><div class='text'> <img src=" + data.input.user.profile_image_url + " width='40' height='40' class='img-circle'>" + data.input.user.name + "(" + data.input.user.screen_name + ")" + "<span ng-if=('" + data.input.user.followers_count +"/" + data.input.user.friends_count + "| number:2) < 1'> Not well known: </span> <span ng-if='1 <= (" + data.input.user.followers_count + "/" + data.input.user.friends_count + "| number:2) && (" + data.input.user.followers_count + "/" + data.input.user.friends_count + "| number:2) < 2'> Average: </span> <span ng-if=' 2 <= (" + data.input.user.followers_count + "/" + data.input.user.friends_count + "| number:2) && (" + data.input.user.followers_count + "/" + data.input.user.friends_count + "| number:2) < 10'>Popular: </span><span ng-if='10 <= (" + data.input.user.followers_count + "/" + data.input.user.friends_count + "| number:2)'> Celebrity: </span>" + data.input.user.followers_count + "/" + data.input.user.friends_count + " | number:2" + "<ul> <li>" + data.input.text + "</li></ul></div></li></a>"));
			//not actually relevant! Here for historical purposes
			$scope.$apply(function() {
				$scope.tweet = {
					//information for the directive
					url: data.input.user.url,
					profile_image_url: data.input.user.profile_image_url,
					name: data.input.user.name,
					screen_name: data.input.user.user_name,
					followers_count: data.input.user.followers_count,
					friends_count: data.input.user.friends_count,
					text: data.input.text,
				};
			});
		});
});

//directive setup
app.directive('myTweet', function() {
  return {
    restrict: 'E',
    scope: {
      tweetInfo: '=info'
    },
    templateUrl: 'template.html'
  };
});



//connect to server
var socket = io.connect();

//log 'connect' when connects
socket.on('connect', function() { 
console.log('connected');
});

//log 'disconnect' when disconnected
socket.on('disconnect', function() {
console.log('disconnected');
});

//onclick query event
$(function() {
$("#query").click(function(){
	var searchTerm = $("#input").value;
	var limit =  $("#quantity").value;
	//error checks for empty and null input
	if (!(/\S/.test(input) || input==null)) {
		searchTerm="";		
	}
	if (!(/\S/.test(limit) || limit==null)) {
		limit=0;		
	}
	//throws information to the server
	socket.emit('query', {searchTerm: searchTerm, limit: limit});
	});
});