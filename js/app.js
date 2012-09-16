var costarred = {
	apiKey: '23afca60ebf72f8d88cdcae2c4f31866',
	baseUrl: 'http://api.themoviedb.org/3/',
	matches: [],
	results: $('#results'),
	searchButton: $('.controls button'),
	input1: $('#actor1'),
	input2: $('#actor2'),
	init: function(){
		searchButton.click(function(){
			this.search([input1.val(), input2.val()]);
		});
	},
	buildUrl: function(type, query){
		return this.baseUrl + '/' + type + '?api_key=' + this.apiKey + '&query=' + query,
	},
	ajax: function(url, data, callback){
		$.ajax({
		  type: 'POST',
		  url: url,
		  data: {},
		  success: function(json){
		  	costarred[callback](json);
		  },
		  dataType: 'json'
		});
	},
	findMatches: function(){},
	toggleResults: function(){},
	toggleInputs: function(){},
	clearInputs: function(){},
	findName: function(json){
		return ;
	},
	findPoster: function(){},
	findThumb: function(){},
	doSearch: function(term){
		this.ajax('people', );
	},
	clearMovies: function(){
		this.matches = [];
	},
	search: function(terms){
		var termsL = terms.length;
		while(termsL--){
			matches.push(costarred.doSearch(terms[termsL]));
		}
	}
};

$(document).ready(function(){

	costarred.init();

});