/**
 * Exception Ticket
 */

$(document).ready(function(e){
	addOrUpdate();
});

function deleteById(id){
	var c = confirm('Data will be delted!');
	if(c){
		$.ajax({
			method		: 'DELETE',
			dataType	: 'json',
			contentType	: 'Application/JSON',
			data		: JSON.stringify(id),
			url			: 'api/v1/tickets/'+id+'/exception',
			success		: function(e){
				
			},
			statusCode	: {
				200	: function(e){
					alert('Data is deleted!');
					location.reload = true;
				},
				400	: function(e){
					alert('Not Found!');
				}
			}
		});
	}
}

function addOrUpdate(){
	
	$('#sbmt').click(function(e){
		var id 			= document.getElementById("ex-id").value;
		var ref 		= document.getElementById("ex-ref").value;
		var type		= document.getElementById("ex-type").value;
		var category	= document.getElementById("ex-category").value;
		var reason		= document.getElementById("ex-reason").value;
		
		var obj			= {
			"id":id,
			"ref":ref,
			"type":type,
			"category":category,
			"reason":reason
		};
		
		$.ajax({
			method		: "POST",
			contentType	: "application/JSON",
			data		: JSON.stringify(obj),
			url			: "/api/v1/tickets/update/exception",
			success		: function(e){	
				disableInput();
				hideSbmtButton();
				showEditBackButton();
			},
			statusCode	: {
				201	: function () {
	                alert('Parameter is Created/ Updated');
	            },
				400	: function(){
					alert('Validation Error');
				},
				403	: function(){
					alert('Permission Error');
				},
				404	: function(){
					alert('Not Found');
				}
			}
			
		});
		
		function disableInput(){
			document.getElementById("ex-category").disabled = true;
			document.getElementById("ex-type").disabled = true;
			document.getElementById("ex-ref").disabled = true;
			document.getElementById("ex-reason").disabled = true;
		}
		
		function showEditBackButton(){
			$("#edit").show();
			$("#back").show();
		}
		
		function hideSbmtButton(){
			$("#sbmt").hide();
		}
		
	});
	
}