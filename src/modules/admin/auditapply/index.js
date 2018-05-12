
import tree from '../tree/index.vue';
import store from '../../../vuex';
import CONSTANT from '../../../common/utils/constants.js';
import jsutils from '../../../common/utils/jsutils.js';
export default {
    components: {
        tree},
    data () {
        return {
            dealoptions:[
               
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
            actionList:[
                {
                    value: '1',
                    label: '核准'
                },
                {
                    value: '2',
                    label: '拒绝'
                },
            ],
            dealvalue: "0",
            searchVal:"",
            pageSize:10,
            count:0,
            pageNo:1,
            applyList:[],
            filterApplyList:[],
            dialogVisible: false,
            datevalue:"",
            price:0,
            reason:"",
            oitem:{}
            
        };
    },
    filters:{
        // filterPrice:function(price){
        //     return price.toFixed(2)
        // }
        filterTime(time,item){
           return jsutils.date2String(new Date(item.createTime),'yyyy-MM-dd');
        }
    },
    created() {
        this.getApplyList();
    },
    mounted(){

    },
    methods: {
       getApplyList(){
           console.log('_this.dealvalue',this.dealvalue)
           let _this=this;
           let postData={
              //tenantId:store.state.userInfo.tenantId,
              pageSize:_this.pageSize, 
              pageNo:_this.pageNo,            
              tenantId:10098,
              clinicName:_this.searchVal,
              checkStatus:_this.dealvalue

           }
           _.ajax({
            url: '/oms/api/clinic/check/list',
            method: 'POST',
            data: postData,
            success: function (result) {
                if(result.code==0){
                    console.log(result)
                    _this.applyList=result.data.list;
                    _this.filterApplyList=_this.applyList                   
                    _this.count=result.data.count
                                    
                }else{
                    console.log(result)
                }

            }
        });
       },
       handleCurrentChange(pnum){
        this.pageNo=pnum;
        this.getApplyList()
       },
       currentStatus(status){
        // let _this=this
        // this.filterApplyList=[]
        // _this.applyList.forEach((item,index)=>{
        //     if(item.checkStatus==status){
        //         _this.filterApplyList.push(item);
        //     }
        // })
        //this.dealvalue=status;
        this.getApplyList();
       },
       searchList(e){
         this.getApplyList()
       },  
       changeStatus(item,parms){
            item.actionVal =parms;
            this.dialogVisible=true;
            this.oitem=item;
       },
      confirm(item){
          let _this=this; 
          console.log(item.actionVal)      
         let postData={
            status:item.actionVal,
            clinicId:item.clinicId,
            objection:_this.reason,
            deadline:_this.datevalue,
            rentAmount:_this.price
         }
         _.ajax({
          url: '/oms/api/clinic/check',
          method: 'POST',
          data: postData,
          success: function (result) {
              if(result.code==0){
                  //_this.dialogVisible=false;
                                  
              }else{
                  console.log(result);
              }

          }
      });
      },
      downLoad(url){
          window.open(url)       
      },   
    }
}