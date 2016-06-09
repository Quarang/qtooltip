(function ($) {
	
	$.fn.qtooltip = function(){
		
		//Приготовим всякое.
		var obj = $(this);
		var helper;
		$('body').css('position', 'relative');
			
		//И массивчик для проверки раскладки.
		var replacer = {
			"q":"й", "w":"ц", "e":"у", "r":"к", "t":"е", "y":"н",
			"u":"г", "i":"ш", "o":"щ", "p":"з", "[":"х", "]":"ъ",
			"a":"ф", "s":"ы", "d":"в", "f":"а", "g":"п", "h":"р",
			"j":"о", "k":"л", "l":"д", ";":"ж", "'":"э", "z":"я",
			"x":"ч", "c":"с", "v":"м", "b":"и", "n":"т", "m":"ь",
			",":"б", ".":"ю", "/":"."
		};
		
	
		$(obj).keyup(function(){
			
			//А есть ли вообще такой блок? Если его нет, то функцию можно убивать.
			var qtt = $(this).data('qtt');
			if (qtt) {
				if ($(qtt).length <= 0) {
					return false;
				}
			} else {
				qtt = $(this).attr('id');
				if (qtt) {
					if ($(qtt).length <= 0) {
						return false;
					}
				} else {
					return false;
				}
			}
			
			//Если есть — сольём его в массив
			var tts = $(qtt).text().split(',');
		
			//Запилим helper, если его нет, а если есть - почистим
			if (!helper) {
				var htop = $(this).offset().top + $(this).outerHeight();
				var hleft = $(this).offset().left;
				var hwidth = $(this).outerWidth();
				helper = $('<ul/>', {
					class: "qqt-list",
					css: {
						top: htop,
						left: hleft,
						width: hwidth
					}
						
				});
				$('body').append(helper);
			}
			helper.empty();
			
			//Заберём val
			var tt = $(this).val().toLowerCase();
		
			//Проверим раскладку
			for(i=0; i < tt.length; i++){
				replace = replacer[tt[i].toLowerCase()];
				if(replace){
					tt = tt.replace(tt[i], replace);
				}
			}
			
			var thisss = $(this);
			
			//Проверим, есть ли варианты и запишем ответ в boolean, а так же - наполним helper по дороге
			var check = false;
			$.each(tts, function(index, value){
				
				if((tt !== '') && (value.toLowerCase().indexOf(tt) >= 0)){
					var helpstring = $('<li/>', {
						text: value,
						on: {
							mousedown: function(e) {
								thisss.val(value);
							}
						}
					});
					helper.append(helpstring);
					check = true;
				}
			
			});
			
			//Если вариантов нет - helper нам не очень нужен
			if (!check) {
				helper.empty();
				helper.detach();
				helper = false;
				return false;
			}
			
		}).blur(function(){
			
			//Уберём helper
			
			if (helper) {
				helper.empty();
				helper.detach();
				helper = false;
				return false;
			}
			
		});
	}
	
} (jQuery));