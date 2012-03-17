/*jslint devel: false, browser: false, white: true */
/*global $: false, window: false */

(function () {
	"use strict";
	
	window.BABY = function (ins) {
		this.gestation = 40 * 7 * 24 * 60 * 60 * 1000;
		this.color = { from: '#86ff51', to: '#7bd150' };
		this.today = new Date();
		this.duedate = new Date();
		
		this.init = function (ins) {
			var ops = ins || {};

			if (ops.duedate) {
				this.duedate = new Date(ops.duedate);
			} else {
				this.duedate = new Date(Date.parse(this.today) + this.gestation);
			}
			if (ops.gender) {
				if (ops.gender === 'boy') {
					this.color = { from: '#7f90ff', to: '#545fa8' };
				} else if (ops.gender === 'girl') {
					this.color = { from: '#ff77d6', to: '#a64f8c' };
				}
			}

			this.update();
		};
		
		this.update = function () {
			var that = this, itemid = 'babyprogress_' + Date.parse(this.duedate), item = window.document.getElementById(itemid), percentdone = ((1 - (this.duedate - new Date()) / this.gestation) * 100).toFixed(8), s = '', h = '', done = '';
			
			if (percentdone >= 100) {
				percentdone = 100;
			}
			
			if (!item) {
				s = '<style>#' + itemid + '{border:1px solid #000;background:#eee;overflow:hidden;-webkit-border-radius:12px;-moz-border-radius:12px;border-radius:12px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;} #' + itemid + '>div{background-color:' + this.color.from + ';background-image:-webkit-gradient(linear,left top,left bottom,from(' + this.color.from + '),to(' + this.color.to + '));background-image:-webkit-linear-gradient(top,' + this.color.from + ',' + this.color.to + ');background-image:-moz-linear-gradient(top,' + this.color.from + ',' + this.color.to + ');background-image:-ms-linear-gradient(top,' + this.color.from + ',' + this.color.to + ');background-image:-o-linear-gradient(top,' + this.color.from + ',' + this.color.to + ');background-image:linear-gradient(to bottom,' + this.color.from + ',' + this.color.to + ');width:' + percentdone + '%;min-width:96px;color:#fff;text-align:right;padding-right:6px;-webkit-border-radius:12px;-moz-border-radius:12px;border-radius:12px;}</style>';
				window.document.write(s);
				
				h = '<div id="' + itemid + '" class="babyprogress"><div>' + percentdone + '%</div></div>';
				window.document.write(h);
			} else {
				done = item.childNodes[0];
				done.innerHTML = percentdone + '%';
				done.style.width = percentdone + '%';
			}
			
			window.setTimeout(function () {
				that.update();
			}, 100);
		};
		
		this.init(ins);
	};
}());