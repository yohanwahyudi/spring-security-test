/**
 * Parameters 
 */

$(document).ready(function(e){
	
	addOrUpdateParam();
	
	$("#edit").click(function(){
		enableInput();
		$("#edit").hide();
		$("#sbmt").show();
	});
	
	function enableInput(){
		document.getElementById("param-group").disabled = false;
		document.getElementById("param-subgroup").disabled = false;
		document.getElementById("param-name").disabled = false;
		document.getElementById("param-value").disabled = false;
	}
});

$.ajax({
	
	method: 'GET',
	dataType: 'json',
	url: '/api/v1/params?fields=all',
	success: function(data){
		
		$('#paramsDataTable').dataTable({
			
			//Calling DataTable function
            //destroy: true
            modal: true,
            //aaData: response.data,
            retrieve: true,
            paging: true,
            sort: true,
            searching: true,
            //scrollY: 600,  // this will change layout
            data: data,   //pasing data 
            columns: [   // passing column 
            	
            	{ 'data': 'id'},
        	    { 'data': 'group'},
        	    { 'data': 'subGroup' },
        		{ 'data': 'name' },
        		{ 'data': 'value' },
        		{
                    'mRender': function (data, type, row,meta) {
                     var id = row.id;                                                                  
                     return '<a href="/params/page/edit?form=editParam&id='+id+'" type="buttonclick" class="button">Edit</a>' + '|' 
					   + '<a href="#" onclick="deleteById(' + id + ')">Delete</a>';
                      }

                }
            	
            ]
			
		});
		
	}		
});

function addOrUpdateParam(){
	
	$("#sbmt").click(function(e){
		
		var paramId = document.getElementById("param-id").value;
		var paramGroup = document.getElementById("param-group").value;
		var paramSubGroup = document.getElementById("param-subgroup").value;
		var paramName = document.getElementById("param-name").value;
		var paramValue = document.getElementById("param-value").value;
		
		var obj = {
				"id" 		: paramId,
				"group"		: paramGroup,
				"subGroup"	: paramSubGroup,
				"name"		: paramName,
				"value"		: paramValue
		};
		
		$.ajax({
			
			method		:	"POST",
			contentType	:	"application/JSON",
			data		: 	JSON.stringify(obj),
			url			:	"/api/v1/params",			
			succes		: 	function(e){
				
			},
			statusCode	: {
				201	: function () {
					disableInput();
					hideSbmtButton();
					showEditBackButton();
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
			document.getElementById("param-group").disabled = true;
			document.getElementById("param-subgroup").disabled = true;
			document.getElementById("param-name").disabled = true;
			document.getElementById("param-value").disabled = true;
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

function deleteById(id){
	
	var c = confirm('Param will be deleted!');
	
	if(c){
		
		$.ajax({
			
			method		: 	"DELETE",
			dataType	:	"json",
			contentType	:	"application/JSON",
			data		: 	JSON.stringify(id),	
			url			:	"/api/v1/params/"+id,
			success		:	function(e){
				
			},
			statusCode	:	{
				200	: function(e){
					alert('Param is deleted!');
					location.reload(true);
				},
				400	: function(e){
					alert('Not Found!');
				}				
			}		
		});
		
		return true;
		
	} else{
		return false;
	}
	
}
	