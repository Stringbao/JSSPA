
export default {
    appendToContainer(container,html){
        $(container).html("").append($(html));
    }
}