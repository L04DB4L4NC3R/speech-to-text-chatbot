$(document).ready(()=>{

    $("#bn").on('click',(e)=>{

        e.preventDefault();
        $.post('/',{question:$("#q").val()},(data)=>{
            $("#q").val(data);
        });

    });


    $("#bttn").on('click',(e)=>{
        e.preventDefault();
        $("#q").val('');
    });

});
