<template src="./template.html"></template>
<script src="./index.js">

</script>

<style lang="scss">
    .apply-content{
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
        .apply-lbox{  width:15%;  }
        .apply-rbox{width: 85%;
            .out-box-border{
                box-shadow: 2px 2px 10px #e8e8e8;
                border-radius: 4px;
                .apply-text-ct{
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
                .edit-content{
                    padding: 20px 0;
                    .row-ct {
					padding: 10px;
					.row-item {
						margin: 0 20%;
						width: 500px;
						.row-item-title {
							display: inline-block;
							width: 150px;
                            text-align: right;
                            padding-right: 20px;
						}
                        .v-a-top{
                            vertical-align: top;
                        }
                        .year{
                            color: #999999;
                        }
						.row-item-value {
							width: 200px;
						}
						.logo-img {
                            margin-top:-6px;
							display: inline-block;
							width: 140px;
							height: 140px;
							border: 1px dashed #bfcbd9;
							border-radius: 6px;
							cursor: pointer;
							background-position: center center;
							background-repeat: no-repeat;
							background-size: 100%;
						}
						.i-close-p {
							position: absolute;
							top: -5px;
							right: -5px;
							border-radius: 15px;
							cursor: pointer;
						}
						.el-icon-pa-close:before {
							color: #cc0000;
						}
						.goodat {
							display: inline-block;
							margin-right: 10px;
							background: #9287EB;
							padding: 3px 10px;
							border-radius: 4px;
							color: #ffffff;
							position: relative;
						}
					}
				}



                }
            }
  
        }
    }
    .line-row-red{
        border-left: 2px solid #cc0000;
        padding: 6px 2px;
    }
    .line-row-tra{
        border-left: 2px solid transparent;
        padding: 6px 2px;
    }
    .map-ct{
        width: 80%;
        height: 400px;
        margin: auto
    }
</style>