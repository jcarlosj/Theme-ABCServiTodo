$(function() {

	/** 
		Bootstrap 4 Carousel Multiple Items
		Tutorial > https://azmind.com/bootstrap-carousel-multiple-items/
		Demo > https://azmind.com/demo/bootstrap-carousel-multiple-items/
	*/
	$('#carousel-services').on('slide.bs.carousel', event => {
		/** CC 2.0 License Iatek LLC 2018 - Attribution required */
		let $event = $( event .relatedTarget ),
			idx = $event .index(),
			itemsPerSlide = 5,
			totalItems = $('.carousel-item') .length;

		console .log( 'Items: ', totalItems );
	
		if ( idx >= totalItems - ( itemsPerSlide - 1 ) ) {

			let it = itemsPerSlide - ( totalItems - idx );
			for( let i = 0; i < it; i++ ) {
				// append slides to end
				if ( event .direction == "left" ) {
					$( '.carousel-item' ) .eq( i ) .appendTo( '.carousel-inner' );
				}
				else {
					$( '.carousel-item' ) .eq( 0 ) .appendTo( '.carousel-inner' );
				}
			}
		}
	});

});