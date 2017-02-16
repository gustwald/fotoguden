import 'whatwg-fetch'
import Masonry from 'masonry-layout';
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

});

$(() => {

  if($('.detailWrap').length > 0) {

    $('.detailWrap .inner').imagesLoaded(() => {
        var msnry = new Masonry('.masonry', {
        // options...
        percentPosition: true,
        itemSelector: '.intense',
          //  columnWidth : 300,
            gutterWidth: 20
      });
    })
  }
 

  if($('.grid-wrapper').length > 0) {

    $('.grid-wrapper').imagesLoaded(() => {
      var msnry = new Masonry('.grid-wrapper', {
      // options...
      // percentPosition: true,
      itemSelector: '.grid-children',
        //  columnWidth : 300,
          gutter: 10
    });
  })

  }
  
})

$( document ).ready(function() {
  var element = document.querySelectorAll( '.intense' );
  if(element.length) {
    Intense(element);
  }

	//Scrollknappar
	$('.next').click(function(){
		$('html,body').animate({
		   scrollTop: $(".content").offset().top
		 }, 800);
	});
});



const loadMoreCollections = (offset) => {
  return fetch(`/api/collections?offset=${offset}`)
      .then(response => response.json())
};


const getCollectionWrap = (item) => `
  <div class="collection-wrap" data-id="${item.id}">
        <h2 class="collection-title">${item.title._content}</h2>
        <a href="/collections/${item.id}"><img src="${item.url}?size=Large 1600" /></a>

</div>
`

// Infinte scroll
$(() => {
  const $theContainer = $('.collections');

  const sr = ScrollReveal({ delay: 1000, });
  sr.reveal('.collection-wrap', { container: $theContainer[0] });


  let loadingCollections = false;

  if($('.albums').length == 0) return;

  const onScroll = () => {
    const $window = $(window);
    var tweak = 10;


    if (( $window.scrollTop() >= $theContainer.height() - $window.height() - tweak) && !loadingCollections) {
      loadingCollections = true;

      loadMoreCollections($('.collection-wrap').length)
          .then(response => {
            
            response.items.forEach((item, i) => {
              setTimeout(() => {
                  const html = getCollectionWrap(item);
                  $theContainer.append(html);
                   sr.sync();

                   if(i + 1 == response.items.length) {
loadingCollections = false;
                   }
              }, i * 300);
            })


            

            if(response.last) {
              $(window).off('scroll', onScroll);
            }
          })
    }
  }

  $(window).scroll(onScroll);
})