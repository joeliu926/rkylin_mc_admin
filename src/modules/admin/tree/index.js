/**
 * Created by JoeLiu on 2017-9-15.
 */
/*import AdInput from 'adminUI/components/admin-input.vue';*/
import store from '../../../vuex';
"use strict";
export default {
    components: {},
    data() {
        return {
            checkedKeys:[1,2],
            treeData:
            [
            // {
            //     id:'admin_user',
            //     label: '用户',
            //     linkUrl:'',
            //     hightline:false,
            //     needinit:false,
            //     count:0,
            //     children: [{
            //         id:'admin_user_user',
            //         label: '用户',
            //         linkUrl:'/admin/userlist',
            //         hightline:false,
            //         needinit:false,
            //         count:0,

            //     },{
            //         id:'admin_user_role',
            //         label: '角色',
            //         linkUrl:'/admin/rolelist',
            //         hightline:false,
            //         needinit:false,
            //         count:0,

            //     }]
            // },
            {
                id:'admin_sign',
                label: '签约',
                linkUrl:'',
                hightline:false,
                needinit:false,
                count:0,
                children: [{
                    id:'admin_sign_account',
                    label: '申请账号',
                    linkUrl:'/admin/applyaccount',
                    hightline:false,
                    needinit:false,
                    count:0,

                },{
                    id:'admin_sign_audit',
                    label: '审核申请',
                    linkUrl:'/admin/accountaudit',
                    hightline:false,
                    needinit:false,
                    count:0,

                }]
            }
        
        
        
            ],
         
            distreeData:[]
        };
    },
    created() {
        //this.initPropt();
        this.treeData.forEach(m=>{
            m.children&&m.children.forEach(ms=>{
                if(this.$router.history.current.fullPath.indexOf(ms.linkUrl)>-1){
                    ms.hightline =true;
                }
            })
        });
        this.initAuth();
    },
    methods: {
        initAuth(){
            let res =store.state.userInfo;
            let _menus = res.menus?res.menus:[];
                    let reduceMenus =[];
                    this.treeData.forEach(m=>{
                        let subMenus=JSON.parse(JSON.stringify(m));
                        subMenus.children=[];
                        m.children&&m.children.forEach(ms=>{
                            subMenus.children.push(ms);
                        });
                        if(subMenus.children.length>0){
                            reduceMenus.push(subMenus);
                        }
                    });
                    this.distreeData = reduceMenus;
                    global.USERINFO=res;
        },
        initPropt(){
            let _this = this;
            _.ajax({
                url: '/admin/common/prompt',
                method: 'POST',
                success: function(result) {
                    _this.treeData.forEach(m=>{
                        m.children&&m.children.forEach(ms=>{
                            (typeof(result.data)=="object")&&result.data.forEach(res=>{
                                if(ms.id == res.permission.split(':')[2]){
                                    if(res.point==1){
                                        ms.needinit =true;
                                    }
                                    ms.count =res.count;
                                }
                            })
                        })
                    });
                }
            }, 'withCredentials');
        },
        handleNodeClick(data) {
            // console.log("data----55555555555555---------------","-=-=-=-=-=--=-");

           

            this.removeAllHightLine();
            let tickPoint =data.id.split('_');
            if(tickPoint.length>2){
                this.$router.push(data.linkUrl);
                data.hightline =true;
            }
        },
        renderContent(h, { node, data, store }) {
            if(node.data.hightline){
                this.setHightline(node.data.id)
            }else{
                this.removeHightline(node.data.id)
            }
            if(node.data.color){
                return (
                    <span id={data.id} on-click={ () => this.handleNodeClick(data) } style="align-items: center; justify-content: space-between; width:100%;font-size: 14px; padding-right: 8px;color:#3542f1;">
                    <span>                    
                    <span>{node.label}</span>
                </span>
                </span>
                );
            }else{
                if(node.data.needinit)
                {
                    if(node.data.count){
                        return (
                            <span id={data.id} on-click={ () => this.handleNodeClick(data) } style="align-items: center; justify-content: space-between;width:100%; font-size: 14px; padding-right: 8px;">
                                <span>
                                    <span>{node.label+'('+node.count+')'}</span>
                                </span>
                                <span  style="color:red; font-size:14px; padding-left:10px;">●</span>
                            </span>
                        );
                    }else{

                        return (
                            <span id={data.id} on-click={ () => this.handleNodeClick(data) } style="align-items: center; justify-content: space-between;width:100%; font-size: 14px; padding-right: 8px;">
                                <span>
                                    <span>{node.label}</span>
                                </span>
                                <span  style="color:red; font-size:14px; padding-left:10px;">●</span>
                            </span>
                        );
                    }
                
                }else{
                    if(node.data.count){
                        return (
                            <span id={data.id} on-click={ () => this.handleNodeClick(data) } style="align-items: center; justify-content: space-between; width:100%;font-size: 14px; padding-right: 8px;">
                                <span>
                                    <span>{node.label+'('+node.count+')'}</span>
                                </span>
                            </span>
                        );
                    }else{
                        return (
                            <span id={data.id} on-click={ () => this.handleNodeClick(data) } style="align-items: center; justify-content: space-between; width:100%;font-size: 14px; padding-right: 8px;">
                                <span>
                                    <span>{node.label}</span>
                                </span>
                            </span>
                        );
                    }
                  
                }
            }
        },
        setHightline(params){
            this.$nextTick(function () {
                document.querySelector('#'+params).parentNode.className = 'el-tree-node__content el-tree-hight';
            });
        },
        removeHightline(params){
            this.$nextTick(function () {
                document.querySelector('#'+params).parentNode.className = 'el-tree-node__content';
            });
        },
        removeAllHightLine(params){
            this.treeData.forEach(m=>{
               m.hightline = false;
               m.children&&m.children.forEach(ms=>{
                   ms.hightline = false;
               })
            });
        }
    }
}