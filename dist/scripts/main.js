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
			
			var movieString = '';
			for(var i=0; i<movies.Search.length; i++) {
				
				var searchResults = movies.Search;
				var allMovies = searchResults[i].Title;

				console.log(allMovies);
				
				movieString += '<div>'+allMovies+'</div>';				
			}

			$('#movie-list').html(movieString);
		}

		$.get(
			'http://www.omdbapi.com/', 
			{s: query},
			onReceivedMovies, 
			'json'
		);
	});
});