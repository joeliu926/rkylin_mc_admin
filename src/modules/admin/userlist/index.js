/**
 * Created by JoeLiu on 2017-9-15.
 */
/*import AdInput from 'adminUI/components/admin-input.vue';*/
import tree from '../tree/index.vue';
import store from '../../../vuex';
export default {
    components: {
        tree},
    data () {
        return {
            pageNo: 1,
            pageSize: 15,
            count:1,
            userlist:[],
            searchKey:''
        };
    },
    created() {
       // this.getRolelist(1);
    },
    mounted(){
        console.log('store.state.userInfo', store.state.userInfo);

        // let jjs =JSON.parse(store.state.userInfo);
        // jjs.tenantId;
        // console.log('fffffffff',jjs.tenantId);
    },
    destroyed() {

    },
    filters:{
        /**
         * 角色过滤
         * @param input
         * @returns {*}
         */
        rolesFilter:function (input) {
            if(!input||!Array.isArray(input)){
                return "";
            }
            let result=[];
            input.forEach(item=>{
                result.push(item.name);
            });
            return result.join("、");
        },
        statusFilter:function (input) {
            let result="正常";
           if(input!=0){
            result="禁用";
           }
            return result;
        },
        isAdminFilter:function(input){
            let roleStr="";
            input.forEach(item=>{
                roleStr+=item.name;
            });
           if(roleStr.indexOf("管理员")>=0){
            return true;
           }else{
               return false;
           }
        }
    },
    methods: {
        isAdmin(input){
            let roleStr="";
            input.forEach(item=>{
                roleStr+=item.name;
            });
           if(roleStr.indexOf("管理员")>=0){
            return true;
           }else{
               return false;
           }
        },
        createUser(){
            this.$router.push("/admin/userlist/edit/_EPT");
        },
        handleCurrentChange(params){
            this.getRolelist(params);
        },
        getRolelist(params){
            let _this = this;
            this.pageNo = params;
            let _data={
                pageNo:params,
                pageSize:this.pageSize,
                name:this.searchKey
            }
            _.ajax({
                url: '/admin/userrole/userlist',
                method: 'POST',
                data:_data,
                success: function (result) {
                    //console.log("search------------",result);
                    if (result.code == 0 && result.data) {
                        _this.userlist = result.data.list;
                        _this.count = result.data.count;

                        _this.userlist.forEach(m=>{
                           // m.status = m.status ==0?"正常":"已删除";
                        });
                    }
                }
            }, 'withCredentials');
        },
        searchUser(){
            this.getRolelist(1);
        },
        resetPassword(){

        },
        userEdit(params){
            this.$router.push("/admin/userlist/edit/" + params);
        },
        userDelete(params){
            let _this = this;
            let _data={
                userId:params
            }

            this.$confirm('确认禁用吗?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                _.ajax({
                    url: '/admin/userrole/deleteuser',
                    method: 'POST',
                    data:_data,
                    success: function (result) {
                        if (result.code == 0 && result.data) {
                            _this.getRolelist(1);
                        }else{
                            _this.$message.error("删除失败");
                        }
                    }
                }, 'withCredentials');
            }).catch(() => {

            });


        },
        userForbid(params,status){
            let _this = this;
            let _data={
                objdata:JSON.stringify({
                    ids:[params],
                    bizStatus:status
                })
            }
            this.$confirm('确认此操作吗?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                _.ajax({
                    url: '/admin/userrole/forbiduser',
                    method: 'POST',
                    data:_data,
                    success: function (result) {
                        if (result.code == 0 && result.data) {
                            _this.getRolelist(1);
                        }else{
                            _this.$message.error("操作失败");
                        }
                    }
                }, 'withCredentials');

            }).catch(() => {
            });
        },
              /**
         * 用户的启用禁用
         */
        fUserHandle(oUser,type,index){
            let _This=this;
            oUser=oUser||{};
           let  postData={
                "loginName":oUser.loginName,
                "mobile":oUser.mobile,
                "tenantId": oUser.tenantId,
                "id":oUser.id,
                "status":type
            }
            this.$confirm('确认此操作吗?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _.ajax({
                    url: '/admin/organ/updateuser',
                   method: 'POST',
                   data: postData,
                   success: function (result) {
                       if (result.code == 0 && result.data) {
                           let userlist=_This.userlist;
                           userlist[index].status=type;
                           _This.userlist=userlist;
                           let info="启用成功";
                           if(type!=0){
                               info="禁用成功";
                           }
                           _This.$message.info(info);
                       }else if(result.code == 7){
                        _This.$message('你不具备此项权限');
                       }else {
                       _This.$message.info("操作失败");
                       }
                   }
               }, 'withCredentials');
            });
        }
    }
}