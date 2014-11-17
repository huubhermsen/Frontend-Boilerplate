((window, $)->

	$window = $ window
	$body = $ 'body'

	triggerJumbotronScroll = $ '#triggerJumbotronScroll'
	if triggerJumbotronScroll.length
		jumbotron = $ '#jumbotronElement'

		triggerJumbotronScroll.on 'click', (event)->
			event.preventDefault()
			$ 'html, body'
                .animate { scrollTop: jumbotron.height() + 'px' }, 500
			return

		return

)(window, jQuery)
