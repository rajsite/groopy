var module = angular.module('starter.controllers', ['angular-spinkit', 'ionic.contrib.ui.cards']);

module.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
});

module.controller('PlaylistsCtrl', function ($scope, $location) {
    $scope.cities = cities;
    $scope.loading = true;
    
    $scope.sortLocations = function(locations, lat, lng) {
        var dist = function(l) {
            var dist = (parseFloat(l.lat) - lat) * (parseFloat(l.lat) - lat) +
                (parseFloat(l.lon) + lng) * (parseFloat(l.lon) + lng);
            return dist;
        }

        locations.sort(function (l1, l2) {
            return dist(l1) - dist(l2);
        });
    }

    $scope.locateUser = function () {
        // Cordova call
        $scope.loading = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.sortLocations($scope.cities, position.coords.latitude, position.coords.longitude);
            $scope.loading = false;
            $scope.$digest();
            
            var path = 'app/playlists/:' + $scope.cities[0].rank;
            console.log(path);
            $location.path(path);
        });
    };
    
});

module.controller('PlaylistCtrl', function ($scope, $stateParams) {
    $scope.playlistId = $stateParams.playlistId;
    
    $scope.cityName = function(rank) {
        var i;
        for (i = 0; i < cities.length; i++) {
            if (cities[i].rank == rank)
            {
                return cities[i].name;
            }
        }
    };
    console.log($stateParams);
    
    $scope.cardSwiped = function(index) {
        
    };
    
    $scope.cardDestroyed = function() {};
    
    $scope.cards = artistData;
//
//$scope.cardDestroyed = function(index) {
//  $scope.cards.splice(index, 1);
//};
//
//$scope.cardSwiped = function(index) {
//  var newCard = // new card data
//  $scope.cards.push(newCard);
//};
});

var artistData = [
	{
    "status": "ok",
    "result": [
      {
        "radioKey": "sr11580789",
        "baseIcon": "album/9/8/6/00000000000f3689/square-200.jpg",
        "canDownloadAlbumOnly": false,
        "iframeUrl": "https://rd.io/i/Rl6j--gr4vQx/",
        "radio": {
          "type": "sr",
          "key": "sr11580789"
        },
        "artistUrl": "/artist/Wilco/",
        "duration": 436,
        "album": "The Whole Love (Deluxe Edition)",
        "isClean": false,
        "albumUrl": "/artist/Wilco/album/The_Whole_Love_(Deluxe_Edition)/",
        "shortUrl": "http://rd.io/x/Rl6j--gr4vQx/",
        "albumArtist": "Wilco",
        "canStream": true,
        "embedUrl": "https://rd.io/e/Rl6j--gr4vQx/",
        "type": "t",
        "gridIcon": "http://rdiodynimages1-a.akamaihd.net/?l=a997001-0%3Aboxblur%2810%25%2C10%25%29%3Ba997001-0%3Aprimary%280.65%29%3B%240%3Aoverlay%28%241%29%3Ba997001-0%3Apad%2850%25%29%3B%242%3Aoverlay%28%243%29",
        "price": null,
        "trackNum": 1,
        "albumArtistKey": "r85827",
        "key": "t11580789",
        "icon": "http://rdio1img-a.akamaihd.net/album/9/8/6/00000000000f3689/square-200.jpg",
        "canSample": true,
        "name": "Art Of Almost",
        "isExplicit": false,
        "artist": "Wilco",
        "url": "/artist/Wilco/album/The_Whole_Love_(Deluxe_Edition)/track/Art_Of_Almost/",
        "icon400": "http://rdio3img-a.akamaihd.net/album/9/8/6/00000000000f3689/square-400.jpg",
        "artistKey": "r85827",
        "canDownload": false,
        "length": 1,
        "canTether": true,
        "albumKey": "a997001"
      }
    ]
  }
]


