$(function() {
	(function($, window, undefined) {

		var pluginName = 'ipie',
			document = window.document,
			defaults = {
				data: [30, 50, 30, 45, 34],
				colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']
			};

		function Plugin(element, options) {
			this.element = element;

			this.options = $.extend({}, defaults, options);

			this._defaults = defaults;
			this._name = pluginName;

			this.init();
		}

		Plugin.prototype.init = function() {
			var _this = $(this.element).html(''),
				_data = this.options.data,
				_colors = this.options.colors,
				_width = $(this.element).width(),
				_height = $(this.element).height();
			var devicePixelRatio = window.devicePixelRatio || 1;
			var canvas = document.createElement("canvas");
			canvas.setAttribute("width", _width * devicePixelRatio);
			canvas.setAttribute("height", _height * devicePixelRatio);
			if (devicePixelRatio != 1) {
				canvas.setAttribute("style", "width:" + width + "px;height:" + height + "px");
			}
			$(canvas).appendTo(_this);

			var ctx = canvas.getContext('2d');
			var radius = (_height < _width ? _height : _width) / 2 - 5;
			var centerx = _width / 2;
			var centery = _height / 2;
			var total = 0;
			for (x = 0; x < _data.length; x++) {
				total += _data[x];
			}


			var lastend = 0;
			var offset = Math.PI / 2;
			for (x = 0; x < _data.length; x++) {
				var thispart = _data[x];
				ctx.beginPath();
				ctx.fillStyle = _colors[x];
				ctx.strokeStyle = "rgba(255,255,255,0.5)";
				ctx.moveTo(centerx, centery);
				var arcsector = Math.PI * (2 * thispart / total);
				ctx.arc(centerx, centery, radius, lastend - offset, lastend + arcsector - offset, false);
				ctx.lineTo(centerx, centery);
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
				lastend += arcsector;
			}
		};

		$.fn[pluginName] = function(options) {
			return this.each(function() {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		};

	}(jQuery, window));

	$('#pie').ipie({
		data: [432, 432, 432, 543, 65, 54, 342, 432, 56]
	});
})