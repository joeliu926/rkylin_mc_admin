<template src="./template.html"></template>
<script src="./index.js">

</script>

<style lang="scss">
    .userlist-content{
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
        .admin-lbox{  width:15%;  }
        .admin-rbox{width: 85%;
            .userlist-record{
                .record-text-ct{
                    padding: 24px 0 0 0;
                    .sel-title{

                    }
                    .org-name{
                        margin-top: 10px;
                    }
                }
                .userlist-edit-ct{
                    text-align: right;
                    padding:0 24px 24px 24px;
                    .el-button:hover{
                        background-color: #9083ED;
                        color: #ffffff;
                        border: 1px solid #9083ED;
                    }
                }
            }
            .userlist-list-content{

            }
            .userlist-pagination-align {
                text-align: right;
                border: none;
                margin-top: 5px;
            }
        }
    }
</style>