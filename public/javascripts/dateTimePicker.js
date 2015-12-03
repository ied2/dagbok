document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded: main');
  ToDos.init();
});

var ToDos = (function() {

	var currentDiary;

	function init() {

	var title = document.querySelector('#diaryTitle');
	var textarea = document.querySelector('#diaryText');


	$(function() {
		$('.datepicker').datepicker({
			format: "dd-mm-yyyy",
		});
	});

	$(function() {
		var d = new Date();
  		var d = d.getDate() + "-" + parseInt(d.getMonth()+1) + "-" + d.getFullYear();
		var date = document.querySelector('.datepicker').value = d;
	});


	$(function() {
		var classname = document.getElementsByClassName("note");

		var myFunction = function(e) {
        	console.log(e.path[0].id);
        	var id = e.path[0].id;
        	currentDiary = id;
        	$.ajax({
		      type: "GET",
		      url: '/getDiary',
		      crossDomain: true,
		      data: {id: id},
		      success: function (data) {
		          title.value = data[0].title;
		         	textarea.value = data[0].text;
		      }
  			});
    	};

		 for(var i = 0; i <classname.length; i++){
        	classname[i].addEventListener('click', myFunction, false);
    	}
	});


	document.querySelector("#saveButton").addEventListener('click', function (e) {
		var title1 = title.value;
		var textarea1 = textarea.value;
		var date = document.querySelector('.datepicker').value;

		post_to_url('/comments', {title: title1, text: textarea1, date: date});

	});

	document.querySelector("#deleteButton").addEventListener('click', function () {

		$.ajax({
		      type: "GET",
		      url: '/delete',
		      crossDomain: true,
		      success: function (data) {
		          
		      }
  			});

		// document.querySelector('#"'e'"').remove();
		$('#'+currentDiary+'').parent().remove();

	});

	// $(function() {
	// 	$("#dp").datepicker({
	// 		changeMonth: true;
	// 		changeYear: true;
	// 		todayHighlight true;
	// 	})
	// })

}
  return {
    init: init,
  };
})();



function post_to_url(path, params, method) {
    method = method || "post";

    var form = document.createElement("form");

    //Move the submit function to another variable
    //so that it doesn't get overwritten.
    form._submit_function_ = form.submit;

    form.setAttribute("method", method);
    form.setAttribute("action", path);

      for(var key in params) {
		    var hiddenField = document.createElement("input");
		    hiddenField.setAttribute("type", "hidden");
		    hiddenField.setAttribute("name", key);
		    hiddenField.setAttribute("value", params[key]);

		    form.appendChild(hiddenField);
    	}

    document.body.appendChild(form);
    form._submit_function_(); //Call the renamed function.
	}
