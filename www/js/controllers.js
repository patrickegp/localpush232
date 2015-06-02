angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaToast, $state, $cordovaBarcodeScanner, $cordovaLocalNotification, $cordovaGeolocation) {


  $scope.toast = function(){

    $cordovaToast.showLongBottom('Este es un mensaje de toast Message').then(function(success) {
      // success
    }, function (error) {
      // error
    });
  }


	 $ionicPlatform.ready(function () {

	    $scope.doNot = function () {

	         var now = new Date().getTime();

	         var _10SecondsFromNow = new Date(now + 20 * 1000);

    	      $cordovaLocalNotification.schedule({
    	        id: 1,
    	        title: 'Nuevo Mensaje',
    	        text: 'Hola, tengo como mil días por verte y aun no he podido cuando podemos...',
    	        at: _10SecondsFromNow
    	      }).then(function ( result ) {
	        
	          });
	    };
	});

	$rootScope.$on('$cordovaLocalNotification:schedule', function (event, notification, state) {
      alert("Sheduled");
    });

    $rootScope.$on('$cordovaLocalNotification:trigger', function (event, notification, state) {
      $scope.info = notification;
    });

    $rootScope.$on('$cordovaLocalNotification:clear', function (event, notification, state) {
      //alert("notification");
    });

    $rootScope.$on('$cordovaLocalNotification:click', function (event, notification, state) {
    	$state.go("tab.chats")
	      //alert("Clicked");
	});
	/////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////

	var posOptions = {maximumAge: 3600, timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition( posOptions ).then(function (position) {

      var lat  = position.coords.latitude
      var long = position.coords.longitude

      $scope.lat = lat;

    });

    //////////////////////////////////////////////////////////////
    /////////////////////////////////
    //////////////////////////////////////////////////////////////

    $scope.can = function(){
      $cordovaBarcodeScanner.scan().then(function(barcodeData) {
          // Success! Barcode data is here
          $scope.code = barcodeData;
      }, function(error) {
          // An error occurred
      });
    }


})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $cordovaToast) {
  $scope.settings = {
    enableFriends: true
  };





});
