/*
 * BUREAU54 AMAZIUM FRAMEWORK
 * copyright 2013 bureau54.com
 * Amazium V3.3.0 - www.amazium.co.uk
*/

/*
 * Class PhotoPost
 */
PhotoPost= function(){

 	
}
PhotoPost.prototype.setPosition = function(positionObject){
   
  this.latitude = positionObject.coords.latitude;
  this.longitude = positionObject.coords.longitude;
  this.altitude = positionObject.coords.altitude;
  this.accuracy = positionObject.coords.accuracy;
  this.altitude_accuracy = positionObject.coords.altitudeAccuracy;
  this.heading = positionObject.coords.heading;
  this.speed = positionObject.coords.speed;
  this.timestamp = positionObject.coords.timestamp;
  	
}

PhotoPost.prototype.latitude = '';
PhotoPost.prototype.longitude = '';
PhotoPost.prototype.altitude = '';
PhotoPost.prototype.accuracy = '';
PhotoPost.prototype.altitude_accuracy = '';
PhotoPost.prototype.heading = '';
PhotoPost.prototype.speed = '';
PhotoPost.prototype.timestamp = '';


var post = null;
var brands = new Array();


/*
 * Document ready
 */
jQuery(document).ready(function(){
	
	    
    init();
	
	
	jQuery("#noLogin").click(function(){
		
        showFeed();
		
	});
	
	
           
    
});


function exploreBrands(){
	
	
  jQuery.ajax({
		type: 'POST',
		url: 'http://picstarsprototype.b54server.ch/exploreBrands',
		data: { },
		beforeSend:function(){
			
		  
		},
		success:function(data){
			
		  jQuery('#brandOverview').html(data);
		  		   
								
		},
		error:function(){
			
			alert("Sorry. Error while retrieving post data.")
			
		}
  });
}

function getPosts(){
	
	
  jQuery.ajax({
		type: 'POST',
		url: 'http://picstarsprototype.b54server.ch/getPosts',
		data: { },
		beforeSend:function(){
			
		  
		},
		success:function(data){
			
		  jQuery('#feed').html(data);
		  
		  jQuery('.feed-image').slick({
           arrows: false
         });
								
		},
		error:function(){
			
			alert("Sorry. Error while retrieving post data.")
			
		}
  });
}

function addPost(){
  
  var imageData = jQuery('#instant-shot').attr('src');
  //var message = jQuery('#photo-message-text').val();
  //var brand1, brand2, brand3 = "";
  /*  
  if (brands[0])
    var brand1 = brands[0];
  
  if (brands[1])
    var brand2 = brands[1];
  
  if (brands[2])
    var brand3 = brands[2];
  
  */    
  jQuery.ajax({
		type: 'POST',
		url: 'http://picstarsprototype.b54server.ch/addPost',
		data: { photo: imageData},
		beforeSend:function(){
        
		  jQuery('#movingBallG').css('display', 'block');
          	  
		},
		success:function(data){
				  
          jQuery('#photopost-msg').html(data);
		  
		  jQuery('#movingBallG').css('display', 'none');
		  showFeed();
								
		},
		error:function(){
			
			jQuery('#movingBallG').css('display', 'none');
			alert("Ooooops. Error while retrieving post data.")
			
		}
  });
}

function getSponsorBrands(){
  
  
  jQuery.ajax({
		type: 'POST',
		url: 'http://picstarsprototype.b54server.ch/getSponsorLogo',
		data: {},
		beforeSend:function(){
        
          	  
		},
		success:function(data){
				  
          jQuery('#brand-sponsor').html(data);
		 
          jQuery('#brand-sponsor').slick({
            infinite: false,
			arrows: false,
            slidesToShow: 3,
            slidesToScroll: 3
          });
		  
		  	  
								
		},
		error:function(){
			
			alert("No Sponsor Logos available.")
			
		}
  });
}

function getRecommondationBrands(){
  
  
  jQuery.ajax({
		type: 'POST',
		url: 'http://picstarsprototype.b54server.ch/getRecommondationLogos',
		data: {},
		beforeSend:function(){
        
          	  
		},
		success:function(data){
				  
          jQuery('#brand-recommondation').html(data);
          
		  jQuery('#brand-recommondation').slick({
            infinite: false,
			arrows: false,
            slidesToShow: 3,
            slidesToScroll: 3
          });
								
		},
		error:function(){
			
			alert("No recommondation Logos available.")
			
		}
  });
}

function getOwnBrands(){
  
  
  jQuery.ajax({
		type: 'POST',
		url: 'http://picstarsprototype.b54server.ch/getOwnLogos',
		data: {},
		beforeSend:function(){
        
          	  
		},
		success:function(data){
				  
          jQuery('#brand-own').html(data);
		  
          jQuery('#brand-own').slick({
            infinite: false,
			arrows: false,
            slidesToShow: 3,
            slidesToScroll: 3
          });
									
		},
		error:function(){
			
			alert("No own Logos available.")
			
		}
  });
}

