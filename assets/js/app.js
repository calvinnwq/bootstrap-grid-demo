$(document).ready(function() {

  var app = new App();

  app.showView('grid');
  app.updateGridVars();

  $('#mobile-menu-items').on('click', 'a', function(e) {
    $('.collapse').collapse('hide');
  });

  $(window).resize(function() {
    if (app.currentView === "grid") {
      app.updateGridVars();
    }
  });

  // Navigation Links

  $('.nav-link').on('click', function(e) {
    e.preventDefault();
    var view = $(this).attr('data-view');
    app.showView(view);
    if (view === "grid") {
      app.updateGridVars();
    }
  });

});

function App() {
}

App.prototype.updateGridVars = function() {
  $('.grid-sample').each(function() {
    var isLast = $(this).hasClass('last');
    var bufferAdd = isLast ? 1 : 2;
    var width = $(this).width() + bufferAdd;
    var gutterLeft = parseInt($(this).parent('div').css('padding-left'), 10);
    var gutterRight = parseInt($(this).parent('div').css('padding-right'), 10);
    var fullWidth = width + gutterLeft + gutterRight;
    var gutter = gutterLeft + gutterRight;
    $(this).find('.width-full-value').text(fullWidth + "px");
    $(this).find('.width-value').text(width + "px");
    $(this).find('.gutter-left-value').text(gutterLeft + "px");
    $(this).find('.gutter-right-value').text(gutterRight + "px");
    $(this).find('.gutter-value').text(gutter + "px");
  });
}

App.prototype.showView = function(view) {
  var that = this;
	var $view = null;

  that.previousView = that.currentView;

	if (view != null && view != undefined && view != "") {
		$view = $('#view-' + view);
    that.currentView = view;
	} else {
		$view = $('#view-home');
    that.currentView = 'home';
	}

  $('.nav-link').removeClass('active');
  $('.nav-link[data-view="' + view + '"]').addClass('active');

	if ($view.hasClass('active')) {
		return true;
	}

	$('.view').removeClass('active').hide();
	$view.addClass('active').fadeIn();
}