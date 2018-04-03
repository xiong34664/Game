function $(id) {
    return document.getElementById(id);
}
window.onload=function () {

    var map=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var keyCode;
    window.onkeydown = function(e) {
        if (!e)
            e = window.event;
        if (document.all) {
            keyCode = e.keyCode;
        } else {
            keyCode = e.which;
        }
        // ← 或 A
        if (keyCode == 37 || keyCode == 65) {
            $("keys").innerHTML="←";
            a()
        }
        // ↑ 或 W
        if (keyCode == 38 || keyCode == 87) {
            $("keys").innerHTML="↑";
            w()
        }
        // → 或 D
        if (keyCode == 39 || keyCode == 68) {
            $("keys").innerHTML="→";
            d()
        }
        // ↓ 或 S
        if (keyCode == 40 || keyCode == 83) {
            $("keys").innerHTML="↓";
            s()
        }
    }
    rounds()
    rounds()
    show();
    function judge() {
        if( find()){
            return true;
        }
        for(var i=0;i<map.length;i++){
            var num1=[];
            var num2=[];
            for(var j=0;j<map[i].length;j++){
                num1.push(map[i][j]);
                num2.push(map[j][i]);
            }
            if(alike(num1)||alike(num2)){
                return true;
            }
        }
        return false;

    }
    function alike(arr) {
        for (var i=0;i<arr.length-1;i++){
            if (arr[i] == arr[i+1]) {
                return true;
            }
        }
        return false;

    }
    function find() {
        for (var i=0;i<map.length;i++)
            for(var j=0;j<map[i].length;j++){
                if(map[i][j]==0){
                    return true;
                }
            }
        return false;
    }
    function a() {
        for (var i=0;i<map.length;i++){
            var arr=[];
            var num=[];
           for(var j=0;j<map[i].length;j++){
               num.push(map[i][j]);
           }
           arr=range(num);
           for(var n=0;n<arr.length;n++){
               map[i][n]=arr[n];
           }
        }
        rounds()
        show();

    }
    function d() {
        for (var i=0;i<map.length;i++){
            var arr=[];
            var num=[];
            for(var j=map[i].length-1;j>=0;j--){
                num.push(map[i][j]);
            }
            arr=range(num);
            for(var n=0;n<arr.length;n++){
                map[i][3-n]=arr[n];
            }
        }
        rounds()
        show();

    }
    function s() {
        for (var i=0;i<map.length;i++){
            var arr=[];
            var num=[];
            for(var j=map[i].length-1;j>=0;j--){
                num.push(map[j][i]);
            }
            arr=range(num);
            for(var n=0;n<arr.length;n++){
                map[3-n][i]=arr[n];
            }
        }
        rounds()
        show();
    }
    function w() {
        for (var i=0;i<map.length;i++){
            var arr=[];
            var num=[];
            for(var j=0;j<map[i].length;j++){
                num.push(map[j][i]);
            }
            arr=range(num);
            for(var n=0;n<arr.length;n++){
                map[n][i]=arr[n];
            }
        }
        rounds()
        show();
    }
    function show() {
        var str="";
        var ch=""
        var num=0;
        for (var i=0;i<map.length;i++)
            for (var j=0;j<map[i].length;j++){
                ch=map[i][j]==0?"":map[i][j];
                if(ch){
                    str+="<li class='col"+map[i][j].toString(2).length%3+"'>"+ch+"</li>" ;
                }else{
                    str+="<li>"+ch+"</li>" ;
                }

            }
        $("box").children[0].innerHTML=str;
        if(!judge()){
            $("keys").innerHTML="已经移不动了,游戏结束";
            return null;
        }
    }
    function range(arr) {
        var flag=arr.length;
        var array=arr
        for(var i=0;i<flag;i++){
            if(array[i]==0){
                array.splice(i, 1)
                array.push(0);
                i--;
                flag--;
            }
        }
        for(var j=0;j<flag-1;j++){
            if(array[j]==array[j+1]){
                array[j]=array[j]*2;
                array.splice(j+1, 1)
                array.push(0);
            }
        }
        return array;
    }

    function rounds() {     //生成随机位置  和随机2/4
        var val=0;
        if(!find()){
            return
        }
        var row=Math.round(Math.random()*3);
        var col=Math.round(Math.random()*3);
        if(map[row][col]==0){
            if(Math.random()>0.5){
                val=2;
            }else{
                val=4
            }
            map[row][col]=val;
        }else{
            rounds()
        }
    }

}