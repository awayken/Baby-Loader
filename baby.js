/*jslint evil: true, white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */
/*global window: false */

(function () {
	"use strict";
	
	window.BABY = function (ins) {
		this.gestation = 40 * 7 * 24 * 60 * 60 * 1000;
		this.color = '#86ff51';
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
					this.color = '#7f90ff';
				} else if (ops.gender === 'girl') {
					this.color = '#ff77d6';
				}
			}

			this.update();
		};
		
		this.update = function () {
			var that = this, itemid = 'babyprogress_' + Date.parse(this.duedate), item = document.getElementById(itemid), percentdone = (1 - (this.duedate - new Date()) / this.gestation) * 100, s = '', h = '', done = '';
			
			if (percentdone >= 100) {
				percentdone = 100;
			}
			
			if (!item) {
				s = '<style>#' + itemid + '{border:1px solid #000;background:#eee;overflow:hidden;} #' + itemid + ' .percentdone{background-color:' + this.color + ';width:' + percentdone + '%;color:#fff;text-align:right;padding-right:2px;}</style>';
				document.write(s);
				
				h = '<div id="' + itemid + '" class="babyprogress"><div class="percentdone">' + percentdone + '%</div></div>';
				document.write(h);
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