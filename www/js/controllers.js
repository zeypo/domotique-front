angular.module('starter.controllers',[])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.notifications = [
        {
            id : 1,
            title : 'Un mouvement à été éfféctué',
            time : moment().format('DD-MM-YYYY HH:mm')
        }
    ];

    $scope.recipes = [
        {
            id     : 1,
            title  : 'Détecteur de mouvement',
            desc   : 'Si un mouvement se produit dans la maison, une notification vous en avertira.',
            state  : 'on',
            if     : 1,
            then   : 2
        },
        {
            id    : 2,
            title : 'Automatisation des lumières',
            desc  : 'Si aucun mouvement n\'est éffectué dans la maison les lumières s\'éteignent.',
            state : 'off'
        },
        {
            id    : 3,
            title : 'Régulation chauffage',
            desc  : 'Si un il fait trop chaud dans la maison le chauffage s\'éteint.',
            state : 'on'
        },
    ];

    $scope.objects = [
        {
            id    : 1,
            title : 'detecteur de mouvement',
            desc  : 'Permet de detecter un mouvement',
            notification : 'Un mouvement à été efféctué'
        },
        {
            id    : 2,
            title : 'notification',
            desc  : 'Créer une notification'
        },
        {
            id    : 3,
            title : 'Capteur de luminosité',
            desc  : 'Donne un indice de luminosité de 1 à 10'
        },
        {
            id    : 4,
            title : 'capteur de temperature',
            desc  : 'Donne la tempèrature ambiante'
        }
    ];

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
})

.controller('NotificationsCtrl', function($scope) {
})

.controller('RecipeCtrl', function($scope, $stateParams) {

    var indexrecipe    = _.findIndex($scope.recipes, 'id', parseFloat($stateParams.recipeId));
    $scope.recipe      = $scope.recipes[indexrecipe];
    $scope.recipe.if   = $scope.objects[_.findIndex($scope.objects, 'id', $scope.recipe.if)];
    $scope.recipe.then = $scope.objects[_.findIndex($scope.objects, 'id', $scope.recipe.then)];

    $scope.updateRecipe = function(recipe) {
        $scope.recipes[indexrecipe] = recipe;
    };
})

.controller('RecipeCreateCtrl', function($scope) {

    $scope.create = function(newrecipe) {
        newrecipe.id = Math.floor((Math.random() * 100) + 1);
        newrecipe.state = 'on';

        $scope.recipes.push(newrecipe);

        // Redirige après la création d'une recette
        $('.recipe-create').fadeOut(300, function() {
            $('.validate-recipe').fadeIn(300);

            setTimeout(function(){
                $('.validate-recipe').fadeOut(300, function(){
                    $('.recipe-create').fadeIn();
                });
            }, 2000);
        });

        $scope.newrecipe = {};
    };

    $scope.$on('$ionicView.enter', function(e) {
        $scope.newrecipe = {};
    });

})
;
