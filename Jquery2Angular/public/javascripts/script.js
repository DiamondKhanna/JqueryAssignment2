var myApp=angular
			.module("myModule",[])
			.controller("myController",function($scope,$http){
				$scope.search_value;
				var start=0;

				$scope.next=function()
				{
					start=start+20;
					$scope.read(start);
				}

				$scope.previous=function()
				{
					if(start!=0)
					{
						start=start-20;	
						$scope.read(start);
					}
					
				}

				$scope.read=function(start)
				{
					if($scope.search_value!='')
					{
						$http.get('http://localhost:8081/Employees/?_start='+start+'&_limit=20&q='+$scope.search_value).then( function(response) {
     					$scope.employees = response.data; 
   					});
					}
					if($scope.search_value==undefined)
					{
						$http.get('http://localhost:8081/Employees/?_start='+start+'&_limit=20').then( function(response) {
     					$scope.employees = response.data; 
     				});
					}
					
				};
				$scope.delete=function(id,index)
				{
						var choice=confirm("Do you really want to delete?")
						if(choice==true)
						{
							$http.delete('http://localhost:8081/Employees/'+id).then(
								function(response)
								{
									alert("RECORD DELETED SUCCESSFULLY");
									$scope.employees.splice(index, 1);

								});									
						}
				};
				$scope.update=function()
				{
					
				};
				$scope.create=function()
				{
					console.log('hewyy');
					$http.get('http://localhost:8081/Employees').then(function(response)
					{
						var d=response.data;
						var id=d[d.length-1].emp_id+1;
						var data={
							'emp_id':id,
							'name':,
							'age':,
							'gender':,
							'email':,
							'contact':,
							'DOB':
						}
						
					});
				};
			});