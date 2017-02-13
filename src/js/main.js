import 'whatwg-fetch'
import Masonry from 'masonry-layout';
import Blazy from 'blazy';
import Intense from './Intense';

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


$(() => {
  
  $('.detailWrap .inner').imagesLoaded(() => {
    var msnry = new Masonry('.masonry', {
    // options...
     percentPosition: true,
     itemSelector: '.intense',
      //  columnWidth : 300,
        gutterWidth: 20
  });
  
  })
 


})

$( document ).ready(function() {
  var element = document.querySelectorAll( '.intense' );
  console.log(element)
    Intense( element );


	//Scrollknappar
	$('.next').click(function(){
		$('html,body').animate({
		   scrollTop: $(".content").offset().top
		 }, 800);
	});
});