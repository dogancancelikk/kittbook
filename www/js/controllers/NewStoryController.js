'use strict';

angular
.module("starter")

.controller('NewStoryController',function($scope,StoryService,ionicMaterialInk,$state,$ionicSlideBoxDelegate,$timeout,$ionicLoading,$mdBottomSheet,CategoryService){
	$scope.$parent.clearFabs();
	$timeout(function() {
			 $scope.$parent.hideHeader();
	 }, 0);
	ionicMaterialInk.displayEffect();
  $scope.data = {};

		$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});

	$scope.getContent = function(data) {
	console.log('Editor content:',data.tinymceModel);
	};
	$scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
  };

		CategoryService.getCategories().then(function(data){
			$scope.categories=data;
			$ionicSlideBoxDelegate.update();
			$ionicLoading.hide();
		},function(Err){
			console.log(Err);
		});

// 	$scope.tinymceOptions = {
// 				plugins: 'print wordcount fullscreen',
//         toolbar: "undo redo bold italic,fullscreen",
// 				menubar: false,
// 				theme: 'modern',
// 				height:2800,
// 				fullscreen_new_window : true
// 		};


  $scope.createStory=function(data){
  	StoryService.addStory(data.name,3,data.description,0).then(function(data){

  		$state.go('app.storydetail',{storyid:data.id});
  	},function(err){
  		console.log("Hata var" + err);
  	})
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
    console.log($scope.data);
  };

	var events = ['trixInitialize', 'trixChange', 'trixSelectionChange', 'trixFocus', 'trixBlur', 'trixFileAccept', 'trixAttachmentAdd', 'trixAttachmentRemove'];

	 for (var i = 0; i < events.length; i++) {
			 $scope[events[i]] = function(e) {
					 console.info('Event type:', e.type);
			 }
	 };

	 var createStorageKey, host, uploadAttachment;

	 $scope.trixAttachmentAdd = function(e) {
			 var attachment;
			 attachment = e.attachment;
			 if (attachment.file) {
					 return uploadAttachment(attachment);
			 }
	 }

	 host = "https://d13txem1unpe48.cloudfront.net/";

	 uploadAttachment = function(attachment) {
			 var file, form, key, xhr;
			 file = attachment.file;
			 key = createStorageKey(file);
			 form = new FormData;
			 form.append("key", key);
			 form.append("Content-Type", file.type);
			 form.append("file", file);
			 xhr = new XMLHttpRequest;
			 xhr.open("POST", host, true);
			 xhr.upload.onprogress = function(event) {
					 var progress;
					 progress = event.loaded / event.total * 100;
					 return attachment.setUploadProgress(progress);
			 };
			 xhr.onload = function() {
					 var href, url;
					 if (xhr.status === 204) {
							 url = href = host + key;
							 return attachment.setAttributes({
									 url: url,
									 href: href
							 });
					 }
			 };
			 return xhr.send(form);
	 };

	 createStorageKey = function(file) {
			 var date, day, time;
			 date = new Date();
			 day = date.toISOString().slice(0, 10);
			 time = date.getTime();
			 return "tmp/" + day + "/" + time + "-" + file.name;
	 };

	  $scope.initialForm = function () {
        // $scope.imageList is for store image data.
        $scope.imageList = [];
    };// End initialForm.

    // selectImage is for select image from mobile gallery
    // Parameter :  
    // limit = limit number that can select images.
    $scope.selectImage = function (limit) {
        //hide BottomSheet.
        $mdBottomSheet.hide();
        // Set options for select image from mobile gallery.
        var options = {
            maximumImagesCount: limit,
            width: 300,
            height: 300,
            quality: 100
        }; // End Set options.

        // select image by calling $cordovaImagePicker.getPictures(options)
        // Parameter :  
        // options = options of select image.
        $cordovaImagePicker.getPictures(options)

            .then(function (results) {
                // store image data to imageList.
                $scope.imageList = [];
                for (var i = 0; i < results.length; i++) {
                    $scope.imageList.push(results[i]);
                }
            }, function (error) {
                console.log(error);
            });
    };// End selectImage.

    // showListBottomSheet for show BottomSheet.
    $scope.showListBottomSheet = function ($event) {
        $mdBottomSheet.show({
            templateUrl: 'image-picker-actions-template',
            targetEvent: $event,
            scope: $scope.$new(false),
        });
    }; // End showListBottomSheet.

    $scope.initialForm();

});
