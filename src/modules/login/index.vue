<template src="./template.html"></template>
<script src="./index.js">

</script>

<style lang="scss">
    .login{
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        position: absolute;
        height: 100%;
        .grid-content {
            width: 280px;
            margin-top: 5px;;
        }
        .login-input{
            margin: 10px 0;
        input:focus{border: 1px solid #6F61D3;}
        }
        .login-ltext{text-decoration: none;color: #a79def; font-size: 14px;}
        .login-icon{text-align: center;}
        .login-elrow {
            padding: 5px;
            flex: 1 0 100px;
        .login-submit{
            width: 100%;
            background-color:#9186e0 ;
            border: none ;
            color: white;
        }
        .login-submit:hover{
            background-color: #6F61D3 ;
            color: white;
        }
        }
        .login-left-content{
            flex: 1 1 150px;
            flex-direction: column;
        }
        .item-space{
            flex: 3 1 200px;
        }

        .login-right-img{
            height: 100%;
            flex: 0 0 576px;
            background-image: url("../../common/img/login-right.jpg");
        }
        @media screen and (max-width: 700px) {
            .login-right-img{display: none;}
        }
    }
    .login-flex{
        justify-content: center;
        display: table;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content:center;
    }

</style>