(function (w, d) {
	window.APP.set(
		'lazyload', 
		new LazyLoad({
			elements_selector: '.lazy',
		})
	);
})(window, document);
