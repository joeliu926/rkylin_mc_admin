<template src="./template.html"></template>
<script src="./index.js">

</script>

<style lang="scss">
    .nav-admin-content{
        .el-popover {
            width: 600px;
            transform-origin: right center 0px;
            z-index: 2016;
            position: absolute;
            top: 200px;
            left: 200px;
        }
        line-height: 60px;
        height: 60px;
        color: white;
        box-sizing: border-box;
        padding: 0 30px;
        .el-col:first-child{
            text-align: left;
        }
        >.el-col:last-child{
            text-align: right;
        }
        .el-col:nth-child(2){
            text-align: center;
        }
        .clinic-name{font-size: 12px;height: 20px;overflow: hidden;  text-overflow: ellipsis;white-space:nowrap;width: 140px;text-align: left;}
        .el-dropdown-link{
            color: white;
            font-size: 16px;
        }
        .nav-back-icon{
            font-size: 24px;
            margin-right: 20px;
            text-align: right;
        }
        .nav-home-icon{
            font-size: 30px !important;
            margin-right: 25px;
            text-align: right;
        }
        .nav-logo{
            margin-left: 30px;
        }
        .nav-text{
            line-height: 40px;
            height: 40px;
            font-size: 16px;
            vertical-align: super;
        }
        .nav-logo:before{
            content: url("../../../common/img/logo.png");
            position: relative;
            top: 5px;
            right: 10px;
        }
        .user-img{float:right;
            margin-right: 10px;
            margin-top: 10px;
            height:50px}
        .nav-select-list{

            cursor: pointer;
            margin-top: 10px;
        }

        .alert-content{
            .item-title{
                background-color: #dfe6ec;padding-left: 20px
            }
            .item-data{
                padding-left: 20px;line-height: 40px;cursor: pointer;
                color:#35373c;
            }
            .item-data:hover{
                background-color: #9083ed;
                color:white;

            }
            line-height:24px;height:240px; width:200px;background-color:#fff;position:absolute;right:-20px;z-index:100;margin-top:55px;color: #000000;
            .alert-top{
                height:70px;
                .alert-user-img{
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                    margin-left: 10px;
                    margin-top: 10px;
                }
            }
        }
    }



    .nav-user-img{
        height: 40px;
        width: 40px;
        border-radius: 30px;
    }
    .nav-img-content{
        border-radius: 50%;
        height: 40px;
        width: 40px;
        float: right;
        position: relative;
        top:10px;
    }
    .nav-content-gradient{
        background: -moz-linear-gradient(left, #4962D4 0%, #4F3CCA 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#4962D4), color-stop(100%,#4F3CCA));
        background: -webkit-linear-gradient(top, #4962D4 0%,#4F3CCA 100%);
        background: -o-linear-gradient(left, #4962D4 0%,#4F3CCA 100%);
        background: -ms-linear-gradient(left, #4962D4 0%,#4F3CCA 100%);
        background: linear-gradient(to right,#4962D4 0%,#4F3CCA 100%);
    }
</style>