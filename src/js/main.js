import $ from 'jquery';
import 'whatwg-fetch'
import Masonry from 'masonry-layout';
import Blazy from 'blazy';


const getUrlFromPhoto = photo => {
  return "http://farm" + photo.farm + ".static.flickr.com/" +
      photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
}

// Append to collections
$(() => {
  return;
	const $collections = $('.collection-wrap');

  if($collections.length) {
    $collections.each(function () {
      const $this = $(this);
      const id = $this.data('id');

      const $images = $this.find('.images');

      const addImage = ({photoset}) => {
        photoset.photo.forEach(photo =>
            $images.append(
                `<img data-imgid="${photo.id}" src="${getUrlFromPhoto(photo)}" />`
            )
        );
        // loadHqImages();
      };

      // loadHqImages();

      fetch(`/api/collections/${id}`)
          .then(response => response.json())
          .then(response => addImage(response))
    });
  }
  // loadHqImages();

});

const loadHqImages = () => {

  $("img").one("load", function() {
    const $img = $(this);
    // console.log('asdasd')
    if(!$img.data('loaded')) {
      const id = $(this).data('imgid');
      $img.attr('src', `/api/photos/${id}`);
      $img.data('loaded', 1)
    }
  })
}




$(() => {
  var msnry = new Masonry('.masonry', {
    // options...
  });


  var bLazy = new Blazy({
    success: function(ele){
      setTimeout(() => {
        msnry.layout();
      }, 200)
      // Image has loaded
      // Do your business here
      console.log('haha')
    }
  });
})

$( document ).ready(function() {
	//Scrollknappar
	$('.next').click(function(){
		$('html,body').animate({
		   scrollTop: $(".content").offset().top
		 }, 800);
	});
});