<template src="./template.html"></template>
<script src="./index.js">

</script>

<style lang="scss">
    .audit-content{
        .f-14{
            font-size: 14px;
            color: #999999;
        }
        .f-16{
            font-size: 16px;
            color: #333333;
        }
        .fram-box{
            height: 100%; display: inline-block;box-sizing: border-box; padding:12px; vertical-align: top;
        }
        .audit-lbox{  width:15%; }
        .audit-rbox{ width: 85%; 
            .out-box-border{
                box-shadow: 2px 2px 10px #e8e8e8;
                border-radius: 4px;
                .audit-text-ct{
                    padding: 24px 0 0 0;
                    border-bottom: 2px solid #3542f1;
                    p{
                        padding: 5px 0
                    }
                }
                .detail-edit-ct{
                    margin-top: 10px;
                    padding: 10px;
                    background-color: #edf7ff;
                    .msg-l{
                        display: inline-block;
                        width: 50%;
                        box-sizing: border-box;
                    }
                    .msg-r{
                        display: inline-block;
                        width: 49%;
                        box-sizing: border-box;
                        text-align: right;
                        .line-red{
                            color: #cc0000;
                        }
                    }
                }
                .detail-search{
                    margin-top: 10px;
                    padding: 10px;
                    text-align: right;
                    position: relative;
                    .el-icon-search{
                        position: absolute;
                        width: 35px;
                        height:36px;
                        right: 8px;
                        bottom: 10px;
                        text-align: center;
                        color: #bfcbd9;
                        transition: all .3s;
                        cursor: pointer;
                    }
                    .el-icon-search::before{
                        line-height: 36px;
                    }
                }
                .customer-waiting-content{
                    margin: 24px 12px;
                    .customer-table{
                        color: #999999;
                        width:100%;
                        border: 1px solid #eaeaea;
                        th{
                            background-color: #F7F7F7;
                            padding: 10px 24px;
                            font-size: 16px;
                            color: #333333;
                        }
                        tr{
                            width: 100%;
                        }
                        tr.tr-end{
                            border-bottom: 1px solid #eaeaea;
                        }
                        td{
                            padding: 10px 24px;
                            font-size: 14px;
                            .nav-user-img {
                                height: 32px;
                                width: 32px;
                                border-radius: 30px;
                            }
                            .wx-t {
                                margin: 5px;
                                display: inline-block;
                            }
                            .eye-img{
                                vertical-align: middle;
                                cursor: pointer;
                            }
                            .start-cst-btn{
                                background: #9083ED;
                                color: #ffffff;
                                border-color: #9083ED;
                            }
                            .start-cst-btn:hover{
                                border-color: #9083ED;
                            }
                        }
                    }
                }
            }
        }
    }
</style>