var cities = [
    {
        "name": "New York",
        "wiki_url": "/wiki/New_York_City",
        "population_change": "+1.98%",
        "lon": "73.9385",
        "rank": "1",
        "land_area": "302.64",
        "state": "New York",
        "lat": "40.6643",
        "population": "8,336,697"
  },
    {
        "name": "Los Angeles",
        "wiki_url": "/wiki/Los_Angeles",
        "population_change": "+1.72%",
        "lon": "118.410",
        "rank": "2",
        "land_area": "468.67",
        "state": "California",
        "lat": "34.0194",
        "population": "3,857,799"
  },
    {
        "name": "Chicago",
        "wiki_url": "/wiki/Chicago",
        "population_change": "+0.71%",
        "lon": "87.6818",
        "rank": "3",
        "land_area": "227.63",
        "state": "Illinois",
        "lat": "41.8376",
        "population": "2,714,856"
  },
    {
        "name": "Houston",
        "wiki_url": "/wiki/Houston",
        "population_change": "+2.88%",
        "lon": "95.3863",
        "rank": "4",
        "land_area": "599.58",
        "state": "Texas",
        "lat": "29.7805",
        "population": "2,160,821"
  },
    {
        "name": "Philadelphia",
        "wiki_url": "/wiki/Philadelphia",
        "population_change": "+1.42%",
        "lon": "75.1333",
        "rank": "5",
        "land_area": "134.10",
        "state": "Pennsylvania",
        "lat": "40.0094",
        "population": "1,547,607"
  },
    {
        "name": "Phoenix",
        "wiki_url": "/wiki/Phoenix,_Arizona",
        "population_change": "+2.98%",
        "lon": "112.088",
        "rank": "6",
        "land_area": "516.70",
        "state": "Arizona",
        "lat": "33.5722",
        "population": "1,488,750"
  },
    {
        "name": "San Antonio",
        "wiki_url": "/wiki/San_Antonio",
        "population_change": "+4.18%",
        "lon": "98.5251",
        "rank": "7",
        "land_area": "460.93",
        "state": "Texas",
        "lat": "29.4724",
        "population": "1,382,951"
  },
    {
        "name": "San Diego",
        "wiki_url": "/wiki/San_Diego",
        "population_change": "+2.37%",
        "lon": "117.135",
        "rank": "8",
        "land_area": "325.18",
        "state": "California",
        "lat": "32.8153",
        "population": "1,338,348"
  },
    {
        "name": "Dallas",
        "wiki_url": "/wiki/Dallas",
        "population_change": "+3.62%",
        "lon": "96.7967",
        "rank": "9",
        "land_area": "340.51",
        "state": "Texas",
        "lat": "32.7757",
        "population": "1,241,162"
  },
    {
        "name": "San Jose",
        "wiki_url": "/wiki/San_Jose,_California",
        "population_change": "+3.89%",
        "lon": "121.819",
        "rank": "10",
        "land_area": "176.52",
        "state": "California",
        "lat": "37.2969",
        "population": "982,765"
  },
    {
        "name": "Austin",
        "wiki_url": "/wiki/Austin,_Texas",
        "population_change": "+6.60%",
        "lon": "97.7560",
        "rank": "11",
        "land_area": "297.89",
        "state": "Texas",
        "lat": "30.3072",
        "population": "842,592"
  },
    {
        "name": "Jacksonville",
        "wiki_url": "/wiki/Jacksonville,_Florida",
        "population_change": "+1.79%",
        "lon": "81.6613",
        "rank": "12",
        "land_area": "747.00",
        "state": "Florida",
        "lat": "30.3370",
        "population": "836,507"
  },
    {
        "name": "Indianapolis",
        "wiki_url": "/wiki/Indianapolis",
        "population_change": "+1.76%",
        "lon": "86.1459",
        "rank": "13",
        "land_area": "361.43",
        "state": "Indiana",
        "lat": "39.7767",
        "population": "834,852"
  },
    {
        "name": "San Francisco",
        "wiki_url": "/wiki/San_Francisco",
        "population_change": "+2.56%",
        "lon": "122.419",
        "rank": "14",
        "land_area": "46.873",
        "state": "California",
        "lat": "37.7751",
        "population": "825,863"
  },
    {
        "name": "Columbus",
        "wiki_url": "/wiki/Columbus,_Ohio",
        "population_change": "+2.89%",
        "lon": "82.9850",
        "rank": "15",
        "land_area": "217.16",
        "state": "Ohio",
        "lat": "39.9848",
        "population": "809,798"
  },
    {
        "name": "Fort Worth",
        "wiki_url": "/wiki/Fort_Worth,_Texas",
        "population_change": "+4.96%",
        "lon": "97.3463",
        "rank": "16",
        "land_area": "339.81",
        "state": "Texas",
        "lat": "32.7795",
        "population": "777,992"
  },
    {
        "name": "Charlotte",
        "wiki_url": "/wiki/Charlotte,_North_Carolina",
        "population_change": "+5.99%",
        "lon": "80.8307",
        "rank": "17",
        "land_area": "297.67",
        "state": "North Carolina",
        "lat": "35.2087",
        "population": "775,202"
  },
    {
        "name": "Detroit",
        "wiki_url": "/wiki/Detroit",
        "population_change": "-1.72%",
        "lon": "83.1022",
        "rank": "18",
        "land_area": "138.75",
        "state": "Michigan",
        "lat": "42.3830",
        "population": "701,475"
  },
    {
        "name": "El Paso",
        "wiki_url": "/wiki/El_Paso,_Texas",
        "population_change": "+3.61%",
        "lon": "106.427",
        "rank": "19",
        "land_area": "255.23",
        "state": "Texas",
        "lat": "31.8484",
        "population": "672,538"
  },
    {
        "name": "Memphis",
        "wiki_url": "/wiki/Memphis,_Tennessee",
        "population_change": "+1.28%",
        "lon": "89.9785",
        "rank": "20",
        "land_area": "315.05",
        "state": "Tennessee",
        "lat": "35.1035",
        "population": "655,155"
  },
    {
        "name": "Boston",
        "wiki_url": "/wiki/Boston",
        "population_change": "+3.06%",
        "lon": "71.0202",
        "rank": "21",
        "land_area": "48.277",
        "state": "Massachusetts",
        "lat": "42.3320",
        "population": "636,479"
  },
    {
        "name": "Seattle",
        "wiki_url": "/wiki/Seattle",
        "population_change": "+4.25%",
        "lon": "122.350",
        "rank": "22",
        "land_area": "83.943",
        "state": "Washington",
        "lat": "47.6205",
        "population": "634,535"
  },
    {
        "name": "Denver",
        "wiki_url": "/wiki/Denver",
        "population_change": "+5.68%",
        "lon": "104.880",
        "rank": "23",
        "land_area": "153.00",
        "state": "Colorado",
        "lat": "39.7618",
        "population": "634,265"
  },
    {
        "name": "Washington",
        "wiki_url": "/wiki/Washington,_D.C.",
        "population_change": "+5.09%",
        "lon": "77.0171",
        "rank": "24",
        "land_area": "61.048",
        "state": "District of Columbia",
        "lat": "38.9041",
        "population": "632,323"
  },
    {
        "name": "Nashville",
        "wiki_url": "/wiki/Nashville,_Tennessee",
        "population_change": "+3.87%",
        "lon": "86.7850",
        "rank": "25",
        "land_area": "475.12",
        "state": "Tennessee",
        "lat": "36.1718",
        "population": "624,496"
  },
    {
        "name": "Baltimore",
        "wiki_url": "/wiki/Baltimore",
        "population_change": "+0.06%",
        "lon": "76.6105",
        "rank": "26",
        "land_area": "80.944",
        "state": "Maryland",
        "lat": "39.3002",
        "population": "621,342"
  },
    {
        "name": "Louisville",
        "wiki_url": "/wiki/Louisville,_Kentucky",
        "population_change": "+1.30%",
        "lon": "85.6667",
        "rank": "27",
        "land_area": "325.24",
        "state": "Kentucky",
        "lat": "38.1781",
        "population": "605,110"
  },
    {
        "name": "Portland",
        "wiki_url": "/wiki/Portland,_Oregon",
        "population_change": "+3.31%",
        "lon": "122.650",
        "rank": "28",
        "land_area": "133.42",
        "state": "Oregon",
        "lat": "45.5370",
        "population": "603,106"
  },
    {
        "name": "Oklahoma City",
        "wiki_url": "/wiki/Oklahoma_City",
        "population_change": "+3.31%",
        "lon": "97.5137",
        "rank": "29",
        "land_area": "606.41",
        "state": "Oklahoma",
        "lat": "35.4671",
        "population": "599,199"
  },
    {
        "name": "Milwaukee",
        "wiki_url": "/wiki/Milwaukee",
        "population_change": "+0.69%",
        "lon": "87.9667",
        "rank": "30",
        "land_area": "96.122",
        "state": "Wisconsin",
        "lat": "43.0633",
        "population": "598,916"
  },
    {
        "name": "Las Vegas",
        "wiki_url": "/wiki/Las_Vegas",
        "population_change": "+2.17%",
        "lon": "115.264",
        "rank": "31",
        "land_area": "135.81",
        "state": "Nevada",
        "lat": "36.2277",
        "population": "596,424"
  },
    {
        "name": "Albuquerque",
        "wiki_url": "/wiki/Albuquerque,_New_Mexico",
        "population_change": "+1.75%",
        "lon": "106.647",
        "rank": "32",
        "land_area": "187.73",
        "state": "New Mexico",
        "lat": "35.1056",
        "population": "555,417"
  },
    {
        "name": "Tucson",
        "wiki_url": "/wiki/Tucson,_Arizona",
        "population_change": "+0.80%",
        "lon": "110.871",
        "rank": "33",
        "land_area": "226.70",
        "state": "Arizona",
        "lat": "32.1543",
        "population": "524,295"
  },
    {
        "name": "Fresno",
        "wiki_url": "/wiki/Fresno,_California",
        "population_change": "+2.27%",
        "lon": "119.794",
        "rank": "34",
        "land_area": "111.95",
        "state": "California",
        "lat": "36.7827",
        "population": "505,882"
  },
    {
        "name": "Sacramento",
        "wiki_url": "/wiki/Sacramento,_California",
        "population_change": "+1.94%",
        "lon": "121.468",
        "rank": "35",
        "land_area": "97.915",
        "state": "California",
        "lat": "38.5666",
        "population": "475,516"
  },
    {
        "name": "Long Beach",
        "wiki_url": "/wiki/Long_Beach,_California",
        "population_change": "+1.22%",
        "lon": "118.155",
        "rank": "36",
        "land_area": "50.293",
        "state": "California",
        "lat": "33.8091",
        "population": "467,892"
  },
    {
        "name": "Kansas City",
        "wiki_url": "/wiki/Kansas_City,_Missouri",
        "population_change": "+0.98%",
        "lon": "94.5511",
        "rank": "37",
        "land_area": "314.95",
        "state": "Missouri",
        "lat": "39.1252",
        "population": "464,310"
  },
    {
        "name": "Mesa",
        "wiki_url": "/wiki/Mesa,_Arizona",
        "population_change": "+2.97%",
        "lon": "111.717",
        "rank": "38",
        "land_area": "136.45",
        "state": "Arizona",
        "lat": "33.4019",
        "population": "452,084"
  },
    {
        "name": "Virginia Beach",
        "wiki_url": "/wiki/Virginia_Beach",
        "population_change": "+2.06%",
        "lon": "76.0240",
        "rank": "39",
        "land_area": "249.01",
        "state": "Virginia",
        "lat": "36.7793",
        "population": "447,021"
  },
    {
        "name": "Atlanta",
        "wiki_url": "/wiki/Atlanta",
        "population_change": "+5.66%",
        "lon": "84.4227",
        "rank": "40",
        "land_area": "133.15",
        "state": "Georgia",
        "lat": "33.7629",
        "population": "443,775"
  },
    {
        "name": "Colorado Springs",
        "wiki_url": "/wiki/Colorado_Springs,_Colorado",
        "population_change": "+3.70%",
        "lon": "104.760",
        "rank": "41",
        "land_area": "194.54",
        "state": "Colorado",
        "lat": "38.8673",
        "population": "431,834"
  },
    {
        "name": "Raleigh",
        "wiki_url": "/wiki/Raleigh,_North_Carolina",
        "population_change": "+4.78%",
        "lon": "78.6414",
        "rank": "42",
        "land_area": "142.90",
        "state": "North Carolina",
        "lat": "35.8302",
        "population": "423,179"
  },
    {
        "name": "Omaha",
        "wiki_url": "/wiki/Omaha,_Nebraska",
        "population_change": "+3.08%",
        "lon": "96.0419",
        "rank": "43",
        "land_area": "127.08",
        "state": "Nebraska",
        "lat": "41.2647",
        "population": "421,570"
  },
    {
        "name": "Miami",
        "wiki_url": "/wiki/Miami",
        "population_change": "+3.61%",
        "lon": "80.2086",
        "rank": "44",
        "land_area": "35.871",
        "state": "Florida",
        "lat": "25.7752",
        "population": "413,892"
  },
    {
        "name": "Oakland",
        "wiki_url": "/wiki/Oakland,_California",
        "population_change": "+2.56%",
        "lon": "122.225",
        "rank": "45",
        "land_area": "55.786",
        "state": "California",
        "lat": "37.7699",
        "population": "400,740"
  },
    {
        "name": "Tulsa",
        "wiki_url": "/wiki/Tulsa,_Oklahoma",
        "population_change": "+0.53%",
        "lon": "95.9023",
        "rank": "46",
        "land_area": "196.75",
        "state": "Oklahoma",
        "lat": "36.1279",
        "population": "393,987"
  },
    {
        "name": "Minneapolis",
        "wiki_url": "/wiki/Minneapolis",
        "population_change": "+2.69%",
        "lon": "93.2683",
        "rank": "47",
        "land_area": "53.973",
        "state": "Minnesota",
        "lat": "44.9633",
        "population": "392,880"
  },
    {
        "name": "Cleveland",
        "wiki_url": "/wiki/Cleveland",
        "population_change": "-1.48%",
        "lon": "81.6795",
        "rank": "48",
        "land_area": "77.697",
        "state": "Ohio",
        "lat": "41.4781",
        "population": "390,928"
  },
    {
        "name": "Wichita",
        "wiki_url": "/wiki/Wichita,_Kansas",
        "population_change": "+0.84%",
        "lon": "97.3427",
        "rank": "49",
        "land_area": "159.29",
        "state": "Kansas",
        "lat": "37.6907",
        "population": "385,577"
  },
    {
        "name": "Arlington",
        "wiki_url": "/wiki/Arlington,_Texas",
        "population_change": "+2.78%",
        "lon": "97.1247",
        "rank": "50",
        "land_area": "95.882",
        "state": "Texas",
        "lat": "32.7007",
        "population": "375,600"
  },
    {
        "name": "New Orleans",
        "wiki_url": "/wiki/New_Orleans",
        "population_change": "+7.39%",
        "lon": "89.9390",
        "rank": "51",
        "land_area": "169.42",
        "state": "Louisiana",
        "lat": "30.0686",
        "population": "369,250"
  },
    {
        "name": "Bakersfield",
        "wiki_url": "/wiki/Bakersfield,_California",
        "population_change": "+3.20%",
        "lon": "119.018",
        "rank": "52",
        "land_area": "142.16",
        "state": "California",
        "lat": "35.3212",
        "population": "358,597"
  },
    {
        "name": "Tampa",
        "wiki_url": "/wiki/Tampa,_Florida",
        "population_change": "+3.56%",
        "lon": "82.4797",
        "rank": "53",
        "land_area": "113.40",
        "state": "Florida",
        "lat": "27.9701",
        "population": "347,645"
  },
    {
        "name": "Honolulu",
        "wiki_url": "/wiki/Honolulu",
        "population_change": "+2.48%",
        "lon": "157.845",
        "rank": "54",
        "land_area": "60.521",
        "state": "Hawai'i",
        "lat": "21.3259",
        "population": "345,610"
  },
    {
        "name": "Anaheim",
        "wiki_url": "/wiki/Anaheim,_California",
        "population_change": "+2.08%",
        "lon": "117.760",
        "rank": "55",
        "land_area": "49.835",
        "state": "California",
        "lat": "33.8555",
        "population": "343,248"
  },
    {
        "name": "Aurora",
        "wiki_url": "/wiki/Aurora,_Colorado",
        "population_change": "+4.29%",
        "lon": "104.823",
        "rank": "56",
        "land_area": "154.10",
        "state": "Colorado",
        "lat": "39.7082",
        "population": "339,030"
  },
    {
        "name": "Santa Ana",
        "wiki_url": "/wiki/Santa_Ana,_California",
        "population_change": "+1.97%",
        "lon": "117.882",
        "rank": "57",
        "land_area": "27.270",
        "state": "California",
        "lat": "33.7365",
        "population": "330,920"
  },
    {
        "name": "St. Louis",
        "wiki_url": "/wiki/St._Louis",
        "population_change": "-0.35%",
        "lon": "90.2446",
        "rank": "58",
        "land_area": "61.909",
        "state": "Missouri",
        "lat": "38.6357",
        "population": "318,172"
  },
    {
        "name": "Riverside",
        "wiki_url": "/wiki/Riverside,_California",
        "population_change": "+3.23%",
        "lon": "117.393",
        "rank": "59",
        "land_area": "81.140",
        "state": "California",
        "lat": "33.9381",
        "population": "313,673"
  },
    {
        "name": "Corpus Christi",
        "wiki_url": "/wiki/Corpus_Christi,_Texas",
        "population_change": "+2.29%",
        "lon": "97.1734",
        "rank": "60",
        "land_area": "160.61",
        "state": "Texas",
        "lat": "27.7543",
        "population": "312,195"
  },
    {
        "name": "Pittsburgh",
        "wiki_url": "/wiki/Pittsburgh",
        "population_change": "+0.17%",
        "lon": "79.9766",
        "rank": "61",
        "land_area": "55.367",
        "state": "Pennsylvania",
        "lat": "40.4398",
        "population": "306,211"
  },
    {
        "name": "Lexington",
        "wiki_url": "/wiki/Lexington,_Kentucky",
        "population_change": "+3.27%",
        "lon": "84.4584",
        "rank": "62",
        "land_area": "283.64",
        "state": "Kentucky",
        "lat": "38.0402",
        "population": "305,489"
  },
    {
        "name": "Anchorage",
        "wiki_url": "/wiki/Anchorage,_Alaska",
        "population_change": "+2.32%",
        "lon": "149.895",
        "rank": "63",
        "land_area": "1,704.",
        "state": "Alaska",
        "lat": "61.2176",
        "population": "298,610"
  },
    {
        "name": "Stockton",
        "wiki_url": "/wiki/Stockton,_California",
        "population_change": "+2.15%",
        "lon": "121.313",
        "rank": "64",
        "land_area": "61.670",
        "state": "California",
        "lat": "37.9763",
        "population": "297,984"
  },
    {
        "name": "Cincinnati",
        "wiki_url": "/wiki/Cincinnati",
        "population_change": "-0.13%",
        "lon": "84.5064",
        "rank": "65",
        "land_area": "77.942",
        "state": "Ohio",
        "lat": "39.1399",
        "population": "296,550"
  },
    {
        "name": "Saint Paul",
        "wiki_url": "/wiki/St._Paul,_Minnesota",
        "population_change": "+2.00%",
        "lon": "93.1039",
        "rank": "66",
        "land_area": "51.979",
        "state": "Minnesota",
        "lat": "44.9489",
        "population": "290,770"
  },
    {
        "name": "Toledo",
        "wiki_url": "/wiki/Toledo,_Ohio",
        "population_change": "-1.11%",
        "lon": "83.5819",
        "rank": "67",
        "land_area": "80.692",
        "state": "Ohio",
        "lat": "41.6641",
        "population": "284,012"
  },
    {
        "name": "Newark",
        "wiki_url": "/wiki/Newark,_New_Jersey",
        "population_change": "+0.21%",
        "lon": "74.1726",
        "rank": "68",
        "land_area": "24.187",
        "state": "New Jersey",
        "lat": "40.7242",
        "population": "277,727"
  },
    {
        "name": "Greensboro",
        "wiki_url": "/wiki/Greensboro,_North_Carolina",
        "population_change": "+2.75%",
        "lon": "79.8271",
        "rank": "69",
        "land_area": "126.51",
        "state": "North Carolina",
        "lat": "36.0965",
        "population": "277,080"
  },
    {
        "name": "Plano",
        "wiki_url": "/wiki/Plano,_Texas",
        "population_change": "+4.71%",
        "lon": "96.7479",
        "rank": "70",
        "land_area": "71.581",
        "state": "Texas",
        "lat": "33.0508",
        "population": "272,068"
  },
    {
        "name": "Henderson",
        "wiki_url": "/wiki/Henderson,_Nevada",
        "population_change": "+3.08%",
        "lon": "115.037",
        "rank": "71",
        "land_area": "107.73",
        "state": "Nevada",
        "lat": "36.0122",
        "population": "265,679"
  },
    {
        "name": "Lincoln",
        "wiki_url": "/wiki/Lincoln,_Nebraska",
        "population_change": "+2.72%",
        "lon": "96.6804",
        "rank": "72",
        "land_area": "89.114",
        "state": "Nebraska",
        "lat": "40.8090",
        "population": "265,404"
  },
    {
        "name": "Buffalo",
        "wiki_url": "/wiki/Buffalo,_New_York",
        "population_change": "-0.74%",
        "lon": "78.8597",
        "rank": "73",
        "land_area": "40.384",
        "state": "New York",
        "lat": "42.8925",
        "population": "259,384"
  },
    {
        "name": "Fort Wayne",
        "wiki_url": "/wiki/Fort_Wayne,_Indiana",
        "population_change": "+0.34%",
        "lon": "85.1439",
        "rank": "74",
        "land_area": "110.61",
        "state": "Indiana",
        "lat": "41.0882",
        "population": "254,555"
  },
    {
        "name": "Jersey City",
        "wiki_url": "/wiki/Jersey_City,_New_Jersey",
        "population_change": "+2.76%",
        "lon": "74.0648",
        "rank": "75",
        "land_area": "14.794",
        "state": "New Jersey",
        "lat": "40.7114",
        "population": "254,441"
  },
    {
        "name": "Chula Vista",
        "wiki_url": "/wiki/Chula_Vista,_California",
        "population_change": "+3.49%",
        "lon": "117.015",
        "rank": "76",
        "land_area": "49.631",
        "state": "California",
        "lat": "32.6277",
        "population": "252,422"
  },
    {
        "name": "Orlando",
        "wiki_url": "/wiki/Orlando,_Florida",
        "population_change": "+4.73%",
        "lon": "81.2988",
        "rank": "77",
        "land_area": "102.39",
        "state": "Florida",
        "lat": "28.4159",
        "population": "249,562"
  },
    {
        "name": "St. Petersburg",
        "wiki_url": "/wiki/St._Petersburg,_Florida",
        "population_change": "+0.72%",
        "lon": "82.6441",
        "rank": "78",
        "land_area": "61.742",
        "state": "Florida",
        "lat": "27.7620",
        "population": "246,541"
  },
    {
        "name": "Norfolk",
        "wiki_url": "/wiki/Norfolk,_Virginia",
        "population_change": "+1.23%",
        "lon": "76.2446",
        "rank": "79",
        "land_area": "54.120",
        "state": "Virginia",
        "lat": "36.9230",
        "population": "245,782"
  },
    {
        "name": "Chandler",
        "wiki_url": "/wiki/Chandler,_Arizona",
        "population_change": "+4.03%",
        "lon": "111.854",
        "rank": "80",
        "land_area": "64.413",
        "state": "Arizona",
        "lat": "33.2829",
        "population": "245,628"
  },
    {
        "name": "Laredo",
        "wiki_url": "/wiki/Laredo,_Texas",
        "population_change": "+3.66%",
        "lon": "99.4869",
        "rank": "81",
        "land_area": "88.908",
        "state": "Texas",
        "lat": "27.5477",
        "population": "244,731"
  },
    {
        "name": "Madison",
        "wiki_url": "/wiki/Madison,_Wisconsin",
        "population_change": "+3.05%",
        "lon": "89.4301",
        "rank": "82",
        "land_area": "76.789",
        "state": "Wisconsin",
        "lat": "43.0878",
        "population": "240,323"
  },
    {
        "name": "Durham",
        "wiki_url": "/wiki/Durham,_North_Carolina",
        "population_change": "+4.83%",
        "lon": "78.9056",
        "rank": "83",
        "land_area": "107.37",
        "state": "North Carolina",
        "lat": "35.9810",
        "population": "239,358"
  },
    {
        "name": "Lubbock",
        "wiki_url": "/wiki/Lubbock,_Texas",
        "population_change": "+2.83%",
        "lon": "101.886",
        "rank": "84",
        "land_area": "122.41",
        "state": "Texas",
        "lat": "33.5665",
        "population": "236,065"
  },
    {
        "name": "Winston\u2013Salem",
        "wiki_url": "/wiki/Winston%E2%80%93Salem,_North_Carolina",
        "population_change": "+2.06%",
        "lon": "80.2606",
        "rank": "85",
        "land_area": "132.44",
        "state": "North Carolina",
        "lat": "36.1033",
        "population": "234,349"
  },
    {
        "name": "Garland",
        "wiki_url": "/wiki/Garland,_Texas",
        "population_change": "+2.95%",
        "lon": "96.6304",
        "rank": "86",
        "land_area": "57.085",
        "state": "Texas",
        "lat": "32.9098",
        "population": "233,564"
  },
    {
        "name": "Glendale",
        "wiki_url": "/wiki/Glendale,_Arizona",
        "population_change": "+2.39%",
        "lon": "112.189",
        "rank": "87",
        "land_area": "59.976",
        "state": "Arizona",
        "lat": "33.5331",
        "population": "232,143"
  },
    {
        "name": "Hialeah",
        "wiki_url": "/wiki/Hialeah,_Florida",
        "population_change": "+3.24%",
        "lon": "80.3029",
        "rank": "88",
        "land_area": "21.450",
        "state": "Florida",
        "lat": "25.8699",
        "population": "231,941"
  },
    {
        "name": "Reno",
        "wiki_url": "/wiki/Reno,_Nevada",
        "population_change": "+2.58%",
        "lon": "119.776",
        "rank": "89",
        "land_area": "103.00",
        "state": "Nevada",
        "lat": "39.4745",
        "population": "231,027"
  },
    {
        "name": "Baton Rouge",
        "wiki_url": "/wiki/Baton_Rouge,_Louisiana",
        "population_change": "+0.25%",
        "lon": "91.1259",
        "rank": "90",
        "land_area": "76.947",
        "state": "Louisiana",
        "lat": "30.4485",
        "population": "230,058"
  },
    {
        "name": "Irvine",
        "wiki_url": "/wiki/Irvine,_California",
        "population_change": "+8.29%",
        "lon": "117.771",
        "rank": "91",
        "land_area": "66.106",
        "state": "California",
        "lat": "33.6784",
        "population": "229,985"
  },
    {
        "name": "Chesapeake",
        "wiki_url": "/wiki/Chesapeake,_Virginia",
        "population_change": "+2.79%",
        "lon": "76.3018",
        "rank": "92",
        "land_area": "340.80",
        "state": "Virginia",
        "lat": "36.6794",
        "population": "228,417"
  },
    {
        "name": "Irving",
        "wiki_url": "/wiki/Irving,_Texas",
        "population_change": "+4.22%",
        "lon": "96.9700",
        "rank": "93",
        "land_area": "67.017",
        "state": "Texas",
        "lat": "32.8577",
        "population": "225,427"
  },
    {
        "name": "Scottsdale",
        "wiki_url": "/wiki/Scottsdale,_Arizona",
        "population_change": "+2.82%",
        "lon": "111.823",
        "rank": "94",
        "land_area": "183.92",
        "state": "Arizona",
        "lat": "33.6687",
        "population": "223,514"
  },
    {
        "name": "North Las Vegas",
        "wiki_url": "/wiki/North_Las_Vegas,_Nevada",
        "population_change": "+3.01%",
        "lon": "115.089",
        "rank": "95",
        "land_area": "101.34",
        "state": "Nevada",
        "lat": "36.2830",
        "population": "223,491"
  },
    {
        "name": "Fremont",
        "wiki_url": "/wiki/Fremont,_California",
        "population_change": "+3.69%",
        "lon": "121.941",
        "rank": "96",
        "land_area": "77.459",
        "state": "California",
        "lat": "37.4944",
        "population": "221,986"
  },
    {
        "name": "Gilbert",
        "wiki_url": "/wiki/Gilbert,_Arizona",
        "population_change": "+6.09%",
        "lon": "111.742",
        "rank": "97",
        "land_area": "67.963",
        "state": "Arizona",
        "lat": "33.3102",
        "population": "221,140"
  },
    {
        "name": "San Bernardino",
        "wiki_url": "/wiki/San_Bernardino,_California",
        "population_change": "+1.61%",
        "lon": "117.295",
        "rank": "98",
        "land_area": "59.201",
        "state": "California",
        "lat": "34.1393",
        "population": "213,295"
  },
    {
        "name": "Boise",
        "wiki_url": "/wiki/Boise,_Idaho",
        "population_change": "+3.22%",
        "lon": "116.231",
        "rank": "99",
        "land_area": "79.364",
        "state": "Idaho",
        "lat": "43.5985",
        "population": "212,303"
  },
    {
        "name": "Birmingham",
        "wiki_url": "/wiki/Birmingham,_Alabama",
        "population_change": "-0.09%",
        "lon": "86.7990",
        "rank": "100",
        "land_area": "146.06",
        "state": "Alabama",
        "lat": "33.5274",
        "population": "212,038"
  },
    {
        "name": "Rochester",
        "wiki_url": "/wiki/Rochester,_New_York",
        "population_change": "-0.02%",
        "lon": "77.6169",
        "rank": "101",
        "land_area": "35.781",
        "state": "New York",
        "lat": "43.1699",
        "population": "210,532"
  },
    {
        "name": "Richmond",
        "wiki_url": "/wiki/Richmond,_Virginia",
        "population_change": "+2.98%",
        "lon": "77.4760",
        "rank": "102",
        "land_area": "59.805",
        "state": "Virginia",
        "lat": "37.5314",
        "population": "210,309"
  },
    {
        "name": "Spokane",
        "wiki_url": "/wiki/Spokane,_Washington",
        "population_change": "+0.29%",
        "lon": "117.416",
        "rank": "103",
        "land_area": "59.247",
        "state": "Washington",
        "lat": "47.6736",
        "population": "209,525"
  },
    {
        "name": "Des Moines",
        "wiki_url": "/wiki/Des_Moines,_Iowa",
        "population_change": "+1.60%",
        "lon": "93.6167",
        "rank": "104",
        "land_area": "80.869",
        "state": "Iowa",
        "lat": "41.5739",
        "population": "206,688"
  },
    {
        "name": "Montgomery",
        "wiki_url": "/wiki/Montgomery,_Alabama",
        "population_change": "-0.23%",
        "lon": "86.2686",
        "rank": "105",
        "land_area": "159.56",
        "state": "Alabama",
        "lat": "32.3463",
        "population": "205,293"
  },
    {
        "name": "Modesto",
        "wiki_url": "/wiki/Modesto,_California",
        "population_change": "+1.18%",
        "lon": "120.989",
        "rank": "106",
        "land_area": "36.867",
        "state": "California",
        "lat": "37.6609",
        "population": "203,547"
  },
    {
        "name": "Fayetteville",
        "wiki_url": "/wiki/Fayetteville,_North_Carolina",
        "population_change": "+0.77%",
        "lon": "78.9803",
        "rank": "107",
        "land_area": "145.84",
        "state": "North Carolina",
        "lat": "35.0851",
        "population": "202,103"
  },
    {
        "name": "Tacoma",
        "wiki_url": "/wiki/Tacoma,_Washington",
        "population_change": "+1.82%",
        "lon": "122.459",
        "rank": "108",
        "land_area": "49.721",
        "state": "Washington",
        "lat": "47.2522",
        "population": "202,010"
  },
    {
        "name": "Shreveport",
        "wiki_url": "/wiki/Shreveport,_Louisiana",
        "population_change": "+1.28%",
        "lon": "93.7927",
        "rank": "109",
        "land_area": "105.37",
        "state": "Louisiana",
        "lat": "32.4670",
        "population": "201,867"
  },
    {
        "name": "Fontana",
        "wiki_url": "/wiki/Fontana,_California",
        "population_change": "+2.93%",
        "lon": "117.462",
        "rank": "110",
        "land_area": "42.432",
        "state": "California",
        "lat": "34.1088",
        "population": "201,812"
  },
    {
        "name": "Oxnard",
        "wiki_url": "/wiki/Oxnard,_California",
        "population_change": "+1.85%",
        "lon": "119.204",
        "rank": "111",
        "land_area": "26.894",
        "state": "California",
        "lat": "34.2023",
        "population": "201,555"
  },
    {
        "name": "Aurora",
        "wiki_url": "/wiki/Aurora,_Illinois",
        "population_change": "+1.03%",
        "lon": "88.2901",
        "rank": "112",
        "land_area": "44.936",
        "state": "Illinois",
        "lat": "41.7635",
        "population": "199,932"
  },
    {
        "name": "Moreno Valley",
        "wiki_url": "/wiki/Moreno_Valley,_California",
        "population_change": "+3.20%",
        "lon": "117.205",
        "rank": "113",
        "land_area": "51.275",
        "state": "California",
        "lat": "33.9233",
        "population": "199,552"
  },
    {
        "name": "Akron",
        "wiki_url": "/wiki/Akron,_Ohio",
        "population_change": "-0.28%",
        "lon": "81.5214",
        "rank": "114",
        "land_area": "62.033",
        "state": "Ohio",
        "lat": "41.0805",
        "population": "198,549"
  },
    {
        "name": "Yonkers",
        "wiki_url": "/wiki/Yonkers,_New_York",
        "population_change": "+1.26%",
        "lon": "73.8674",
        "rank": "115",
        "land_area": "18.012",
        "state": "New York",
        "lat": "40.9459",
        "population": "198,449"
  },
    {
        "name": "Columbus",
        "wiki_url": "/wiki/Columbus,_Georgia",
        "population_change": "+4.49%",
        "lon": "84.8749",
        "rank": "116",
        "land_area": "216.38",
        "state": "Georgia",
        "lat": "32.5102",
        "population": "198,413"
  },
    {
        "name": "Augusta",
        "wiki_url": "/wiki/Augusta,_Georgia",
        "population_change": "+1.04%",
        "lon": "82.0734",
        "rank": "117",
        "land_area": "302.47",
        "state": "Georgia",
        "lat": "33.3655",
        "population": "197,872"
  },
    {
        "name": "Little Rock",
        "wiki_url": "/wiki/Little_Rock,_Arkansas",
        "population_change": "+1.56%",
        "lon": "92.3586",
        "rank": "118",
        "land_area": "119.20",
        "state": "Arkansas",
        "lat": "34.7254",
        "population": "196,537"
  },
    {
        "name": "Amarillo",
        "wiki_url": "/wiki/Amarillo,_Texas",
        "population_change": "+2.39%",
        "lon": "101.828",
        "rank": "119",
        "land_area": "99.476",
        "state": "Texas",
        "lat": "35.1978",
        "population": "195,250"
  },
    {
        "name": "Mobile",
        "wiki_url": "/wiki/Mobile,_Alabama",
        "population_change": "-0.15%",
        "lon": "88.1002",
        "rank": "120",
        "land_area": "139.10",
        "state": "Alabama",
        "lat": "30.6684",
        "population": "194,822"
  },
    {
        "name": "Huntington Beach",
        "wiki_url": "/wiki/Huntington_Beach,_California",
        "population_change": "+2.48%",
        "lon": "118.009",
        "rank": "121",
        "land_area": "26.748",
        "state": "California",
        "lat": "33.6906",
        "population": "194,708"
  },
    {
        "name": "Glendale",
        "wiki_url": "/wiki/Glendale,_California",
        "population_change": "+1.44%",
        "lon": "118.245",
        "rank": "122",
        "land_area": "30.453",
        "state": "California",
        "lat": "34.1814",
        "population": "194,478"
  },
    {
        "name": "Grand Rapids",
        "wiki_url": "/wiki/Grand_Rapids,_Michigan",
        "population_change": "+1.26%",
        "lon": "85.6556",
        "rank": "123",
        "land_area": "44.395",
        "state": "Michigan",
        "lat": "42.9612",
        "population": "190,411"
  },
    {
        "name": "Salt Lake City",
        "wiki_url": "/wiki/Salt_Lake_City",
        "population_change": "+1.54%",
        "lon": "111.931",
        "rank": "124",
        "land_area": "111.11",
        "state": "Utah",
        "lat": "40.7785",
        "population": "189,314"
  },
    {
        "name": "Tallahassee",
        "wiki_url": "/wiki/Tallahassee,_Florida",
        "population_change": "+3.08%",
        "lon": "84.2534",
        "rank": "125",
        "land_area": "100.24",
        "state": "Florida",
        "lat": "30.4551",
        "population": "186,971"
  },
    {
        "name": "Huntsville",
        "wiki_url": "/wiki/Huntsville,_Alabama",
        "population_change": "+2.02%",
        "lon": "86.5390",
        "rank": "126",
        "land_area": "209.05",
        "state": "Alabama",
        "lat": "34.7843",
        "population": "183,739"
  },
    {
        "name": "Worcester",
        "wiki_url": "/wiki/Worcester,_Massachusetts",
        "population_change": "+0.90%",
        "lon": "71.8078",
        "rank": "127",
        "land_area": "37.371",
        "state": "Massachusetts",
        "lat": "42.2695",
        "population": "182,669"
  },
    {
        "name": "Knoxville",
        "wiki_url": "/wiki/Knoxville,_Tennessee",
        "population_change": "+1.86%",
        "lon": "83.9465",
        "rank": "128",
        "land_area": "98.521",
        "state": "Tennessee",
        "lat": "35.9709",
        "population": "182,200"
  },
    {
        "name": "Grand Prairie",
        "wiki_url": "/wiki/Grand_Prairie,_Texas",
        "population_change": "+3.66%",
        "lon": "97.0210",
        "rank": "129",
        "land_area": "72.105",
        "state": "Texas",
        "lat": "32.6842",
        "population": "181,824"
  },
    {
        "name": "Newport News",
        "wiki_url": "/wiki/Newport_News,_Virginia",
        "population_change": "+0.00%",
        "lon": "76.5217",
        "rank": "130",
        "land_area": "68.714",
        "state": "Virginia",
        "lat": "37.0760",
        "population": "180,726"
  },
    {
        "name": "Brownsville",
        "wiki_url": "/wiki/Brownsville,_Texas",
        "population_change": "+2.90%",
        "lon": "97.4538",
        "rank": "131",
        "land_area": "132.33",
        "state": "Texas",
        "lat": "26.0183",
        "population": "180,097"
  },
    {
        "name": "Santa Clarita",
        "wiki_url": "/wiki/Santa_Clarita,_California",
        "population_change": "+1.53%",
        "lon": "118.504",
        "rank": "132",
        "land_area": "52.716",
        "state": "California",
        "lat": "34.4049",
        "population": "179,013"
  },
    {
        "name": "Overland Park",
        "wiki_url": "/wiki/Overland_Park,_Kansas",
        "population_change": "+3.20%",
        "lon": "94.6906",
        "rank": "133",
        "land_area": "74.841",
        "state": "Kansas",
        "lat": "38.8890",
        "population": "178,919"
  },
    {
        "name": "Providence",
        "wiki_url": "/wiki/Providence,_Rhode_Island",
        "population_change": "+0.22%",
        "lon": "71.4188",
        "rank": "134",
        "land_area": "18.400",
        "state": "Rhode Island",
        "lat": "41.8231",
        "population": "178,432"
  },
    {
        "name": "Jackson",
        "wiki_url": "/wiki/Jackson,_Mississippi",
        "population_change": "+1.11%",
        "lon": "90.2128",
        "rank": "135",
        "land_area": "111.04",
        "state": "Mississippi",
        "lat": "32.3158",
        "population": "175,437"
  },
    {
        "name": "Garden Grove",
        "wiki_url": "/wiki/Garden_Grove,_California",
        "population_change": "+2.05%",
        "lon": "117.960",
        "rank": "136",
        "land_area": "17.941",
        "state": "California",
        "lat": "33.7788",
        "population": "174,389"
  },
    {
        "name": "Oceanside",
        "wiki_url": "/wiki/Oceanside,_California",
        "population_change": "+2.52%",
        "lon": "117.306",
        "rank": "137",
        "land_area": "41.235",
        "state": "California",
        "lat": "33.2246",
        "population": "171,293"
  },
    {
        "name": "Chattanooga",
        "wiki_url": "/wiki/Chattanooga,_Tennessee",
        "population_change": "+2.15%",
        "lon": "85.2471",
        "rank": "138",
        "land_area": "137.15",
        "state": "Tennessee",
        "lat": "35.0665",
        "population": "171,279"
  },
    {
        "name": "Fort Lauderdale",
        "wiki_url": "/wiki/Fort_Lauderdale,_Florida",
        "population_change": "+3.16%",
        "lon": "80.1439",
        "rank": "139",
        "land_area": "34.765",
        "state": "Florida",
        "lat": "26.1413",
        "population": "170,747"
  },
    {
        "name": "Rancho Cucamonga",
        "wiki_url": "/wiki/Rancho_Cucamonga,_California",
        "population_change": "+3.31%",
        "lon": "117.564",
        "rank": "140",
        "land_area": "39.851",
        "state": "California",
        "lat": "34.1233",
        "population": "170,746"
  },
    {
        "name": "Santa Rosa",
        "wiki_url": "/wiki/Santa_Rosa,_California",
        "population_change": "+1.71%",
        "lon": "122.706",
        "rank": "141",
        "land_area": "41.294",
        "state": "California",
        "lat": "38.4468",
        "population": "170,685"
  },
    {
        "name": "Port St. Lucie",
        "wiki_url": "/wiki/Port_St._Lucie,_Florida",
        "population_change": "+2.50%",
        "lon": "80.3838",
        "rank": "142",
        "land_area": "113.95",
        "state": "Florida",
        "lat": "27.2810",
        "population": "168,716"
  },
    {
        "name": "Ontario",
        "wiki_url": "/wiki/Ontario,_California",
        "population_change": "+2.01%",
        "lon": "117.608",
        "rank": "143",
        "land_area": "49.941",
        "state": "California",
        "lat": "34.0395",
        "population": "167,211"
  },
    {
        "name": "Tempe",
        "wiki_url": "/wiki/Tempe,_Arizona",
        "population_change": "+3.17%",
        "lon": "111.931",
        "rank": "144",
        "land_area": "39.929",
        "state": "Arizona",
        "lat": "33.3884",
        "population": "166,842"
  },
    {
        "name": "Vancouver",
        "wiki_url": "/wiki/Vancouver,_Washington",
        "population_change": "+2.29%",
        "lon": "122.596",
        "rank": "145",
        "land_area": "46.456",
        "state": "Washington",
        "lat": "45.6372",
        "population": "165,489"
  },
    {
        "name": "Springfield",
        "wiki_url": "/wiki/Springfield,_Missouri",
        "population_change": "+1.69%",
        "lon": "93.2913",
        "rank": "146",
        "land_area": "81.720",
        "state": "Missouri",
        "lat": "37.1942",
        "population": "162,191"
  },
    {
        "name": "Cape Coral",
        "wiki_url": "/wiki/Cape_Coral,_Florida",
        "population_change": "+4.50%",
        "lon": "81.9973",
        "rank": "147",
        "land_area": "105.67",
        "state": "Florida",
        "lat": "26.6431",
        "population": "161,248"
  },
    {
        "name": "Pembroke Pines",
        "wiki_url": "/wiki/Pembroke_Pines,_Florida",
        "population_change": "+4.08%",
        "lon": "80.3404",
        "rank": "148",
        "land_area": "33.124",
        "state": "Florida",
        "lat": "26.0212",
        "population": "160,306"
  },
    {
        "name": "Sioux Falls",
        "wiki_url": "/wiki/Sioux_Falls,_South_Dakota",
        "population_change": "+3.91%",
        "lon": "96.7320",
        "rank": "149",
        "land_area": "72.964",
        "state": "South Dakota",
        "lat": "43.5383",
        "population": "159,908"
  },
    {
        "name": "Peoria",
        "wiki_url": "/wiki/Peoria,_Arizona",
        "population_change": "+3.72%",
        "lon": "112.311",
        "rank": "150",
        "land_area": "174.40",
        "state": "Arizona",
        "lat": "33.7877",
        "population": "159,789"
  },
    {
        "name": "Lancaster",
        "wiki_url": "/wiki/Lancaster,_California",
        "population_change": "+1.55%",
        "lon": "118.175",
        "rank": "151",
        "land_area": "94.276",
        "state": "California",
        "lat": "34.6936",
        "population": "159,055"
  },
    {
        "name": "Elk Grove",
        "wiki_url": "/wiki/Elk_Grove,_California",
        "population_change": "+3.94%",
        "lon": "121.384",
        "rank": "152",
        "land_area": "42.190",
        "state": "California",
        "lat": "38.4144",
        "population": "159,038"
  },
    {
        "name": "Corona",
        "wiki_url": "/wiki/Corona,_California",
        "population_change": "+3.95%",
        "lon": "117.563",
        "rank": "153",
        "land_area": "38.825",
        "state": "California",
        "lat": "33.8624",
        "population": "158,391"
  },
    {
        "name": "Eugene",
        "wiki_url": "/wiki/Eugene,_Oregon",
        "population_change": "+1.15%",
        "lon": "123.116",
        "rank": "154",
        "land_area": "43.723",
        "state": "Oregon",
        "lat": "44.0567",
        "population": "157,986"
  },
    {
        "name": "Salem",
        "wiki_url": "/wiki/Salem,_Oregon",
        "population_change": "+1.81%",
        "lon": "123.023",
        "rank": "155",
        "land_area": "47.896",
        "state": "Oregon",
        "lat": "44.9237",
        "population": "157,429"
  },
    {
        "name": "Palmdale",
        "wiki_url": "/wiki/Palmdale,_California",
        "population_change": "+1.90%",
        "lon": "118.109",
        "rank": "156",
        "land_area": "105.96",
        "state": "California",
        "lat": "34.5913",
        "population": "155,650"
  },
    {
        "name": "Salinas",
        "wiki_url": "/wiki/Salinas,_California",
        "population_change": "+2.69%",
        "lon": "121.633",
        "rank": "157",
        "land_area": "23.179",
        "state": "California",
        "lat": "36.6902",
        "population": "154,484"
  },
    {
        "name": "Springfield",
        "wiki_url": "/wiki/Springfield,_Massachusetts",
        "population_change": "+0.32%",
        "lon": "72.5400",
        "rank": "158",
        "land_area": "31.865",
        "state": "Massachusetts",
        "lat": "42.1155",
        "population": "153,552"
  },
    {
        "name": "Pasadena",
        "wiki_url": "/wiki/Pasadena,_Texas",
        "population_change": "+2.17%",
        "lon": "95.1505",
        "rank": "159",
        "land_area": "42.762",
        "state": "Texas",
        "lat": "29.6583",
        "population": "152,272"
  },
    {
        "name": "Rockford",
        "wiki_url": "/wiki/Rockford,_Illinois",
        "population_change": "-1.33%",
        "lon": "89.0628",
        "rank": "160",
        "land_area": "61.081",
        "state": "Illinois",
        "lat": "42.2634",
        "population": "150,843"
  },
    {
        "name": "Pomona",
        "wiki_url": "/wiki/Pomona,_California",
        "population_change": "+1.18%",
        "lon": "117.761",
        "rank": "161",
        "land_area": "22.952",
        "state": "California",
        "lat": "34.0586",
        "population": "150,812"
  },
    {
        "name": "Hayward",
        "wiki_url": "/wiki/Hayward,_California",
        "population_change": "+3.61%",
        "lon": "122.106",
        "rank": "162",
        "land_area": "45.323",
        "state": "California",
        "lat": "37.6281",
        "population": "149,392"
  },
    {
        "name": "Fort Collins",
        "wiki_url": "/wiki/Fort_Collins,_Colorado",
        "population_change": "+3.21%",
        "lon": "105.064",
        "rank": "163",
        "land_area": "54.277",
        "state": "Colorado",
        "lat": "40.5482",
        "population": "148,612"
  },
    {
        "name": "Joliet",
        "wiki_url": "/wiki/Joliet,_Illinois",
        "population_change": "+0.57%",
        "lon": "88.1584",
        "rank": "164",
        "land_area": "62.114",
        "state": "Illinois",
        "lat": "41.5181",
        "population": "148,268"
  },
    {
        "name": "Escondido",
        "wiki_url": "/wiki/Escondido,_California",
        "population_change": "+2.55%",
        "lon": "117.073",
        "rank": "165",
        "land_area": "36.813",
        "state": "California",
        "lat": "33.1336",
        "population": "147,575"
  },
    {
        "name": "Kansas City",
        "wiki_url": "/wiki/Kansas_City,_Kansas",
        "population_change": "+1.02%",
        "lon": "94.7418",
        "rank": "166",
        "land_area": "124.81",
        "state": "Kansas",
        "lat": "39.1225",
        "population": "147,268"
  },
    {
        "name": "Torrance",
        "wiki_url": "/wiki/Torrance,_California",
        "population_change": "+1.09%",
        "lon": "118.341",
        "rank": "167",
        "land_area": "20.478",
        "state": "California",
        "lat": "33.8350",
        "population": "147,027"
  },
    {
        "name": "Bridgeport",
        "wiki_url": "/wiki/Bridgeport,_Connecticut",
        "population_change": "+1.52%",
        "lon": "73.1957",
        "rank": "168",
        "land_area": "15.974",
        "state": "Connecticut",
        "lat": "41.1874",
        "population": "146,425"
  },
    {
        "name": "Alexandria",
        "wiki_url": "/wiki/Alexandria,_Virginia",
        "population_change": "+4.52%",
        "lon": "77.0820",
        "rank": "169",
        "land_area": "15.027",
        "state": "Virginia",
        "lat": "38.8183",
        "population": "146,294"
  },
    {
        "name": "Sunnyvale",
        "wiki_url": "/wiki/Sunnyvale,_California",
        "population_change": "+4.37%",
        "lon": "122.026",
        "rank": "170",
        "land_area": "21.987",
        "state": "California",
        "lat": "37.3858",
        "population": "146,197"
  },
    {
        "name": "Cary",
        "wiki_url": "/wiki/Cary,_North_Carolina",
        "population_change": "+7.73%",
        "lon": "78.8141",
        "rank": "171",
        "land_area": "54.345",
        "state": "North Carolina",
        "lat": "35.7821",
        "population": "145,693"
  },
    {
        "name": "Lakewood",
        "wiki_url": "/wiki/Lakewood,_Colorado",
        "population_change": "+1.77%",
        "lon": "105.117",
        "rank": "172",
        "land_area": "42.880",
        "state": "Colorado",
        "lat": "39.6989",
        "population": "145,516"
  },
    {
        "name": "Hollywood",
        "wiki_url": "/wiki/Hollywood,_Florida",
        "population_change": "+3.17%",
        "lon": "80.1646",
        "rank": "173",
        "land_area": "27.366",
        "state": "Florida",
        "lat": "26.0311",
        "population": "145,236"
  },
    {
        "name": "Paterson",
        "wiki_url": "/wiki/Paterson,_New_Jersey",
        "population_change": "-0.67%",
        "lon": "74.1628",
        "rank": "174",
        "land_area": "8.428",
        "state": "New Jersey",
        "lat": "40.9147",
        "population": "145,219"
  },
    {
        "name": "Syracuse",
        "wiki_url": "/wiki/Syracuse,_New_York",
        "population_change": "-0.69%",
        "lon": "76.1436",
        "rank": "175",
        "land_area": "25.043",
        "state": "New York",
        "lat": "43.0410",
        "population": "144,170"
  },
    {
        "name": "Naperville",
        "wiki_url": "/wiki/Naperville,_Illinois",
        "population_change": "+1.29%",
        "lon": "88.1620",
        "rank": "176",
        "land_area": "38.769",
        "state": "Illinois",
        "lat": "41.7492",
        "population": "143,684"
  },
    {
        "name": "McKinney",
        "wiki_url": "/wiki/McKinney,_Texas",
        "population_change": "+9.23%",
        "lon": "96.6680",
        "rank": "177",
        "land_area": "62.209",
        "state": "Texas",
        "lat": "33.2012",
        "population": "143,223"
  },
    {
        "name": "Mesquite",
        "wiki_url": "/wiki/Mesquite,_Texas",
        "population_change": "+2.41%",
        "lon": "96.5924",
        "rank": "178",
        "land_area": "46.021",
        "state": "Texas",
        "lat": "32.7639",
        "population": "143,195"
  },
    {
        "name": "Clarksville",
        "wiki_url": "/wiki/Clarksville,_Tennessee",
        "population_change": "+7.21%",
        "lon": "87.3452",
        "rank": "179",
        "land_area": "97.603",
        "state": "Tennessee",
        "lat": "36.5664",
        "population": "142,519"
  },
    {
        "name": "Savannah",
        "wiki_url": "/wiki/Savannah,_Georgia",
        "population_change": "+4.21%",
        "lon": "81.1536",
        "rank": "180",
        "land_area": "103.15",
        "state": "Georgia",
        "lat": "32.0025",
        "population": "142,022"
  },
    {
        "name": "Dayton",
        "wiki_url": "/wiki/Dayton,_Ohio",
        "population_change": "-0.12%",
        "lon": "84.1996",
        "rank": "181",
        "land_area": "55.652",
        "state": "Ohio",
        "lat": "39.7774",
        "population": "141,359"
  },
    {
        "name": "Orange",
        "wiki_url": "/wiki/Orange,_California",
        "population_change": "+2.20%",
        "lon": "117.824",
        "rank": "182",
        "land_area": "24.797",
        "state": "California",
        "lat": "33.8048",
        "population": "139,419"
  },
    {
        "name": "Fullerton",
        "wiki_url": "/wiki/Fullerton,_California",
        "population_change": "+2.53%",
        "lon": "117.928",
        "rank": "183",
        "land_area": "22.353",
        "state": "California",
        "lat": "33.8857",
        "population": "138,574"
  },
    {
        "name": "Pasadena",
        "wiki_url": "/wiki/Pasadena,_California",
        "population_change": "+1.04%",
        "lon": "118.139",
        "rank": "184",
        "land_area": "22.970",
        "state": "California",
        "lat": "34.1606",
        "population": "138,547"
  },
    {
        "name": "Hampton",
        "wiki_url": "/wiki/Hampton,_Virginia",
        "population_change": "-0.44%",
        "lon": "76.2971",
        "rank": "185",
        "land_area": "51.413",
        "state": "Virginia",
        "lat": "37.0480",
        "population": "136,836"
  },
    {
        "name": "McAllen",
        "wiki_url": "/wiki/McAllen,_Texas",
        "population_change": "+3.73%",
        "lon": "98.2461",
        "rank": "186",
        "land_area": "48.344",
        "state": "Texas",
        "lat": "26.2185",
        "population": "134,719"
  },
    {
        "name": "Killeen",
        "wiki_url": "/wiki/Killeen,_Texas",
        "population_change": "+5.26%",
        "lon": "97.7320",
        "rank": "187",
        "land_area": "53.580",
        "state": "Texas",
        "lat": "31.0777",
        "population": "134,654"
  },
    {
        "name": "Warren",
        "wiki_url": "/wiki/Warren,_Michigan",
        "population_change": "+0.06%",
        "lon": "83.0250",
        "rank": "188",
        "land_area": "34.381",
        "state": "Michigan",
        "lat": "42.4929",
        "population": "134,141"
  },
    {
        "name": "West Valley City",
        "wiki_url": "/wiki/West_Valley_City,_Utah",
        "population_change": "+2.28%",
        "lon": "112.011",
        "rank": "189",
        "land_area": "35.556",
        "state": "Utah",
        "lat": "40.6885",
        "population": "132,434"
  },
    {
        "name": "Columbia",
        "wiki_url": "/wiki/Columbia,_South_Carolina",
        "population_change": "+1.87%",
        "lon": "80.8966",
        "rank": "190",
        "land_area": "132.21",
        "state": "South Carolina",
        "lat": "34.0298",
        "population": "131,686"
  },
    {
        "name": "New Haven",
        "wiki_url": "/wiki/New_Haven,_Connecticut",
        "population_change": "+0.74%",
        "lon": "72.9250",
        "rank": "191",
        "land_area": "18.679",
        "state": "Connecticut",
        "lat": "41.3108",
        "population": "130,741"
  },
    {
        "name": "Sterling Heights",
        "wiki_url": "/wiki/Sterling_Heights,_Michigan",
        "population_change": "+0.55%",
        "lon": "83.0303",
        "rank": "192",
        "land_area": "36.505",
        "state": "Michigan",
        "lat": "42.5812",
        "population": "130,410"
  },
    {
        "name": "Olathe",
        "wiki_url": "/wiki/Olathe,_Kansas",
        "population_change": "+3.32%",
        "lon": "94.8188",
        "rank": "193",
        "land_area": "59.661",
        "state": "Kansas",
        "lat": "38.8843",
        "population": "130,045"
  },
    {
        "name": "Miramar",
        "wiki_url": "/wiki/Miramar,_Florida",
        "population_change": "+5.48%",
        "lon": "80.3358",
        "rank": "194",
        "land_area": "29.521",
        "state": "Florida",
        "lat": "25.9770",
        "population": "128,729"
  },
    {
        "name": "Thousand Oaks",
        "wiki_url": "/wiki/Thousand_Oaks,_California",
        "population_change": "+1.36%",
        "lon": "118.874",
        "rank": "195",
        "land_area": "55.031",
        "state": "California",
        "lat": "34.1933",
        "population": "128,412"
  },
    {
        "name": "Frisco",
        "wiki_url": "/wiki/Frisco,_Texas",
        "population_change": "+9.56%",
        "lon": "96.8193",
        "rank": "196",
        "land_area": "61.804",
        "state": "Texas",
        "lat": "33.1510",
        "population": "128,176"
  },
    {
        "name": "Cedar Rapids",
        "wiki_url": "/wiki/Cedar_Rapids,_Iowa",
        "population_change": "+1.42%",
        "lon": "91.6778",
        "rank": "197",
        "land_area": "70.799",
        "state": "Iowa",
        "lat": "41.9670",
        "population": "128,119"
  },
    {
        "name": "Topeka",
        "wiki_url": "/wiki/Topeka,_Kansas",
        "population_change": "+0.37%",
        "lon": "95.6948",
        "rank": "198",
        "land_area": "60.168",
        "state": "Kansas",
        "lat": "39.0362",
        "population": "127,939"
  },
    {
        "name": "Visalia",
        "wiki_url": "/wiki/Visalia,_California",
        "population_change": "+2.12%",
        "lon": "119.323",
        "rank": "199",
        "land_area": "36.246",
        "state": "California",
        "lat": "36.3272",
        "population": "127,081"
  },
    {
        "name": "Waco",
        "wiki_url": "/wiki/Waco,_Texas",
        "population_change": "+1.77%",
        "lon": "97.1860",
        "rank": "200",
        "land_area": "88.964",
        "state": "Texas",
        "lat": "31.5601",
        "population": "127,018"
  },
    {
        "name": "Elizabeth",
        "wiki_url": "/wiki/Elizabeth,_New_Jersey",
        "population_change": "+1.19%",
        "lon": "74.1935",
        "rank": "201",
        "land_area": "12.319",
        "state": "New Jersey",
        "lat": "40.6663",
        "population": "126,458"
  },
    {
        "name": "Bellevue",
        "wiki_url": "/wiki/Bellevue,_Washington",
        "population_change": "+3.33%",
        "lon": "122.156",
        "rank": "202",
        "land_area": "31.968",
        "state": "Washington",
        "lat": "47.5978",
        "population": "126,439"
  },
    {
        "name": "Gainesville",
        "wiki_url": "/wiki/Gainesville,_Florida",
        "population_change": "+1.36%",
        "lon": "82.3459",
        "rank": "203",
        "land_area": "61.305",
        "state": "Florida",
        "lat": "29.6788",
        "population": "126,047"
  },
    {
        "name": "Simi Valley",
        "wiki_url": "/wiki/Simi_Valley,_California",
        "population_change": "+1.25%",
        "lon": "118.748",
        "rank": "204",
        "land_area": "41.480",
        "state": "California",
        "lat": "34.2669",
        "population": "125,793"
  },
    {
        "name": "Charleston",
        "wiki_url": "/wiki/Charleston,_South_Carolina",
        "population_change": "+4.58%",
        "lon": "79.9589",
        "rank": "205",
        "land_area": "108.97",
        "state": "South Carolina",
        "lat": "32.8179",
        "population": "125,583"
  },
    {
        "name": "Carrollton",
        "wiki_url": "/wiki/Carrollton,_Texas",
        "population_change": "+5.30%",
        "lon": "96.8998",
        "rank": "206",
        "land_area": "36.296",
        "state": "Texas",
        "lat": "32.9884",
        "population": "125,409"
  },
    {
        "name": "Coral Springs",
        "wiki_url": "/wiki/Coral_Springs,_Florida",
        "population_change": "+3.46%",
        "lon": "80.2593",
        "rank": "207",
        "land_area": "23.792",
        "state": "Florida",
        "lat": "26.2708",
        "population": "125,287"
  },
    {
        "name": "Stamford",
        "wiki_url": "/wiki/Stamford,_Connecticut",
        "population_change": "+2.01%",
        "lon": "73.5460",
        "rank": "208",
        "land_area": "37.639",
        "state": "Connecticut",
        "lat": "41.0799",
        "population": "125,109"
  },
    {
        "name": "Hartford",
        "wiki_url": "/wiki/Hartford,_Connecticut",
        "population_change": "+0.09%",
        "lon": "72.6833",
        "rank": "209",
        "land_area": "17.381",
        "state": "Connecticut",
        "lat": "41.7660",
        "population": "124,893"
  },
    {
        "name": "Concord",
        "wiki_url": "/wiki/Concord,_California",
        "population_change": "+2.17%",
        "lon": "122.001",
        "rank": "210",
        "land_area": "30.546",
        "state": "California",
        "lat": "37.9722",
        "population": "124,711"
  },
    {
        "name": "Roseville",
        "wiki_url": "/wiki/Roseville,_California",
        "population_change": "+4.82%",
        "lon": "121.303",
        "rank": "211",
        "land_area": "36.222",
        "state": "California",
        "lat": "38.7657",
        "population": "124,519"
  },
    {
        "name": "Thornton",
        "wiki_url": "/wiki/Thornton,_Colorado",
        "population_change": "+4.52%",
        "lon": "104.945",
        "rank": "212",
        "land_area": "34.843",
        "state": "Colorado",
        "lat": "39.9180",
        "population": "124,140"
  },
    {
        "name": "Kent",
        "wiki_url": "/wiki/Kent,_Washington",
        "population_change": "+33.10%",
        "lon": "122.216",
        "rank": "213",
        "land_area": "28.625",
        "state": "Washington",
        "lat": "47.3853",
        "population": "122,999"
  },
    {
        "name": "Lafayette",
        "wiki_url": "/wiki/Lafayette,_Louisiana",
        "population_change": "+1.77%",
        "lon": "92.0314",
        "rank": "214",
        "land_area": "49.231",
        "state": "Louisiana",
        "lat": "30.2116",
        "population": "122,761"
  },
    {
        "name": "Surprise",
        "wiki_url": "/wiki/Surprise,_Arizona",
        "population_change": "+3.21%",
        "lon": "112.452",
        "rank": "215",
        "land_area": "105.74",
        "state": "Arizona",
        "lat": "33.6706",
        "population": "121,287"
  },
    {
        "name": "Denton",
        "wiki_url": "/wiki/Denton,_Texas",
        "population_change": "+6.83%",
        "lon": "97.1417",
        "rank": "216",
        "land_area": "87.952",
        "state": "Texas",
        "lat": "33.2151",
        "population": "121,123"
  },
    {
        "name": "Victorville",
        "wiki_url": "/wiki/Victorville,_California",
        "population_change": "+3.82%",
        "lon": "117.353",
        "rank": "217",
        "land_area": "73.178",
        "state": "California",
        "lat": "34.5277",
        "population": "120,336"
  },
    {
        "name": "Evansville",
        "wiki_url": "/wiki/Evansville,_Indiana",
        "population_change": "+2.39%",
        "lon": "87.5347",
        "rank": "218",
        "land_area": "44.153",
        "state": "Indiana",
        "lat": "37.9877",
        "population": "120,235"
  },
    {
        "name": "Midland",
        "wiki_url": "/wiki/Midland,_Texas",
        "population_change": "+7.41%",
        "lon": "102.109",
        "rank": "219",
        "land_area": "72.071",
        "state": "Texas",
        "lat": "32.0299",
        "population": "119,385"
  },
    {
        "name": "Santa Clara",
        "wiki_url": "/wiki/Santa_Clara,_California",
        "population_change": "+2.44%",
        "lon": "121.967",
        "rank": "220",
        "land_area": "18.407",
        "state": "California",
        "lat": "37.3646",
        "population": "119,311"
  },
    {
        "name": "Athens",
        "wiki_url": "/wiki/Athens,_Georgia",
        "population_change": "+3.07%",
        "lon": "83.3701",
        "rank": "221",
        "land_area": "116.35",
        "state": "Georgia",
        "lat": "33.9496",
        "population": "118,999"
  },
    {
        "name": "Allentown",
        "wiki_url": "/wiki/Allentown,_Pennsylvania",
        "population_change": "+0.80%",
        "lon": "75.4782",
        "rank": "222",
        "land_area": "17.546",
        "state": "Pennsylvania",
        "lat": "40.5940",
        "population": "118,974"
  },
    {
        "name": "Abilene",
        "wiki_url": "/wiki/Abilene,_Texas",
        "population_change": "+1.56%",
        "lon": "99.7381",
        "rank": "223",
        "land_area": "106.79",
        "state": "Texas",
        "lat": "32.4545",
        "population": "118,887"
  },
    {
        "name": "Beaumont",
        "wiki_url": "/wiki/Beaumont,_Texas",
        "population_change": "-0.06%",
        "lon": "94.1458",
        "rank": "224",
        "land_area": "82.801",
        "state": "Texas",
        "lat": "30.0843",
        "population": "118,228"
  },
    {
        "name": "Vallejo",
        "wiki_url": "/wiki/Vallejo,_California",
        "population_change": "+1.60%",
        "lon": "122.263",
        "rank": "225",
        "land_area": "30.671",
        "state": "California",
        "lat": "38.1079",
        "population": "117,796"
  },
    {
        "name": "Independence",
        "wiki_url": "/wiki/Independence,_Missouri",
        "population_change": "+0.38%",
        "lon": "94.3513",
        "rank": "226",
        "land_area": "77.567",
        "state": "Missouri",
        "lat": "39.0853",
        "population": "117,270"
  },
    {
        "name": "Springfield",
        "wiki_url": "/wiki/Springfield,_Illinois",
        "population_change": "+0.75%",
        "lon": "89.6708",
        "rank": "227",
        "land_area": "59.480",
        "state": "Illinois",
        "lat": "39.7639",
        "population": "117,126"
  },
    {
        "name": "Ann Arbor",
        "wiki_url": "/wiki/Ann_Arbor,_Michigan",
        "population_change": "+1.92%",
        "lon": "83.7313",
        "rank": "228",
        "land_area": "27.830",
        "state": "Michigan",
        "lat": "42.2756",
        "population": "116,121"
  },
    {
        "name": "Provo",
        "wiki_url": "/wiki/Provo,_Utah",
        "population_change": "+3.05%",
        "lon": "111.644",
        "rank": "229",
        "land_area": "41.673",
        "state": "Utah",
        "lat": "40.2453",
        "population": "115,919"
  },
    {
        "name": "Peoria",
        "wiki_url": "/wiki/Peoria,_Illinois",
        "population_change": "+0.59%",
        "lon": "89.6171",
        "rank": "230",
        "land_area": "48.007",
        "state": "Illinois",
        "lat": "40.7523",
        "population": "115,687"
  },
    {
        "name": "Norman",
        "wiki_url": "/wiki/Norman,_Oklahoma",
        "population_change": "+4.18%",
        "lon": "97.3453",
        "rank": "231",
        "land_area": "178.76",
        "state": "Oklahoma",
        "lat": "35.2406",
        "population": "115,562"
  },
    {
        "name": "Berkeley",
        "wiki_url": "/wiki/Berkeley,_California",
        "population_change": "+2.51%",
        "lon": "122.299",
        "rank": "232",
        "land_area": "10.470",
        "state": "California",
        "lat": "37.8667",
        "population": "115,403"
  },
    {
        "name": "El Monte",
        "wiki_url": "/wiki/El_Monte,_California",
        "population_change": "+1.44%",
        "lon": "118.029",
        "rank": "233",
        "land_area": "9.562",
        "state": "California",
        "lat": "34.0746",
        "population": "115,111"
  },
    {
        "name": "Murfreesboro",
        "wiki_url": "/wiki/Murfreesboro,_Tennessee",
        "population_change": "+4.86%",
        "lon": "86.4161",
        "rank": "234",
        "land_area": "55.346",
        "state": "Tennessee",
        "lat": "35.8522",
        "population": "114,038"
  },
    {
        "name": "Lansing",
        "wiki_url": "/wiki/Lansing,_Michigan",
        "population_change": "-0.26%",
        "lon": "84.5562",
        "rank": "235",
        "land_area": "36.049",
        "state": "Michigan",
        "lat": "42.7098",
        "population": "113,996"
  },
    {
        "name": "Columbia",
        "wiki_url": "/wiki/Columbia,_Missouri",
        "population_change": "+4.35%",
        "lon": "92.3261",
        "rank": "236",
        "land_area": "63.077",
        "state": "Missouri",
        "lat": "38.9479",
        "population": "113,225"
  },
    {
        "name": "Downey",
        "wiki_url": "/wiki/Downey,_California",
        "population_change": "+0.99%",
        "lon": "118.130",
        "rank": "237",
        "land_area": "12.408",
        "state": "California",
        "lat": "33.9382",
        "population": "112,873"
  },
    {
        "name": "Costa Mesa",
        "wiki_url": "/wiki/Costa_Mesa,_California",
        "population_change": "+1.78%",
        "lon": "117.912",
        "rank": "238",
        "land_area": "15.654",
        "state": "California",
        "lat": "33.6659",
        "population": "111,918"
  },
    {
        "name": "Inglewood",
        "wiki_url": "/wiki/Inglewood,_California",
        "population_change": "+1.38%",
        "lon": "118.344",
        "rank": "239",
        "land_area": "9.068",
        "state": "California",
        "lat": "33.9561",
        "population": "111,182"
  },
    {
        "name": "Miami Gardens",
        "wiki_url": "/wiki/Miami_Gardens,_Florida",
        "population_change": "+3.35%",
        "lon": "80.2436",
        "rank": "240",
        "land_area": "18.231",
        "state": "Florida",
        "lat": "25.9489",
        "population": "110,754"
  },
    {
        "name": "Manchester",
        "wiki_url": "/wiki/Manchester,_New_Hampshire",
        "population_change": "+0.59%",
        "lon": "71.4439",
        "rank": "241",
        "land_area": "33.101",
        "state": "New Hampshire",
        "lat": "42.9847",
        "population": "110,209"
  },
    {
        "name": "Elgin",
        "wiki_url": "/wiki/Elgin,_Illinois",
        "population_change": "+1.61%",
        "lon": "88.3217",
        "rank": "242",
        "land_area": "37.163",
        "state": "Illinois",
        "lat": "42.0396",
        "population": "109,927"
  },
    {
        "name": "Wilmington",
        "wiki_url": "/wiki/Wilmington,_North_Carolina",
        "population_change": "+3.24%",
        "lon": "77.8858",
        "rank": "243",
        "land_area": "51.493",
        "state": "North Carolina",
        "lat": "34.2092",
        "population": "109,922"
  },
    {
        "name": "Waterbury",
        "wiki_url": "/wiki/Waterbury,_Connecticut",
        "population_change": "-0.41%",
        "lon": "73.0367",
        "rank": "244",
        "land_area": "28.519",
        "state": "Connecticut",
        "lat": "41.5585",
        "population": "109,915"
  },
    {
        "name": "Fargo",
        "wiki_url": "/wiki/Fargo,_North_Dakota",
        "population_change": "+4.01%",
        "lon": "96.8290",
        "rank": "245",
        "land_area": "48.821",
        "state": "North Dakota",
        "lat": "46.8652",
        "population": "109,779"
  },
    {
        "name": "Arvada",
        "wiki_url": "/wiki/Arvada,_Colorado",
        "population_change": "+3.11%",
        "lon": "105.106",
        "rank": "246",
        "land_area": "35.142",
        "state": "Colorado",
        "lat": "39.8097",
        "population": "109,745"
  },
    {
        "name": "Carlsbad",
        "wiki_url": "/wiki/Carlsbad,_California",
        "population_change": "+3.79%",
        "lon": "117.282",
        "rank": "247",
        "land_area": "37.722",
        "state": "California",
        "lat": "33.1239",
        "population": "109,318"
  },
    {
        "name": "Westminster",
        "wiki_url": "/wiki/Westminster,_Colorado",
        "population_change": "+2.88%",
        "lon": "105.064",
        "rank": "248",
        "land_area": "31.550",
        "state": "Colorado",
        "lat": "39.8822",
        "population": "109,169"
  },
    {
        "name": "Rochester",
        "wiki_url": "/wiki/Rochester,_Minnesota",
        "population_change": "+2.08%",
        "lon": "92.4772",
        "rank": "249",
        "land_area": "54.586",
        "state": "Minnesota",
        "lat": "44.0154",
        "population": "108,992"
  },
    {
        "name": "Gresham",
        "wiki_url": "/wiki/Gresham,_Oregon",
        "population_change": "+3.18%",
        "lon": "122.441",
        "rank": "250",
        "land_area": "23.201",
        "state": "Oregon",
        "lat": "45.5023",
        "population": "108,956"
  },
    {
        "name": "Clearwater",
        "wiki_url": "/wiki/Clearwater,_Florida",
        "population_change": "+0.97%",
        "lon": "82.7663",
        "rank": "251",
        "land_area": "25.562",
        "state": "Florida",
        "lat": "27.9795",
        "population": "108,732"
  },
    {
        "name": "Lowell",
        "wiki_url": "/wiki/Lowell,_Massachusetts",
        "population_change": "+1.88%",
        "lon": "71.3221",
        "rank": "252",
        "land_area": "13.583",
        "state": "Massachusetts",
        "lat": "42.6389",
        "population": "108,522"
  },
    {
        "name": "West Jordan",
        "wiki_url": "/wiki/West_Jordan,_Utah",
        "population_change": "+4.50%",
        "lon": "112.001",
        "rank": "253",
        "land_area": "32.457",
        "state": "Utah",
        "lat": "40.6023",
        "population": "108,383"
  },
    {
        "name": "Pueblo",
        "wiki_url": "/wiki/Pueblo,_Colorado",
        "population_change": "+1.10%",
        "lon": "104.612",
        "rank": "254",
        "land_area": "53.641",
        "state": "Colorado",
        "lat": "38.2731",
        "population": "107,772"
  },
    {
        "name": "Ventura",
        "wiki_url": "/wiki/Ventura,_California",
        "population_change": "+1.22%",
        "lon": "119.255",
        "rank": "255",
        "land_area": "21.655",
        "state": "California",
        "lat": "34.2681",
        "population": "107,734"
  },
    {
        "name": "Fairfield",
        "wiki_url": "/wiki/Fairfield,_California",
        "population_change": "+2.24%",
        "lon": "122.039",
        "rank": "256",
        "land_area": "37.390",
        "state": "California",
        "lat": "38.2568",
        "population": "107,684"
  },
    {
        "name": "West Covina",
        "wiki_url": "/wiki/West_Covina,_California",
        "population_change": "+1.26%",
        "lon": "117.909",
        "rank": "257",
        "land_area": "16.041",
        "state": "California",
        "lat": "34.0559",
        "population": "107,440"
  },
    {
        "name": "Billings",
        "wiki_url": "/wiki/Billings,_Montana",
        "population_change": "+2.67%",
        "lon": "108.549",
        "rank": "258",
        "land_area": "43.413",
        "state": "Montana",
        "lat": "45.7895",
        "population": "106,954"
  },
    {
        "name": "Murrieta",
        "wiki_url": "/wiki/Murrieta,_California",
        "population_change": "+3.23%",
        "lon": "117.190",
        "rank": "259",
        "land_area": "33.577",
        "state": "California",
        "lat": "33.5719",
        "population": "106,810"
  },
    {
        "name": "High Point",
        "wiki_url": "/wiki/High_Point,_North_Carolina",
        "population_change": "+2.12%",
        "lon": "79.9902",
        "rank": "260",
        "land_area": "53.803",
        "state": "North Carolina",
        "lat": "35.9855",
        "population": "106,586"
  },
    {
        "name": "Round Rock",
        "wiki_url": "/wiki/Round_Rock,_Texas",
        "population_change": "+6.69%",
        "lon": "97.6674",
        "rank": "261",
        "land_area": "34.113",
        "state": "Texas",
        "lat": "30.5237",
        "population": "106,573"
  },
    {
        "name": "Richmond",
        "wiki_url": "/wiki/Richmond,_California",
        "population_change": "+2.71%",
        "lon": "122.359",
        "rank": "262",
        "land_area": "30.068",
        "state": "California",
        "lat": "37.9530",
        "population": "106,516"
  },
    {
        "name": "Cambridge",
        "wiki_url": "/wiki/Cambridge,_Massachusetts",
        "population_change": "+1.24%",
        "lon": "71.1183",
        "rank": "263",
        "land_area": "6.385",
        "state": "Massachusetts",
        "lat": "42.3760",
        "population": "106,471"
  },
    {
        "name": "Norwalk",
        "wiki_url": "/wiki/Norwalk,_California",
        "population_change": "+0.69%",
        "lon": "118.083",
        "rank": "264",
        "land_area": "9.707",
        "state": "California",
        "lat": "33.9069",
        "population": "106,278"
  },
    {
        "name": "Odessa",
        "wiki_url": "/wiki/Odessa,_Texas",
        "population_change": "+6.17%",
        "lon": "102.343",
        "rank": "265",
        "land_area": "41.955",
        "state": "Texas",
        "lat": "31.8804",
        "population": "106,102"
  },
    {
        "name": "Antioch",
        "wiki_url": "/wiki/Antioch,_California",
        "population_change": "+3.06%",
        "lon": "121.797",
        "rank": "266",
        "land_area": "28.349",
        "state": "California",
        "lat": "37.9775",
        "population": "105,508"
  },
    {
        "name": "Temecula",
        "wiki_url": "/wiki/Temecula,_California",
        "population_change": "+5.11%",
        "lon": "117.124",
        "rank": "267",
        "land_area": "30.151",
        "state": "California",
        "lat": "33.5019",
        "population": "105,208"
  },
    {
        "name": "Green Bay",
        "wiki_url": "/wiki/Green_Bay,_Wisconsin",
        "population_change": "+0.78%",
        "lon": "87.9842",
        "rank": "268",
        "land_area": "45.467",
        "state": "Wisconsin",
        "lat": "44.5207",
        "population": "104,868"
  },
    {
        "name": "Everett",
        "wiki_url": "/wiki/Everett,_Washington",
        "population_change": "+1.59%",
        "lon": "122.174",
        "rank": "269",
        "land_area": "33.447",
        "state": "Washington",
        "lat": "48.0033",
        "population": "104,655"
  },
    {
        "name": "Wichita Falls",
        "wiki_url": "/wiki/Wichita_Falls,_Texas",
        "population_change": "0.00%",
        "lon": "98.5259",
        "rank": "270",
        "land_area": "72.140",
        "state": "Texas",
        "lat": "33.9067",
        "population": "104,552"
  },
    {
        "name": "Burbank",
        "wiki_url": "/wiki/Burbank,_California",
        "population_change": "+1.02%",
        "lon": "118.324",
        "rank": "271",
        "land_area": "17.341",
        "state": "California",
        "lat": "34.1890",
        "population": "104,391"
  },
    {
        "name": "Palm Bay",
        "wiki_url": "/wiki/Palm_Bay,_Florida",
        "population_change": "+0.91%",
        "lon": "80.6626",
        "rank": "272",
        "land_area": "65.702",
        "state": "Florida",
        "lat": "27.9856",
        "population": "104,124"
  },
    {
        "name": "Centennial",
        "wiki_url": "/wiki/Centennial,_Colorado",
        "population_change": "+3.35%",
        "lon": "104.869",
        "rank": "273",
        "land_area": "28.722",
        "state": "Colorado",
        "lat": "39.5906",
        "population": "103,743"
  },
    {
        "name": "Daly City",
        "wiki_url": "/wiki/Daly_City,_California",
        "population_change": "+2.54%",
        "lon": "122.465",
        "rank": "274",
        "land_area": "7.664",
        "state": "California",
        "lat": "37.7009",
        "population": "103,690"
  },
    {
        "name": "Richardson",
        "wiki_url": "/wiki/Richardson,_Texas",
        "population_change": "+4.11%",
        "lon": "96.7081",
        "rank": "275",
        "land_area": "28.564",
        "state": "Texas",
        "lat": "32.9723",
        "population": "103,297"
  },
    {
        "name": "Pompano Beach",
        "wiki_url": "/wiki/Pompano_Beach,_Florida",
        "population_change": "+3.14%",
        "lon": "80.1290",
        "rank": "276",
        "land_area": "24.002",
        "state": "Florida",
        "lat": "26.2426",
        "population": "102,984"
  },
    {
        "name": "Broken Arrow",
        "wiki_url": "/wiki/Broken_Arrow,_Oklahoma",
        "population_change": "+3.21%",
        "lon": "95.7810",
        "rank": "277",
        "land_area": "61.571",
        "state": "Oklahoma",
        "lat": "36.0365",
        "population": "102,019"
  },
    {
        "name": "North Charleston",
        "wiki_url": "/wiki/North_Charleston,_South_Carolina",
        "population_change": "+4.64%",
        "lon": "80.0169",
        "rank": "278",
        "land_area": "",
        "state": "South Carolina",
        "lat": "32.8853",
        "population": "101,989"
  },
    {
        "name": "West Palm Beach",
        "wiki_url": "/wiki/West_Palm_Beach,_Florida",
        "population_change": "+1.99%",
        "lon": "80.1266",
        "rank": "279",
        "land_area": "55.293",
        "state": "Florida",
        "lat": "26.7483",
        "population": "101,903"
  },
    {
        "name": "Boulder",
        "wiki_url": "/wiki/Boulder,_Colorado",
        "population_change": "+4.54%",
        "lon": "105.279",
        "rank": "280",
        "land_area": "",
        "state": "Colorado",
        "lat": "40.0175",
        "population": "101,808"
  },
    {
        "name": "Rialto",
        "wiki_url": "/wiki/Rialto,_California",
        "population_change": "+2.59%",
        "lon": "117.388",
        "rank": "281",
        "land_area": "22.351",
        "state": "California",
        "lat": "34.1118",
        "population": "101,740"
  },
    {
        "name": "Santa Maria",
        "wiki_url": "/wiki/Santa_Maria,_California",
        "population_change": "+1.91%",
        "lon": "120.443",
        "rank": "282",
        "land_area": "22.756",
        "state": "California",
        "lat": "34.9332",
        "population": "101,459"
  },
    {
        "name": "El Cajon",
        "wiki_url": "/wiki/El_Cajon,_California",
        "population_change": "+1.97%",
        "lon": "116.960",
        "rank": "283",
        "land_area": "14.433",
        "state": "California",
        "lat": "32.8017",
        "population": "101,435"
  },
    {
        "name": "Davenport",
        "wiki_url": "/wiki/Davenport,_Iowa",
        "population_change": "+1.68%",
        "lon": "90.6040",
        "rank": "284",
        "land_area": "62.948",
        "state": "Iowa",
        "lat": "41.5541",
        "population": "101,363"
  },
    {
        "name": "Erie",
        "wiki_url": "/wiki/Erie,_Pennsylvania",
        "population_change": "-0.73%",
        "lon": "80.0735",
        "rank": "285-(T)",
        "land_area": "19.081",
        "state": "Pennsylvania",
        "lat": "42.1166",
        "population": "101,047"
  },
    {
        "name": "Las Cruces",
        "wiki_url": "/wiki/Las_Cruces,_New_Mexico",
        "population_change": "+3.51%",
        "lon": "106.765",
        "rank": "285-(T)",
        "land_area": "76.29",
        "state": "New Mexico",
        "lat": "32.3197",
        "population": "101,047"
  },
    {
        "name": "South Bend",
        "wiki_url": "/wiki/South_Bend,_Indiana",
        "population_change": "-0.36%",
        "lon": "86.2690",
        "rank": "287",
        "land_area": "41.458",
        "state": "Indiana",
        "lat": "41.6769",
        "population": "100,800"
  },
    {
        "name": "Flint",
        "wiki_url": "/wiki/Flint,_Michigan",
        "population_change": "-1.87%",
        "lon": "83.6920",
        "rank": "288",
        "land_area": "33.416",
        "state": "Michigan",
        "lat": "43.0244",
        "population": "100,515"
  },
    {
        "name": "Kenosha",
        "wiki_url": "/wiki/Kenosha,_Wisconsin",
        "population_change": "+0.94%",
        "lon": "87.8456",
        "rank": "289",
        "land_area": "",
        "state": "Wisconsin",
        "lat": "42.5822",
        "population": "100,150"
  }
];