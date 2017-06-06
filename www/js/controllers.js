angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  /*$scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };  */
}) 

.controller('signupCtrl', function($scope, $http, $cordovaSQLite, $window, $ionicPopup,$state,$ionicHistory) {

    $scope.submit = function(name, email, pass){
      var query = "INSERT INTO user2 (name, email, pass) VALUES (?, ?, ?)";
      $cordovaSQLite.execute (db, query, [$scope.name, $scope.email, $scope.pass]).then(function(result) {
        console.log("Register Success");
        $window.location.href = '#/app/login';
      },function(error) {
          var alertPopup = $ionicPopup.alert({
            title: 'Sign up failed!',
            template: 'Please check your credentials!'
          });
      });
    };

    $scope.closeTodo = function(){
        //$scope.editInfo.hide();
        history.back(-1);
    }
})

//---------login user--------//
.controller('loginCtrl', function($scope,$http,$location,$ionicPopup,$state,$ionicHistory, $cordovaSQLite) {
    //$scope.user = {};
    
    $scope.submit = (function() {
      var $email = $email;
      var $pass = $pass;
      if ($scope.email == "user" && $scope.pass == "123")
      {
        console.log("Login Success");
        $location.path('app/lamanutama');
      }
      else if ($scope.email == "admin" && $scope.pass == "456")
      {
        console.log("Login Success");
        $location.path('loginn/lamanAdmin');
      }
      else
      {
        alert("Invalid email or password");
      }
      
    })

    $scope.closeTodo = function(){
        //$scope.editInfo.hide();
        history.back(-1);
    }
})

//------//

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller("readBPCtlr", function($scope, $cordovaSQLite, $location, $ionicPopup, $window) {

    $scope.insert = function(systolic, diastolic, pulse) {

        var query = "INSERT INTO BPpressure (dateNow, systolic, diastolic, pulse) VALUES (datetime('now','localtime'), ?, ?, ?)";
        $cordovaSQLite.execute (db, query, [$scope.systolic, $scope.diastolic, $scope.pulse]).then(function(result) {
            console.log("INSERT BP reading id -> " + result.insertId);
            //var alertPopup = $ionicPopup.alert({
            //title: 'Bacaan berjaya direkod!',
            //template: 'Kembali ke laman utama'
            //});
            alert("Bacaan berjaya direkod! Kembali ke laman utama");
            $location.path('app/lamanutama');
            //$window.location.href = '/templates/lamanutama.html';
        }, function(error) {
            console.log(error);
        });
    }

    $scope.closeTodo = function(){
        //$scope.editInfo.hide();
        history.back(-1);
    }

    var BPform = angular.copy($scope.data)

    $scope.resetForm = function() {
        var formElement = document.getElementById('BPform');
        var angularElement = angular.element(formElement)
        angularElement.scope().clearFields();
    }

    $scope.clearFields = function() {
        $scope.data = angular.copy(BPform);
        $scope.BPform.$setPristine();
    }

})

.controller("RecordCtrl", function($scope, $cordovaSQLite) {
    $scope.alldata = [];

    $scope.select = function() {
        //var tbl = angular.copy($scope.alldata)

       // $scope.clearFields = function() {
            //$scope.alldata = angular.copy(tbl);
            //$scope.tbl.$setPristine();
        //}
        //dateNow = darr;
        //darr = str.split("/");
        //newdate = str_replace('/', '-', $dateNow);
        //var dobj = parseInt(darr[2])+ "-" +parseInt(darr[1]) +"-"+parseInt(darr[0]);
        //console.log(dobj.toISOString());
        
        //$newdate = new Date("YYYY-MM-DD", $dateNow);
       // console.log($scope.alldata.datepick); 

        var input = $scope.alldata.datepick;
        var month,day;
        var output=  input.toString().substr(4,11 );
        console.log(output); 
        var darr = output.split(" ");

        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var newmonth = months.indexOf(darr[0])+1;

        if(newmonth<10)
        {
            month="0"+newmonth;
            
        }
        else
        {
            month=newmonth; 
        }

        if(parseInt(darr[1])<10)
        {
            day= "0"+parseInt(darr[1]);
           
        }
        else
        {
            day=parseInt(darr[1]);
        }

        var dobj = parseInt(darr[2])+"-"+month+ "-"+day;
        console.log(dobj); 

        var query = "SELECT time(dateNow) as time, systolic, diastolic, pulse FROM BPpressure WHERE date(dateNow)='"+dobj+"'";

        $cordovaSQLite.execute(db, query).then(function(result) {
            
            if (result.rows.length) 
            {
                for (var i=0; i<result.rows.length; i++)
                {
                    $scope.alldata.push(result.rows.item(i));

                }
                //console.log("SELECTED -> " + result.rows.item(0).dateNow);
            }
            else
            {

                 $scope.alldata.push("No data found");
            }

        }, function(error) {
            console.log("error");
        });
    }

})

.controller('shareCtrl',['$scope', function($scope){
  $scope.whatsappShare = function() {
    window.plugins.socialsharing.shareViaWhatsApp('Digital Signature Maker', null, "http://play.google.com/store/app")
  }
  $scope.OtherShare = function() {
    window.plugins.socialsharing.share('Digital Signature Maker', null, null, "http://play.google.com/store/app")
  }
}])


