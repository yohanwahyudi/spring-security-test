
$(document).ready(function(){
	

	addOrUpdateAgent();
});



function getAgents(){
	$.ajax({
		type:"GET",
		url: "/api/v1/agents",
		success: function(response){
			var i = 1;
			response.forEach(function (data){
				
				var id = data.id;
				

				$("#agent-list").append(

					"<tr>"+
						//"<input type='hidden' id='agent-id' value="+data.id+" /> "+

						"<td>"+
							i+
						"</td>"+
						
						"<td>"+
							data.teamName+
						"</td>"+
						"<td>"+
							data.name+
						"</td>"+
						"<td>"+
							data.email+
						"</td>"+
						"<td>"+
							data.resource+
						"</td>"+
						"<td>"+
							data.isActive+							
						"</td>"+
						"<td>"+
							"<a href='/agent/page/edit?form=editAgent&id="+id+"'>"+"Edit"+"</a>"+
							"|"+
							"<a href='#' onclick='deleteAgent("+id+")'>"+"Delete"+"</a>"+
						"</td>"+

					"</tr>"

				);

				i++;

			});
		},
		error: function(xhr, status, error){

			var statusCode = xhr.status;
			
			if(statusCode == 404){
				$("#agent-list").append(
					"<tr>"+
						"<td colspan='5' align='center'> No Data </td>"+
					"</tr>"
				);
			}

		}
	});
	
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

		console.log('obj:');
		console.log(obj);

		$.ajax({

			type:"POST",
			contentType:"application/json",
			data: JSON.stringify(obj),
			url:"/api/v1/agent",			

			success: function (response) {

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

	});

}

function deleteAgent(id){

	var c = confirm("Agent will be deleted!");

	if(c){
    
	$.ajax({
		type: "DELETE",
		dataType: "json",
		data: JSON.stringify(id),
		url: "/api/v1/agent/"+id,

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