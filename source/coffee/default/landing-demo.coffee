((window, $)->

	$window = $ window
	$body = $ 'body'

	triggerJumbotronScroll = $ '#triggerJumbotronScroll'
	if triggerJumbotronScroll.length
		jumbotron = $ '#jumbotronElement'

		triggerJumbotronScroll.on 'click', (event)->
			event.preventDefault()
			$body.animate { scrollTop: jumbotron.height() }, 500
			return

		return

)(window, jQuery)