// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    db = window.openDatabase("sqlite","1.0","hypermanagerDB", 2000);
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS BPpressure (bpid integer primary key, dateNow text, systolic integer, diastolic integer, pulse integer)");
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS information (detailId integer primary key, age integer, weight float, heights float, bmi float, diabet integer, kidney integer, heart integer)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS detailss (detailId integer primary key, age integer, weight float, heights float, bmi float, diabet text, kidney text, heart text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (userid integer primary key, email text, pass text)");
    $cordovaSQLite.execute(db, "DROP TABLE hypermanagerDB.user");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user2 (userid integer primary key, name text, email text, pass text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS remind (remindId integer primary key, dateNow text, title text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS treat (treatId integer primary key, selectAge text, selectBP text, rawat text)");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

      .state('loginn', {
    url: '/loginn',
    abstract: true,
    templateUrl: 'templates/l.html',
    controller: 'AppCtrl'
  })

  .state('loginn.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('loginn.loginUser', {
    url: '/loginUser',
    views: {
      'menuContent': {
        templateUrl: 'templates/loginUser.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('loginn.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'signupCtrl'
      }

    }
  })

  .state('app.addBP', {
    url: '/addBP',
    views: {
      'menuContent': {
        templateUrl: 'templates/addBP.html',
        controller: 'readBPCtlr'
      }

    }
  })

  .state('app.lamanutama', {
    url: '/lamanutama',
    views: {
      'menuContent': {
        templateUrl: 'templates/lamanutama.html'
      }

    }
  })

    .state('loginn.lamanAdmin', {
    url: '/lamanAdmin',
    views: {
      'menuContent': {
        templateUrl: 'templates/lamanAdmin.html'
      }

    }
  })

  .state('app.rekod', {
    url: '/rekod',
    views: {
      'menuContent': {
        templateUrl: 'templates/rekod.html',
        controller: 'RecordCtrl'
      }

    }
  })

  .state('app.share', {
    url: '/share',
    views: {
      'menuContent': {
        templateUrl: 'templates/share.html',
        controller: 'shareCtrl'
      }

    }
  })

  .state('app.detail', {
    url: '/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/detail.html',
        controller: 'detailCtrl'
      }
    }
  })

  .state('app.editDetail', {
    url: '/editDetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/editDetail.html',
        controller: 'EditCtrl'
      }
    }
  })

  .state('app.rawatan', {
    url: '/rawatan',
    views: {
      'menuContent': {
        templateUrl: 'templates/rawatan.html',
        controller: 'viewMedCtrl'
      }
    }
  })

  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('loginn.addMed', {
    url: '/addMed',
    views: {
      'menuContent': {
        templateUrl: 'templates/addMed.html',
        controller: 'addMedCtrl'
      }
    }
  })

  .state('loginn.viewMed', {
    url: '/viewMed',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewMed.html',
        controller: 'viewMedCtrl'
      }
    }
  })

  .state('loginn.delMed', {
    url: '/delMed',
    views: {
      'menuContent': {
        templateUrl: 'templates/delMed.html',
        //controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.reminder', {
    url: '/reminder',
    views: {
      'menuContent': {
        templateUrl: 'templates/reminder.html',
        controller: 'alarmCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })


  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loginn/login');
});



