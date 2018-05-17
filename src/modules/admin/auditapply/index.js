
import tree from '../tree/index.vue';
import store from '../../../vuex';
import CONSTANT from '../../../common/utils/constants.js';
import jsutils from '../../../common/utils/jsutils.js';
export default {
    components: {
        tree
    },
    data() {
        return {
            dealoptions: [

                {
                    value: '0',
                    label: '待审核'
                },
                {
                    value: '1',
                    label: '已核准'
                },
                {
                    value: '2',
                    label: '已拒绝'
                },
            ],
            // actionList: [
            //     {
            //         value: '1',
            //         label: '核准'
            //     },
            //     {
            //         value: '2',
            //         label: '拒绝'
            //     },
            // ],
            dealvalue: "0",
            searchVal: "",
            pageSize: 10,
            count: 0,
            pageNo: 1,
            applyList: [],
            //filterApplyList: [],
            dialogVisible: false,
            dateValue: "",
            price: 0,
            reason: "",
            oitem: {},
            isdisable:false

        };
    },
    filters: {
        // filterPrice:function(price){
        //     return price.toFixed(2)
        // }
        filterTime(time, item) {
            console.log("------time item--------",item);
            item=item&&item.replace(/\-/g,"\/").replace(/T/," ").split(".")[0];
        console.log("------time item----9999-------",item);
            return jsutils.date2String(new Date(item), 'yyyy/MM/dd');
        }
    },
    created() {
        this.getApplyList(1);
        
        
    },
    mounted() {

    },
    methods: {
        getApplyList(num) {
           
            let _this = this;
            _this.applyList = [];
            _this.pageNo = num;
            let postData = {
                tenantId: store.state.userInfo.tenantId,
                //   pageSize:_this.pageSize, 
                //   pageNo:num,            
                //tenantId: 10096,
                clinicName: _this.searchVal,
                checkStatus: _this.dealvalue

            }
            console.log(store.state.userInfo)
            _.ajax({
                url: '/api/clinic/check/list?pageSize=' + _this.pageSize + "&pageNo=" + _this.pageNo,
                method: 'POST',
                data: postData,
                success: function (result) {
                    if (result.code == 0) {
                        console.log(result.data)
                        _this.applyList = result.data.list;
                        //_this.filterApplyList = _this.applyList
                        _this.count = result.data.count

                    } else {

                        console.log(result)
                    }

                }
            }, '', store.state.userInfo.token);
        },
        handleCurrentChange(pnum) {
            //this.pageNo=pnum;
            this.getApplyList(pnum)
        },
        currentStatus(status) {
            // let _this=this
            // this.filterApplyList=[]
            // _this.applyList.forEach((item,index)=>{
            //     if(item.checkStatus==status){
            //         _this.filterApplyList.push(item);
            //     }
            // })
            //this.dealvalue=status;
            this.getApplyList(1);
        },
        searchList() {
            this.getApplyList(1)
        },
        clearData() {
            this.reason = "";
            this.datevalue = "";
            this.price = 0;
        },
        changeStatus(item, parms) {
            this.clearData();
            item.actionVal = parms;
            this.dialogVisible = true;
            this.isdisable=false
            this.oitem = item;
        },
        confirm(item) {
            let _this = this;
            console.log(item.checkStatus)
            if (item.actionVal == 2) {
                if (_.strLength(_this.reason) < 10) {
                    _this.$message.error("请输入至少十个字");
                    return false;
                }

            }
            if (item.actionVal == 1 && _this.dateValue == "") {
                this.$message.error("请输入有效期");
                return false;
            }
           
           // console.log(postData)
            if (item.checkStatus == 1) {
                _this.isdisable=true;
                let postData={
                    clinicId:item.clinicId,
                    objection:_this.reason
                }
                console.log(postData)
                _.ajax({
                    url: '/api/clinic/refused',
                    method: 'POST',
                    data: postData,
                    success: function (result) {
                        if (result.code == 0) {
                            _this.isdisable=false;
                            _this.dialogVisible = false;
                            _this.$message.info("保存成功");
                            _this.dealvalue = '0'
                            _this.getApplyList(1)

                        } else {
                            console.log(result);
                        }

                    }
                }, '', store.state.userInfo.token);
            } else {
                _this.isdisable=true;
                 let postData = {
                status: item.actionVal,
                clinicId: item.clinicId,
                objection: _this.reason,
                deadline: _this.dateValue,
                rentAmount: _this.price,
                tenantId: store.state.userInfo.parentTenantId
            }
                _.ajax({
                    url: '/api/clinic/check',
                    method: 'POST',
                    data: postData,
                    success: function (result) {
                        if (result.code == 0) {
                            _this.isdisable=false;
                            _this.dialogVisible = false;
                            _this.$message.info("保存成功");
                            _this.dealvalue = '0'
                            _this.getApplyList(1)

                        } else {
                            console.log(result);
                        }

                    }
                }, '', store.state.userInfo.token);
            }

        },
        downLoad(url) {
            window.open(url)
        },
    }
}