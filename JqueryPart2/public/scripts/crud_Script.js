//------------------- READ PART-----------------//
var l=0;
var empID;
$(document).ready(function(){
  $(".abcd").click(function(){
    var table=document.getElementById("myTable");
    for(var row_number=table.rows.length-1;row_number>0;row_number--)
    {
       table.deleteRow(row_number);
    }
    l=0;
    var a=$(".textClass").val();
    $.ajax({
            type:'GET',
            url: 'http://localhost:8081/Employees',      //'a' contains value contained in text box
            dataType:'json',
            success: function(jsonData)
            {
              objColln = jsonData;
              $(objColln).each(function(i,val)
              {
                $.each(val,function(k,v)
                {
                  if(l<objColln.length )
                  {
                    if(objColln[l].name.includes(a))
                    {  
                      var row = table.insertRow();
                      var cell1 = row.insertCell(0);
                      var cell2 = row.insertCell(1);
                      var cell3 = row.insertCell(2);
                      var cell4 = row.insertCell(3);
                      var cell5 = row.insertCell(4);
                      var cell6 = row.insertCell(5);
                      var cell7 = row.insertCell(6);
                      ///  var cell8 = row.insertCell(7);
                      var cell8 = row.insertCell(7);
                      var cell9 = row.insertCell(8);
                             
                      cell1.innerHTML = objColln[l].emp_id;
                      cell2.innerHTML = objColln[l].name;
                      cell3.innerHTML = objColln[l].age;
                      cell4.innerHTML = objColln[l].gender;
                      cell5.innerHTML = objColln[l].company;
                      cell6.innerHTML = objColln[l].email;
                      cell7.innerHTML = objColln[l].phone;
                      // cell8.innerHTML = objColln[l].quote;
                      cell8.innerHTML = objColln[l].DOB;

                      var id_4_buttons=objColln[l].id;
                      cell9.innerHTML = '<button type="button" class="editbtn" id="'+id_4_buttons+'" data-toggle="modal" href="#editModal" >EDIT</button><br><br>'+'<button type="button" class="deletebtn" id="'+id_4_buttons+'">DELETE</button><br>';
                    }
                  }
                    l=l+1;
                });
            });

//-----------start delete part ---------------------------//

      $("#myTable").find('tr').click(function(){
       $(".deletebtn").click(function(){
         var id=$(this).attr('id');
         var choice=confirm("Do you want to delete the record permanently?");
          if(choice==true)
          {
           $.ajax({
                    type:'DELETE',
                    url: 'http://localhost:8081/Employees/'+id,   
                    dataType:'json',
                    success: function(jsonData)
                    {
                      alert("Record deleted successfully");
                    }
                    ,
                    error: function()
                    {
                      alert('Error in Loading');
                    }
                  });

           $('#'+id).closest('tr').remove();  // removes the row to be deleted dynamically
          }

        });
      }); 
//-------------end delete part ------------------//


//------------start update part ----------------//
                   $(".editbtn").click(function(){                                        //editbtn begin
                           var idUpdate=$(this).attr('id');
                           console.log(idUpdate);
                            var empid;
                            l=0;
                            $(jsonData).each(function(i,val){       //func begins
                               $.each(val,function(k,v){
                                   if(l<jsonData.length)
                                   {
                                       if(jsonData[l].id==idUpdate)
                                       {
                                           empid=jsonData[l].emp_id;
                                           $('#inputEditName').val(jsonData[l].name);
                                           $('#inputEditAge').val(jsonData[l].age);
                                           $('#inputEditGender').val(jsonData[l].gender);
                                           $('#inputEditCompany').val(jsonData[l].company);
                                           $('#inputEditEmail').val(jsonData[l].email);
                                           $('#inputEditPhone').val(jsonData[l].phone);
                                           $('#inputEditDate').val(jsonData[l].DOB);
                                           
                                       }
                                   }
                                   l=l+1;
                               });
                           });                                    //func ends

                           $("#updatebtn").one('click',function(){      //updatebtn begins
                               var updateData={
                                      "emp_id":empid,
                                      "name": $("#inputEditName").val(),
                                       "age": $("#inputEditAge").val(),
                                       "gender": $("#inputEditGender").val(),
                                       "company":$("#inputEditCompany").val(),
                                       "email": $("#inputEditEmail").val(),
                                       "phone":$("#inputEditPhone").val(),
                                       "DOB": $("#inputEditDate").val()
                                   };
                                   console.log(updateData);
                                   $.ajax({
                                       type:'PUT',
                                       url: 'http://localhost:8081/Employees/'+idUpdate,    
                                       dataType:'json',
                                       data:JSON.stringify(updateData),
                                       contentType:"application/json",
                                       success: function(jsonData)
                                       {
                                           alert("Successfully Updated");
                                       },
                                       error: function()
                                       {
                                           alert("Error Occurred!!")
                                       }
                                   });
                           });                                        //updatebtn ends
                       });                                                                       //end editbtn
                   //--------end update part------//
      },  // success of read ends
                  error: function()
                  {
                   alert('Error ...cant connect!!!!!!!!!');
                  }
               });  //----------ajax of read ends

     });    // -------read function ends

 //------------CREATE PART--------------------//
$('#closebtn').click(function()
  {
     $("#myModal").find('form').trigger("reset");
  });

 $("#sendbtn").click(function()
 {
    $.ajax({
            type:'GET',
            url: 'http://localhost:8081/Employees',      
            dataType:'json',
            success: function(jsonData)
            {
               empID=jsonData[jsonData.length-1].emp_id+1;
               console.log(empID);
               var data={
                  "emp_id": empID,
                  "name": $("#inputName").val(),
                  "age": $("#inputAge").val(),
                  "gender": $("#inputGender").val(),
                  "company":$("#inputCompany").val(),
                  "email": $("#inputEmail").val(),
                  "phone":$("#inputPhone").val(),
                  "DOB": $("#inputDate").val()
                }

                 $.ajax({
                      type:'POST',
                      url: 'http://localhost:8081/Employees',   
                      dataType:'json',
                      data:JSON.stringify(data),
                      contentType:"application/json",
                      success: function(jsonData)
                      {
                        alert("data has been added successfully");
                       // $('#myModal').modal('hide');
                       $("#myModal").find('form').trigger("reset");
                       

                      },
                      error: function()
                      {
                        alert('Error in Loading');
                      }
                });
            }
    });

});   //-------------end create part--------------//

 
});    // end on load function--------------//