.controller('EditCtrl',function($scope,$cordovaSQLite){
  $scope.insert = function(age, weight, heights, diabet, kidney, heart) {
       
    var bmi = Math.round(parseFloat($scope.weight)/(parseFloat($scope.heights)*parseFloat($scope.heights))).toFixed(2);
    var diabet, kidney, heart;
    diabet= $scope.diabet.toUpperCase();
    kidney= $scope.kidney.toUpperCase();
    heart= $scope.heart.toUpperCase();

    if(((diabet != 'Y')&& (diabet != 'N')) || ((kidney != 'Y') && (kidney != 'N')) || ((heart != 'Y') && (heart != 'N'))) {
      alert("Input yang sah adalah Y/y dan N/n sahaja");
    }else {
      var query = "INSERT INTO detailss (age, weight, heights, bmi, diabet, kidney, heart) VALUES (?, ?, ?, ?, ?, ?, ?)";
      $cordovaSQLite.execute (db, query, [$scope.age, $scope.weight, $scope.heights, bmi, diabet , kidney, heart]).then(function(result) {
        alert("Maklumat berjaya direkod!");
        console.log("INSERT BP reading id -> " + result.insertId);
      }, function(error) {
          console.log(error);
        });
      
    }
  }
})

.controller("detailCtrl", function($scope, $cordovaSQLite) {
    $scope.alldata = [];
    $scope.select = function() {
       
      var query = "SELECT age, weight, heights, bmi , diabet, kidney, heart FROM detailss ORDER BY detailId DESC LIMIT 1";

        $cordovaSQLite.execute(db, query).then(function(result) {    
        if (result.rows.length) 
          {
            for (var i=0; i<result.rows.length; i++)
            {
              $scope.alldata.push(result.rows.item(i));
            }
                //console.log("SELECTED -> " + result.rows.item(0).dateNow);
          }
          else
          {
            $scope.alldata.push("No data found");
          }
        }, function(error) {
            console.log("error");
        });
         // var x = last_insert_rowid();
         // return x;
    }
})

.controller("alarmCtrl", function($scope, $cordovaSQLite) {
    $scope.alldata = [];

    $scope.insert = function() {
        var input = $scope.alldata.datepick;
        var month,day;
        var output=  input.toString().substr(4,11 );
        console.log(output); 
        var darr = output.split(" ");

        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var newmonth = months.indexOf(darr[0])+1;

        if(newmonth<10)
        {
            month="0"+newmonth;
        }
        else
        {
            month=newmonth; 
        }
        if(parseInt(darr[1])<10)
        {
            day= "0"+parseInt(darr[1]);
        }
        else
        {
            day=parseInt(darr[1]);
        }

        var dobj = parseInt(darr[2])+"-"+month+ "-"+day;
        console.log(dobj); 

        var query = "INSERT into remind (dateNow, title) VALUES (?,?)";
        $cordovaSQLite.execute (db, query, [dobj, $scope.title]).then(function(result) {
          alert("Peringatan berjaya direkod!");
          console.log("INSERT reminder id -> " + result.insertId);

        }, function(error) {
            console.log(error);
        });
    }
})

.controller("detailCtrl", function($scope, $cordovaSQLite) {
    $scope.alldata = [];
    $scope.select = function() {
       
      var query = "SELECT age, weight, heights, bmi , diabet, kidney, heart FROM detailss ORDER BY detailId DESC LIMIT 1";

        $cordovaSQLite.execute(db, query).then(function(result) {    
        if (result.rows.length) 
          {
            for (var i=0; i<result.rows.length; i++)
            {
              $scope.alldata.push(result.rows.item(i));
            }
                //console.log("SELECTED -> " + result.rows.item(0).dateNow);
          }
          else
          {
            $scope.alldata.push("No data found");
          }
        }, function(error) {
            console.log("error");
        });
         // var x = last_insert_rowid();
         // return x;
    }
})

.controller('addMedCtrl',function($scope,$cordovaSQLite){
    $scope.ages = ["3-5 tahun", "6-9 tahun", "10-12 tahun", "13-15 tahun", "16-19 tahun", "20-40 tahun", "40 tahun keatas"];
    $scope.bps = ["120-130/80-85", "130-140/85-90", "140-150/90-95"];

    $scope.insert = function(selectedAge, selectedBP, rawat) {
       
    var query = "INSERT INTO treat (selectAge, selectBP, rawat) VALUES (?, ?, ?)";
      $cordovaSQLite.execute (db, query, [$scope.selectedAge, $scope.selectedBP, $scope.rawat]).then(function(result) {
        alert("Cadangan rawatan berjaya direkod!");
        console.log("INSERT rawatan id -> " + result.insertId);
      }, function(error) {
          console.log(error);
        });
    }

    $scope.closeTodo = function(){
        //$scope.editInfo.hide();
        history.back(-1);
    }
})

.controller('viewMedCtrl',function($scope,$cordovaSQLite, $location){
    $scope.alldata = [];
    $scope.select = function() {
    //$location.path('loginn/viewMed');
      var query = "SELECT selectAge, selectBP, rawat FROM treat ORDER BY treatId DESC";

      $cordovaSQLite.execute(db, query).then(function(result) {    
      if (result.rows.length) 
      {
        for (var i=0; i<result.rows.length; i++)
        {
          $scope.alldata.push(result.rows.item(i));
        }
                  //console.log("SELECTED -> " + result.rows.item(0).dateNow);
      }
      else
      {
        $scope.alldata.push("No data found");
      }
      }, function(error) {
          console.log("error");
        });
    }

    $scope.closeTodo = function(){
        //$scope.editInfo.hide();
        history.back(-1);
    }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

