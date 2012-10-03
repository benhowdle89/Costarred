/*global jQuery, Handlebars */
jQuery(function( $ ) {
	'use strict';

	var Utils = {
		ajax: function(url, success, context){
			$.ajax({
			  type: "POST",
			  url: url,
			  dataType: 'jsonp'
			}).done(function(msg){
				success.call(context, msg);	
			});
		}
	};

	var App = {
		init: function() {
			this.apiKey = '23afca60ebf72f8d88cdcae2c4f31866';
			this.baseUrl = 'http://api.themoviedb.org/3/';
			this.films = [];
			this.actors =  [];
			this.titles = [];
			this.doRender = [];
			this.classTranslate = ['first', 'second'];
			this.cacheElements();
			this.bindEvents();
			this.setupUi();
		},
		buildPersonSearchUrl: function(person){
			return this.baseUrl + 'search/person?query=' + person + '&api_key=' + this.apiKey; 
		},
		buildMovieListUrl: function(id){
			return this.baseUrl + 'person/' + id + '/credits?api_key=' + this.apiKey; 
		},
		storeActor: function(json){
			var that = this;
			var id = json.results[0].id;
			var name = json.results[0].name;
			var i = (this.actors.length == 1) ? 1 : 0;
			var data = {
				id: id,
				name: name,
				actorClass: this.classTranslate[i]
			};
			this.actors.push(data);
			Utils.ajax(that.buildMovieListUrl(id), that.storeFilms, that);
		},
		storeFilms: function(json){
			var x = 0;
			for(x in json.cast){
				var title = json.cast[x].original_title;
				this.films.push({title: title});
			}
			this.doRender.push(true);
			if(this.doRender.length > 1){
				this.getMatches(this.films);
				this.renderResults();
			}
		},
		getMatches: function(movies) {
		  var ref;
		  for(var i in movies) {
		    ref = movies[i].title;
		    if(this.titles.indexOf(ref) == -1) {
		    	movies.splice(i, 1);
		    } else {
		    	this.titles.push(ref);
		    }
		  }
		  this.films = movies;
		},
		cacheElements: function() {
			this.$films = $('#films');
			this.$actors = $('.actors');
			this.$controls = $('.controls');
			this.$noResults = $('.no-results');
			this.$yesResults = $('.yes-results');
			this.$inputs = $('.inputs input[type="text"]');
			this.filmTemplate = Handlebars.compile( $('#film-template').html() );
			this.actorTemplate = Handlebars.compile( $('#actor-template').html() );
		},
		bindEvents: function() {
			var controls = this.$controls;
			var that = this;
			controls.on( 'click', 'button', function(){
				that.search();
			});
		},
		search: function(){
			var that = this;
			that.actors = [];
			that.films = [];
			that.titles = [];
			this.doRender = [];
			this.$inputs.each(function(){
				if($(this).val() == '') return;
				Utils.ajax(that.buildPersonSearchUrl($(this).val()), that.storeActor, that);
			});
		},
		setupUi: function(){
			this.$noResults.hide();
		},
		renderResults: function(){
			this.$films.html( this.filmTemplate( this.films ) );
			this.$actors.html( this.actorTemplate( this.actors ) );
			this.$noResults.hide();
			this.$yesResults.show();
		},
		renderNoResults: function(){
			this.$noResults.show();
			this.$yesResults.hide();
		}
	};

	App.init();

});