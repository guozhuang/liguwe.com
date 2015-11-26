$(function(){

    $("#booksAndNotes ul li").hover(function(){
        $(this).addClass("hoverGreen");
        $(this).find("a").css({"color":"white"});
    },function(){
        $(this).removeClass("hoverGreen");
        $(this).find(".bookTitle").add(".noteTitle").css({"color":"#4a4a4a"});
        $(this).find(".delete").add(".edit").css({"color":"white"});
    });

    $(".icons .fa-book").hover(function(){
        $(".inputText .searchBooks").show();
        $(".inputText .searchNotes").hide();
        $(this).css("color","#36BD64");
        $(".icons .fa-file-text").css("color","#878787");
        $(".noteList").addClass("hide");
        $(".bookList").removeClass("hide");
    });
    $(".icons .fa-file-text").hover(function(){
        $(".inputText .searchNotes").show();
        $(".inputText .searchBooks").hide();
        $(this).css("color","#36BD64");
        $(".icons .fa-book").css("color","#878787");
        $(".noteList").removeClass("hide");
        $(".bookList").addClass("hide");
    });
    //fixed
    $(".bookList").add(".noteList").height($(window).height()-$(".searchAndAdd").height());

    //编辑选项

    $(".fa-edit").click(function(e){
        e.preventDefault();
        $(".topEditorBar").show();
    });

    $(".editCon .save").click(function(e){
        e.preventDefault();
        $(".topEditorBar").hide();
    });

});


var editBar = document.querySelector(".editCon");