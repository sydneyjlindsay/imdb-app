$(document).ready(function() {
	var bluePrint = Backbone.Router.extend({
		routes: {
			'': 'home',
			'search/:query': 'search' 
		}, 

		home: function() {
			console.log('home');
			$('.page').hide(); 
			$('#home').show();
		}, 

		search: function(query) {
			$('.page').hide();
			$('#search-results').show();
		}
	});

	var myRouter = new bluePrint();
	Backbone.history.start();

	$('#search-form').on('submit', function(e) {
		e.preventDefault();
		var query = $('#movie-query').val();

		myRouter.navigate('search/'+query, {trigger: true});

		function onReceivedMovies(movies) {
			console.log('onReceivedMovies');
			console.log(movies); 

			console.log(movies.Search[0].Title);
		}

		$.get(
			'http://www.omdbapi.com/', 
			{s: query},
			onReceivedMovies, 
			'json'
		);

	});

});