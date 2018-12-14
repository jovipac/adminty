$('.icon-list-demo .outer-ellipsis').on('click',function(){
    var font_class= ($(this).children('.wi').attr('class'));
    if(!$(this).hasClass('svg-icon')){
        $('#myModal').modal('show');
        $('#icon').removeClass();
        $('#icon').addClass(font_class);
        $('#icon').addClass('fa-lg');
        $('#name').val(font_class);
        $('#code').val('<i class="'+font_class+'"></i>');
    }
});