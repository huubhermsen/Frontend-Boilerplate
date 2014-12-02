###global window jQuery TweenLite Bounce###
((window, $, TweenLite, Bounce)->

    "use strict"

    $window = $ window

    triggerJumbotronScroll = $ "#triggerJumbotronScroll"
    if triggerJumbotronScroll.length
        jumbotron = $ "#jumbotronElement"

        triggerJumbotronScroll.on "click", (event)->
            event.preventDefault()
            TweenLite.to $window, 1.5, { scrollTo: { y: jumbotron.height(), x: 0 }, ease: Bounce.easeOut }
            return

        return

)(window, jQuery, TweenLite, Bounce)
