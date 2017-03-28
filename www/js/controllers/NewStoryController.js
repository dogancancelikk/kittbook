'use strict';

angular
.module("starter")

.controller('NewStoryController',function($scope,$ionicPlatform,UploadService,$ionicHistory,$cordovaImagePicker,$rootScope,StoryService,Upload,
	ionicMaterialInk,$jrCrop,$state,$ionicSlideBoxDelegate,$cordovaCamera,$timeout,$ionicLoading,$mdBottomSheet,$cordovaFile,$cordovaFileTransfer,CategoryService){

	$scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);
	ionicMaterialInk.displayEffect();

	$scope.story = {};
 	$scope.story.description = '';
 	$scope.story.tags = [];
 	$scope.story.ownerID=$rootScope.globals.currentUser.id;
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	console.log(base64toBlob("iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==","image/jpeg"));
	function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = window.atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
	$scope.deneme = function(){

	}
	$scope.getContent = function(data) {
	console.log('Editor content:',data.tinymceModel);
	};
	$scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
 	 };

	CategoryService.getCategories().then(function(data){
		console.log(data);
		$scope.categories=data;
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
$scope.newimage = "";

$scope.photoAdd = function(){
	debugger;
	$scope.newimage = "https://static.pexels.com/photos/46710/pexels-photo-46710.jpeg";
}
$scope.newImage = "img/placeholder.png";
$scope.tryAddImage = function(){
	$scope.newImage ="";
	$scope.newImage = "https://www.w3schools.com/css/img_fjords.jpg";
}

$ionicPlatform.ready(function(){
	$scope.addImageToStory = function(){
			var options2 = {
				quality:100,
				destinationType:Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				allowEdit:true,
				targetWidth:250,
				targetHeight:340,
				encodingType:Camera.EncodingType.JPEG,
				correctOrientation: true,
				popoverOptions:CameraPopoverOptions,
				saveToPhotoAlbum:false
			}

			$cordovaCamera.getPicture(options2).then(function(imageURI){
				debugger;
				var image={};
				image.imageName = imageURI;
				UploadService.uploadPhoto(image).then(function(fileName){

				})

			// var options = new FileUploadOptions();
			// 	options.fileKey = "post";
			// 	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
			// 	options.mimeType = "image/jpeg";
			// 	options.chunkedMode = false;
			// 	console.log(options.fileName);
			// 	var params = new Object();
			// 	params.value1 = "test";
			// 	params.value2 = "param";
			// 	options.params = params;
			// 	options.chunkedMode = false;
			 //
			//  var ft = new FileTransfer();
			// 	ft.upload(base64toBlob(imageURI,"image/jpeg"), encodeURI("http://kittbook.com/api/upload"), function(result){
			// 	console.log(JSON.stringify(result));
			// 	}, function(error){
			// 	console.log(JSON.stringify(error));
			// 	}, options);
			// var win = function(r) {
			// 			console.log("Should not be called.");
			// 			console.log(r);
			// 	}
			//
			// 	var fail = function(error) {
			// 			// error.code == FileTransferError.ABORT_ERR
			// 			alert("An error has occurred: Code = " + error.code);
			// 			console.log("upload error source " + error.source);
			// 			console.log("upload error target " + error.target);
			// 			console.log("upload error target " + error);
			//
			// 	}
			// 	var contentType = 'image/jpeg';
			// 	var b64Data = imageURI;
			//
			// 	var blob = b64toBlob(b64Data, contentType);
			// 	var blobUrl = URL.createObjectURL(blob);
			// 	debugger;
			// 	var options = new FileUploadOptions();
			// 	options.fileKey="file";
			// 	options.fileName=blobUrl;
			// 	//options.fileName = dataURLtoBlob(imageURI);
			//
			//   var params = {};
			// 	params.fullpath =imageURI;
			// 	params.name = options.fileName;
			// 	options.params =params;
			// 	var ft = new FileTransfer();
			// 	ft.upload(imageURI, "http://kittbook.com/api/upload", win, fail, options);
			},function(err){
				console.log("Is there some problem while you are taking photo from phone...");
			});
	}
	// $scope.addImageToStory = function(){
	// 	var win = function(r) {
	// 		    console.log("Should not be called.");
	// 		}
	//
	// 		var fail = function(error) {
	// 		    // error.code == FileTransferError.ABORT_ERR
	// 		    alert("An error has occurred: Code = " + error.code);
	// 		    console.log("upload error source " + error.source);
	// 		    console.log("upload error target " + error.target);
	// 		}
	//
	// 		var options = new FileUploadOptions();
	// 		options.fileKey="file";
	// 		options.fileName="myphoto.jpg";
	// 		options.mimeType="image/jpeg";
	//
	// 		var ft = new FileTransfer();
	// 		ft.upload(fileURL, encodeURI("http://some.server.com/upload.php"), win, fail, options);
	// 		ft.abort();
	// }
});
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
		console.log(index);
	};
	$scope.nextSlide = function() {
	  $ionicSlideBoxDelegate.next();
	};
	$scope.tSlide = function() {
		$ionicSlideBoxDelegate.previous();
	};
  $scope.createStory=function(story){
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
  	StoryService.addStory(story).then(function(data){
		$ionicHistory.nextViewOptions({
	      disableBack: true
	    });
		$state.go('app.managestory',{storyid:data.id});
  	},function(err){
  		console.log("Hata var" + err);
  	});
  }


});
