/**
 * Created by JoeLiu on 2017-9-15.
 */
/*import AdInput from 'adminUI/components/admin-input.vue';*/
import tree from '../../tree/index.vue';
import CONSTANT from '../../../../common/utils/constants.js'
export default {
    components: {tree},
    data () {
        return {
            userId:'',
            userInfo:{},
            roleList:[],
            doctoredit:'用户编辑',
            checked:true,
            imgUploadUrl: CONSTANT.fileUpload+"attachment/upload"
        };
    },
    created() {
        this.clearData();
        this.userId = this.$route.params.id;
        if(this.userId != '_EPT'){
            this.initUser();
        }
        else{
            this.initRoles();
        }
    },
    methods: {
        initUser(){
            let _this = this;
            let _data={
                userId:this.userId
            }

            _.ajax({
                url: '/admin/userrole/getuserinfo',
                method: 'POST',
                data:_data,
                success: function (result) {
                    if (result.code == 0 && result.data) {
                        _this.userInfo =result.data;
                        _this.initRoles();
                    }
                }
            }, 'withCredentials');
        },
        initRoles(){
            let _this = this;
            _.ajax({
                url: '/admin/userrole/rolelist',
                method: 'POST',
                success: function (result) {
                    if (result.code == 0 && result.data) {
                        _this.roleList =result.data;
                        _this.roleList.forEach(m=>{
                            _this.userInfo.roles&&_this.userInfo.roles.forEach(roles=>{
                                if(roles.id==m.id){
                                    m.checked=true;
                                }
                            });
                        });

                    }
                }
            }, 'withCredentials');
        },
        fGetGoodAtList(){

        },
        resetPassword(){
            let _this = this;
            let _data={
                userId:this.userId
            }
            _.ajax({
                url: '/admin/userrole/resetpwd',
                method: 'POST',
                data:_data,
                success: function (result) {
                    if (result.code == 0 && result.data) {
                        _this.$message.info("重置成功");
                    }
                    else{
                        _this.$message.error("重置失败");
                    }
                }
            }, 'withCredentials');
        },
        unbind(){
            let _this = this;
            let _data={
                userId:this.userId
            }
            _.ajax({
                url: '/admin/userrole/unbind',
                method: 'POST',
                data:_data,
                success: function (result) {
                    if (result.code == 0 && result.data) {
                        if (result.code == 0 && result.data) {
                            _this.userInfo.userCode = result.data.userCode;
                            _this.$message.info("解绑成功");
                        }
                        else{
                            _this.$message.error("解绑失败");
                        }
                    }
                    else if(result.code == 7){
                        _this.$message('你不具备此项权限');
                    }
                }
            }, 'withCredentials');
        },
        checkrole(params){

            let refresh = this.roleList;
            this.roleList=[];
            refresh.forEach(m=>{
               if(m.id ==params.id){
                   m.checked =m.checked;
               }
            });
            this.roleList =refresh;
        },
        saveInfo(cb){
            if(!this.authData()){
                return;
            }
            let _this = this;
            this.userInfo.rolesEnName=this.roleList.filter(function (m) {
                m.userId = _this.userId;
                return m.checked ==true;
            });

            if(this.userId == '_EPT'){
                this.userInfo.id ="";
            }

            let _data=_this.userInfo;
            _.ajax({
                url: '/admin/userrole/updateuser',
                method: 'POST',
                data:_data,
                success: function (result) {
                    if (result.code == 0 && result.data) {
                        let rolelist  = [];
                        _this.userInfo.rolesEnName.forEach(rl=>{
                            rolelist.push(rl.id);
                        });
                        let postObje={"roles":rolelist,"userId":result.data.id};
                        _.ajax({
                            url: '/admin/userrole/updateuserrole',
                            method: 'POST',
                            data:{objValue:JSON.stringify(postObje)},
                            success: function (result) {
                                if (result.code == 0 && result.data) {
                                    _this.$message.info("保存成功");
                                    cb&&cb();
                                }else{
                                    _this.$message.error("保存失败");
                                }
                            }
                        }, 'withCredentials');
                    }
                    else if(result.code == 7){
                        _this.$message('你不具备此项权限');
                    }
                    else{
                        if(result.code==3006){
                            _this.$message.error("用户名已存在，请调整用户名！");
                        }else{
                            _this.$message.error("保存失败");
                        }

                    }
                }
            }, 'withCredentials');
        },
        save(){
            let _this =this;
            this.saveInfo(function () {
                _this.clearData();
                _this.$router.push("/admin/userlist");
            });
        },
        saveAndAdd(){
            let _this =this;
            this.saveInfo(function () {
                _this.clearData();
                _this.$router.push("/admin/userlist/edit/_EPT");
            });
        },
        changeMobile(){
            if(this.userId == '_EPT'){
                this.userInfo.loginName = this.userInfo.mobile;
            }

        },
        Cancel(){
            this.clearData();
            this.$router.push("/admin/userlist");
        },
        clearData(){
            this.userInfo = {
                headImgUrl:"",
                id:'',
                loginName:"",
                menus:[],
                mobile:"",
                name:"",
                nickname:"",
                permissions:[],
                rolesEnName:[],
                status:0,
                tenantId:0,
                type:"",
                wxOpenId:""}
        },
        chooseImage(){
            this.$refs.uploadImg.click();
        },
        fAjaxFileUpload(e){
            let _This = this;
            var imgFile = e.target.files[0];
            if(imgFile.size>5*1024*1024){
                this.$message.error('图片大小不能超过5M！');
                return false;
            }
            let aLogoType=[".jpg",".jpeg",".png",".bmp"];
            let imgName=imgFile.name.substr(imgFile.name.lastIndexOf(".")).toLocaleLowerCase();
            if(aLogoType.indexOf(imgName)<0){
                _This.$message.error("上传图片格式错误");
                return false;
            }

            var fdata = new FormData();
            fdata.append('imgFile', imgFile);
            fdata.append('user',"test");
            _.ajax({
                url: _This.imgUploadUrl,
                type: 'POST',
                data: fdata,
                urlType: 'full',
                contentType: false,
                processData: false,
                success: function(result) {
                    if(result.code==0&&result.data.length>0){
                        _This.userInfo.headImgUrl=result.data[0];
                    }
                },
                error: function(result) {
                    //console.log("error-- result------>", result)
                }
            });
        },
        authData(){
            this.userInfo.name= this.userInfo.name.replace(/\s/g,'');

            if(_.strLength(this.userInfo.name)>12||_.strLength(this.userInfo.name)==0){
                this.$message.error("名称应为1到6个汉字或12个字符");
                return false;
            }
            /*if(/^[^ ]{1,6}$/.test(this.userInfo.name)){
            }else{
                this.$message.error("名称1到6个字符");
                return false;
            }*/

            if(/^1\d{10}$/.test(this.userInfo.mobile)){
                //return true;
            }else{
                this.$message.error("手机号不正确");
                return false;
            }
            this.userInfo.loginName= this.userInfo.loginName.replace(/\s/g,'');
           
            if(_.strLength(this.userInfo.loginName)>12||_.strLength(this.userInfo.loginName)==0){
                this.$message.error("用户名应为1到6个汉字或12个字符");
                return false;
            }
            // if(/^\w{1,16}$/.test(this.userInfo.loginName)){
            // }else{
            //     this.$message.error("用户名为1到16个字符(字母、数字、下划线)");
            //     return false;
            // }
            let checkArray =this.roleList.filter(function (m) {
                return m.checked ==true;
            });

            if(checkArray.length<1){
                this.$message.error("请选择用户角色！");
                return false;
            }

            return true;
        }
    }
}