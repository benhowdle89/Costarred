var costarred = {
	apiKey: '23afca60ebf72f8d88cdcae2c4f31866',
	baseUrl: 'http://api.themoviedb.org/3/',
	matches: [],
	init: function(){},
	buildUrl: function(type, query){
		return this.baseUrl + '/' + type + '?api_key=' + this.apiKey + '&query=' + query,
	},
	ajax: function(){},
	findMatches: function(){},
	toggleResults: function(){},
	toggleInputs: function(){},
	findName: function(){},
	findPoster: function(){},
	findThumb: function(){}
};