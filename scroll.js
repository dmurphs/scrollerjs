(function($){
  $.fn.initScroll = function(configuration){
    elem = (this);

    var settings = $.extend({
      height: '300px',
      width: '200px',
      scrollerWidth: '3px',
      scrollerHeight: '100px',
      scrollSpeed: 10,
    }, configuration);
    elem.css('position','relative');
    elem.css('height',settings.height);
    elem.css('width',settings.width);
    elem.css('overflow','hidden');
    elem.scrollTop(0);
    elem.scrollLeft(0);

    var vertScrollbarID = (this).id + '-vert-scroll';
    elem.append("<div id='" + vertScrollbarID + "' style='position: absolute; right: 0; top: 0; background: black; width: " + settings.scrollerWidth + "; height: " + settings.scrollerHeight + "; '></div>");

    var horizScrollbarID = (this).id + '-horiz-scroll';
    elem.append("<div id='" + horizScrollbarID + "' style='position: absolute; left: 0; bottom: 0; background: black; width: " + settings.scrollerHeight + "; height: " + settings.scrollerWidth + "; '></div>");

    var scrollableHeight = elem[0].scrollHeight - elem.height();
    var scrollableWidth = elem[0].scrollWidth - elem.width();

    vertScrollbarObj = $("#"+vertScrollbarID);
    horizScrollbarObj = $("#"+horizScrollbarID);

    var scrollableElemHeight = elem.height() - vertScrollbarObj.height();
    var scrollableElemWidth = elem.width() - horizScrollbarObj.width();

    elem.on('mousewheel', function(event) {

      verticalPoint = Math.min(scrollableHeight, elem.scrollTop() - event.deltaY);
      if (verticalPoint < 0){
        verticalPoint = 0;
      }
      horizontalPoint = Math.min(scrollableWidth, elem.scrollLeft() + event.deltaX);
      if (horizontalPoint < 0){
        horizontalPoint = 0;
      }

      elem.scrollTop(verticalPoint);
      elem.scrollLeft(horizontalPoint);

      var percentVert = verticalPoint/scrollableHeight;
      var percentHoriz = horizontalPoint/scrollableWidth;

      var vertScrollerPosY = parseInt(scrollableHeight*percentVert + scrollableElemHeight*percentVert);
      var vertScrollerPosX = parseInt(scrollableWidth*percentHoriz + elem.width() - vertScrollbarObj.width());

      var horizScrollerPosX = parseInt(scrollableWidth*percentHoriz + scrollableElemWidth*percentHoriz);
      var horizScrollerPosY = parseInt(scrollableHeight*percentVert + elem.height() - horizScrollbarObj.height());

      vertScrollbarObj.css('top',String(vertScrollerPosY));
      vertScrollbarObj.css('left',String(vertScrollerPosX));

      horizScrollbarObj.css('left',String(horizScrollerPosX));
      horizScrollbarObj.css('top',String(horizScrollerPosY));
    });

    var dragging = null;
    $("#"+vertScrollbarID).mousedown(function(e){
      dragging = $(e.target);
    });
    $(document).mouseup(function(e){
      dragging = null;
    });

    $(document).mousemove(function(e){
      if (dragging){
        var scrollbarTop = Math.min(e.pageY,scrollableElemHeight);
        if (scrollbarTop < 0){
          scrollbarTop = 0;
        }
        dragging.offset({
            top: scrollbarTop
        });

        percentScroll = e.pageY/scrollableElemHeight;
        var top = Math.min(percentScroll*scrollableHeight,scrollableHeight);
        elem.scrollTop(top);
      }
    });
  }
})(jQuery);
