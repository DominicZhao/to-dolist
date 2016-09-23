/**
 * Created by Administrator on 2016/9/8.
 */
var anniu=document.getElementById("inlineCheckbox1");
angular.module("myapp",[])
    .controller("list",["$scope","$filter",function($scope,$filter){
        $scope.dolist=localStorage.messages?JSON.parse(localStorage.messages):[];
       /* console.log($scope.dolist);*/
        /*记录*/
        $scope.conentid=$scope.dolist.length?$scope.dolist[0].id:null;
        $scope.conentnei=$scope.dolist.length?$scope.dolist[getid($scope.conentid)]:null;
        /*添加列表*/
        $scope.addlie=function(){
            $scope.isshow=true;
            var temp=Maxid($scope.dolist);
            var obj={
                id:temp+1,
                name:"新建列表",
                son:[]
            };
            $scope.dolist.push(obj);
            localStorage.messages=JSON.stringify($scope.dolist)
        };


        /*删除*/
        $scope.shanchu=function(id){
            angular.forEach($scope.dolist,function(val,index) {
                if (id == val.id) {
                    $scope.dolist.splice(index, 1);
                    localStorage.messages=JSON.stringify($scope.dolist)
                }
            })
        };
        $scope.geizhi=function(){
            localStorage.messages=JSON.stringify($scope.dolist)
        };
        /*列表映射*/
        $scope.focus=function(id){
            $scope.isshow=true;
            $scope.conentid=id;
            $scope.conentnei=$scope.dolist.length?$scope.dolist[getid($scope.conentid)]:null;
        };
        /*添加内容*/
        $scope.addnei=function(){
            var id=Maxid($scope.conentnei.son);
            var obj={id:id+1,name:"新建目录"};
            $scope.conentnei.son.push(obj);
            localStorage.messages=JSON.stringify($scope.dolist);
        };
        /*修改内容*/

        $scope.conBlur=function(){
            localStorage.messages=JSON.stringify($scope.dolist);
        }

        /*删除内容*/
        $scope.removeCon=function(id){
            for(var i=0;i<$scope.conentnei.son.length;i++){
                if(id==$scope.conentnei.son[i].id){
                    $scope.conentnei.son.splice(i,1);
                }
            }

            localStorage.messages=JSON.stringify($scope.dolist);
        };
        /*已完成*/
        $scope.wancheng=localStorage.wancheng?JSON.parse(localStorage.wancheng):[];
        /*console.log($scope.wancheng)*/
        $scope.done=function(id){
            var index=getid(id,$scope.conentnei.son);
            var obj=$scope.conentnei.son[index];
            obj.id=Maxid($scope.wancheng)+1;
            $scope.wancheng.push(obj);
            $scope.conentnei.son.splice(index,1)
            localStorage.wancheng=JSON.stringify($scope.wancheng);
            localStorage.messages=JSON.stringify($scope.dolist);
        };
        /*删除已完成*/
        $scope.removedone=function(id){
            angular.forEach($scope.wancheng,function(val,index) {
                if (id == val.id) {
                    $scope.wancheng.splice(index, 1);
                    localStorage.wancheng=JSON.stringify($scope.wancheng)
                }
            })
        };
        /*开关*/
        $scope.isshow=true;
        /*监测*/
        $scope.search='';
        $scope.$watch("search",function(){
            var str=$filter("filter")($scope.dolist,$scope.search);
            $scope.conentnei=$scope.dolist[getid(str[0].id)]
        })
        /*判断最大值*/
        function Maxid(arr){
            if(arr.length>0){
                var temp=arr[0].id;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id>temp){
                        temp=arr[i].id
                    }
                }
            }else{
                temp=0;
            }
            return parseInt(temp);
        }

        function getid(id,arr){
            var arr=arr||$scope.dolist;
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    return i
                }
            }
        }
    }]);
/**********************************************************************************************************/


$(function(){
    $(".span1").focus(function(){
        $(this).css({"background":"#fff","color":"#333"})
    }).blur(function(){
        $(this).css({"background":"#000","color":"#fff"})
    });
    var flg=true;
    $(".icon-caidanshu").click(function(){
        if(flg==true){
            $(".miue").css("height",200);
            flg=false;
        }else if(flg==false){
            $(".miue").css("height",0);
            flg=true;
        }

    });
    $(".bei").click(function(){
        $(".con-right").css("background",$(this).css("background"));
        $(".listcon input").css("background",$(this).css("background"));
    });
    $(".zise").click(function(){
        console.log($(this).css("color"))
        $("h2").css("color",$(this).css("color"));
        $(".add-con").css("color",$(this).css("color"));
        $(".listcon input").css("color",$(this).css("color"));
        $(".biaoqian").css("color",$(this).css("color"));
        $(".remove").css("color",$(this).css("color"));
    })
});