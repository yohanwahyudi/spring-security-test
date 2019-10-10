/**
 * Agent 
 */

$(document).ready(function () {
	
	addOrUpdateAgent();
	
	$("#edit").click(function(){
		enableInput();
		$("#edit").hide();
		$("#sbmt").show();
	});
	
	function enableInput(){
		document.getElementById("agent-orgname").disabled = false;
		document.getElementById("agent-division").disabled = false;
		document.getElementById("agent-team").disabled = false;
		document.getElementById("agent-name").disabled = false;
		document.getElementById("agent-email").disabled = false;
		document.getElementById("agent-resource").disabled = false;
		document.getElementById("agent-isactive").disabled = false;
	}
});

$.ajax({
	
	url: '/api/v1/agents',
	method: 'GET',
	dataType: 'json',
	success: function(data){
		
		$('#agentsDataTable').dataTable({
			
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
        	    { 'data': 'teamName'},
        	    { 'data': 'name' },
        		{ 'data': 'email' },
        		{ 'data': 'resource' },
        		{ 'data': 'isActive' },
        		{
                    'mRender': function (data, type, row,meta) {
                     var id = row.id;                                                                  
                     return '<a href="/agents/page/edit?form=editAgent&id='+id+'" type="buttonclick" class="button">Edit</a>' + '|' 
					   + '<a href="#" onclick="deleteById(' + id + ')">Delete</a>';
                      }

                }
            	
            ]
			
		});
		
	}		
});
	


function deleteById(id){
	
	var c = confirm("Agent Will be deleted!");
	
	if(c){
		
		$.ajax({
			
			type: "DELETE",
			dataType: "json",
			data: JSON.stringify(id),
			url: "/api/v1/agents/"+id,
			success: function(response){

			},
			statusCode: {
				200: function(){
					alert('Agent is deleted');
					location.reload(true);
				},
				400: function(){
					alert('Not Found');
				}
			}
			
		});
		
		return true;
	} else {
		return false;
	}
		
}

function addOrUpdateAgent(){

	$("#sbmt").click(function(e){

		var agentId = document.getElementById("agent-id").value;
		var agentTeam = document.getElementById("agent-team").value;
		var agentName = document.getElementById("agent-name").value;
		var agentEmail = document.getElementById("agent-email").value;
		var agentResource = document.getElementById("agent-resource").value;
		var agentIsActive = document.getElementById("agent-isactive").value;
		var agentOrgName = document.getElementById("agent-orgname").value;
		var agentDivision = document.getElementById("agent-division").value;

		var obj = {
			"id":agentId,
			"teamName":agentTeam,
			"name":agentName,
			"email":agentEmail,
			"resource":agentResource,
			"isActive":agentIsActive,
			"division":agentDivision,
			"orgName":agentOrgName
		};

		$.ajax({

			type:"POST",
			contentType:"application/json",
			data: JSON.stringify(obj),
			url:"/api/v1/agents",			

			success: function (response) {
				disableInput();
				hideSbmtButton();
				showEditBackButton();
            },
            statusCode: {
                201: function () {
                    alert('Agent is Created/ Updated');
                },
                400: function () {
                    alert('Validation Error');

				},
				403: function () {
                    alert('Permission Error');

                },
                404: function () {
                    alert('Not Found');

                }
            }

		});
		
		function disableInput(){
			document.getElementById("agent-orgname").disabled = true;
			document.getElementById("agent-division").disabled = true;
			document.getElementById("agent-team").disabled = true;
			document.getElementById("agent-name").disabled = true;
			document.getElementById("agent-email").disabled = true;
			document.getElementById("agent-resource").disabled = true;
			document.getElementById("agent-isactive").disabled = true;
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