hexo.extend.filter.register('after_post_render', function(data){

    data.content = data.content.replace(
        /<(h[1-6])><span id="(.*?)">(.*?)<\/span><\/\1>/g,
        function(match, tag, id, text){

            return '<' + tag + ' id="' + id + '">' + text + '</' + tag + '>';

        }
    );

});