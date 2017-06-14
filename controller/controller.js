var app=angular.module('myApp',[]);
			
			 app.controller('myCtrl',['$scope','$http',function($scope,$http){
		    	$http({
				    method: 'get', 
				    url: 'https://www.anapioficeandfire.com/api/books/'
				})
				.then(function (response) {
				    $scope.books = response.data;
				    console.log($scope.books[0]);
				   
				}
				,function (error){
				    console.log(error, 'can not get data.');
					});
				}])
			 .directive('bookDirective',function(){
		    	return{
		    		restrict:'E',
		    		//scope:{},
		    		templateUrl:'./views/Books-view.html',
		    		
		    	};
		    });

			 /*.directive('charDirective',function(){
		    	return{
		    		restrict:'E',
		    		//scope:{},
		    		templateUrl:'./views/Character-view.html',
		    		
		    	};
		    });*/
		    

		    //Controller to load Characters data
    app.controller('characterCtrl',['$http','$scope','$window',function($http,$scope,$window){
		
		function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

		var queryValue = getParameterByName('book');
				//Get the BookID from URL.
			    	var str=queryValue;
			    	var pos = str.lastIndexOf("/");
					str =  str.substr(pos + 1);
				    $scope.bookId=str;
				//******End*********
		$http({
	        method: 'GET',
	        url: 'https://www.anapioficeandfire.com/api/books/'+$scope.bookId
	      }).then(function (response) {
          
          $scope.Charresult=response.data;
          $scope.bookName=$scope.Charresult.name;
          console.log($scope.Charresult);
          
		});
	      $scope.detailpage = function (code) {
					var str=code;
					var pos = str.lastIndexOf("/");
					str =  str.substr(pos + 1);
				    $window.location.href ='CharacterDetail-view.html?charId='+str;
					//$location.path("views/CharacterDetail-view.html?charId=39");
				
					}
	}])
	.directive('charDirective',function(){
		    	return{
		    		restrict:'E',
		    		//scope:{},
		    		templateUrl:'./views/CharacterDetail-view.html',
		    		
		    	};
		    }); 

    
    app.controller('charDetailCtrl',['$http','$scope',function($http,$scope){
		 	
		 function getParameterByName(name) {
		    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        results = regex.exec(location.search);
		    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
				}

			var charId = getParameterByName('charId');
			
			$scope.charId=charId;
		 	$http({
				    method: 'get', 
				    url: 'https://www.anapioficeandfire.com/api/characters/'+charId
				})
				.then(function (response) {
				    $scope.name = response.data.name;
				    $scope.aliases=response.data.aliases[0];
				    $scope.gender=response.data.gender;
				    $scope.playedBy=response.data.playedBy[0];
				    $scope.died=response.data.died;
				   	console.log(response.data);
				   });
			
    			}]);
