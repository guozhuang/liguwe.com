$(function(){


    var noteBookList = $(".noteBookList"),
        notesList = $(".noteList"),
        navCon = $(".nav-con");
    $(".noteBooks-stack-a").each(function(){
        $(this).on("click",function(e){
            e.preventDefault();
            var parent = $(this).parent(),
                span = $(this).find("span");
            if(parent.hasClass("noteBooks-stack-open")){
                span.removeClass("fa-chevron-down").addClass("fa-chevron-right");
                parent.addClass("noteBooks-stack-close").removeClass("noteBooks-stack-open");
            }
            else if(parent.hasClass("noteBooks-stack-close")){
                span.removeClass("fa-chevron-right").addClass("fa-chevron-down");
                parent.addClass("noteBooks-stack-open").removeClass("noteBooks-stack-close");
            }
        });
    });

    //显示滚动条

    noteBookList.height($(document).height()-50);
    notesList.height($(document).height()-50);
    $(".content-body").height($(document).height()-50);



    noteBookList.find("a").not(".noteBooks-stack-a").each(function(){
        $(this).click(function(e){
            e.preventDefault();
            navCon.animate({"margin-left":-navCon.width()/2},"normal",function(){});
        });
    });
    $(".notes-top .goBack a").click(function(e){
        e.preventDefault();
        navCon.animate({"margin-left":0},"normal",function(){});
    })
});