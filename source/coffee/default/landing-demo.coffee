((window, $, Modernizr, TweenLite)->

    $window = $ window
    $body = $ 'body'

    triggerJumbotronScroll = $ '#triggerJumbotronScroll'
    if triggerJumbotronScroll.length
        jumbotron = $ '#jumbotronElement'

        triggerJumbotronScroll.on 'click', (event)->
            event.preventDefault()
            TweenLite.to $window, 1.5, { scrollTo: { y: jumbotron.height(), x: 0 }, ease: Bounce.easeOut }
            return

        return

)(window, jQuery, Modernizr, TweenLite)