function getMessages(){
  
  
  jQuery.ajax({
		type: 'POST',
		url: 'http://picstarsprototype.b54server.ch/getMessages',
		data: {},
		beforeSend:function(){
        
          	  
		},
		success:function(data){
				  
          jQuery('#messageBoard').html(data);
		  jQuery('#messageBoard').append('<hr>');
    	},
		error:function(){
			
			alert("No messages available.")
			
		}
  });
}

function reportContent(node){
   
  
  jQuery.ajax({
		type: 'POST',
		url: 'http://picstarsprototype.b54server.ch/reportInappropriateContent',
		data: {nid: node},
		beforeSend:function(){
        
          	  
		},
		success:function(data){
				  
          alert("Inappropiate content reported. Thank you.")
		  showFeed();
    	},
		error:function(){
			
			alert("Service: Report inappropriate content not available.")
			
		}
  });
}

function getLocationAddress(latlong){

  $url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +latlong+ "&sensor=false"
  jQuery.ajax({
		type: 'POST',
		url: $url,
		data: { },
		beforeSend:function(){
        
          	  
		},
		success:function(data){
				  
          alert(data)
								
		},
		error:function(){
			
			alert("Geolocation service is temporarly unavailable.")
			
		}
  });


}

function activateLogin(){
	
	if (jQuery("#term").prop('checked')){
	
	  jQuery("#noLogin").animate({
        opacity: 1.0
        }, 1000, function() {
        // Animation complete.
     });
	}
}

function showTerms(){
	jQuery(".full-terms").animate({
        opacity: 1.0
      }, 1000, function() {
      // Animation complete.
   });
	
}


function capturePhoto(){

  //sourceType 1: camera; 2: Photo-Library
  
 navigator.camera.getPicture(getPhoto, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
  
}

function getPhoto(imageData) {

  navigator.geolocation.getCurrentPosition(onSucess, onError,{frequency:5000,maximumAge: 0, timeout: 100, enableHighAccuracy:true}); 
  //navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
  //Photo anzeigen
  jQuery('#instant-shot').attr('src', "data:image/jpeg;base64," +imageData);
  swipeDashboard();
  activateViewById('photopost');
    
}
function onFail(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {

  post = new PhotoPost();
  post.setPosition(position);
    
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}



function showFeed(){
  
  getPosts();
  activateViewById('feed' );
 	
}

function showBrandOverview(){
  
  exploreBrands();
  activateViewById('brandOverview' );
 	
}

function showMessageBoard(){
  
  getMessages();
  activateViewById('messageBoard' );
 	
}

function swipeDashboard(){
  var scrollWidth = jQuery(window).width() -20;
  
  jQuery("#button-photo").css('display', 'none');

  jQuery(".device-container").animate({
    left: "-"+ scrollWidth + "px"
  }, 500, function() {
    
        
  });

}


function swipePhotoEdit(){
  
  jQuery(".photopost-edit").animate({
    height: "0px"
  }, 500, function() {
    
        
  });

}


function swipePhotoTextEdit(){
  
  jQuery(".photopost-textedit").animate({
    height: "0px"
  }, 500, function() {
    
        
  });

}

function showPhotoEdit(){
	
  jQuery(".photopost-edit").animate({
    height: "350px"
  }, 500, function() {
  
    getSponsorBrands();
    getRecommondationBrands();
    getOwnBrands();
    
        
  });
}

function showTextEdit(){
	
  jQuery(".photopost-textedit").animate({
    height: "350px"
  }, 500, function() {
      
    
        
  });
}

function activateViewById(id){
  var idView = "#"+id;
  var idFooter = "#footer-"+id;
  
  jQuery('.footer-menu').css('display', 'none');
  jQuery(idFooter).css('display', 'block'); 
  
  jQuery('.view').css('display', 'none');
  jQuery(idView).css('display', 'block');
  
  jQuery('footer, header').css('display', 'block');

}

jQuery(window).load(function(){
	



});

jQuery(window).resize(function(){
	var windowHeight = jQuery(window).height();
	var appHeight = windowHeight - jQuery('footer').outerHeight();
	
	jQuery("#app, #login").css('min-height', appHeight+"px" );
	
	
	
        
});

function init(){
	
	//** Check if node is in fullview, if YES activate
	if (jQuery(".photopost-edit").length > 0){
    
	  jQuery(".photopost-edit").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
        
		if (direction == "down"){
		 swipePhotoEdit();
		
		}
						
		//jQuery("#swipe-action").text("You swiped " + direction + " with " + fingerCount + " fingers");
        },
		allowPageScroll: "horizontal",
        threshold:50,
        fingers:'all'
      });
	}
	
	if (jQuery('.img-wrapper').length > 0){
		jQuery('.img-wrapper').css('height', jQuery('.img-wrapper').width() + 'px');
	}
	
	if (jQuery(".photopost-textedit").length > 0){
    
	  jQuery(".photopost-textedit").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
        
		if (direction == "down"){
		 swipePhotoTextEdit();
		
		}
						
		//jQuery("#swipe-action").text("You swiped " + direction + " with " + fingerCount + " fingers");
        },
		allowPageScroll: "horizontal",
        threshold:50,
        fingers:'all'
      });
	}
	
	
 	


}

