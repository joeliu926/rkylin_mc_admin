import tree from '../tree/index.vue';
import store from '../../../vuex';
import CONSTANT from '../../../common/utils/constants.js';
import VAREGEX from '../../../common/utils/valregex.js';
export default {
    components: { tree },
    data () {
        return {
            defaultImg:require("../../../common/img/add-img-icon.png"),
            // imgUploadUrl:CONSTANT.fileUpload+"attachment/upload",
            imgUploadUrl:CONSTANT.fileUpload+"api/files/attachment/upload",
            file1:"",
            file2:"",
            editShow: true,
            viewShow: false,
            checkUserhVal: "",
            usable: false,
            occupyUser: false,
            oClinic:{
                "name": "", // 诊所名称
                "admin": "", // 诊所管理员用户名
                "group": "",
                "linkman": "", // 联系人姓名
                "phone": "",
                "email": "",
                "qualification": "", //诊所等级
                "businessTime": "",
                "countryName": "", //国家
                "provName": "北京", //省份
                "cityName": "", //城市名
                "districtName": "", //地址
                "coordinate": "", //坐标
            },
            oClinicRank: ["诊所", "门诊部", "整形外科医院", "一级民营医院", "二级医院", "三级甲等医院"],
            productItem:"",//单项诊疗项目 
            searchData:[],
            //caseId:'',
            oProductCode: [], //诊疗项目id集合1111
            caseDetail: {
                id: "",
                caseName: "",
                doctor: {
                },
                products: [],
                operationDate: "",
                customerGender: "",
                customerAge: "",
                customerLogo: {
                    "name": "",
                    "url": ""
                },
                beforePicture: {
                    "name": "",
                    "url": ""
                },
                afterPicture: {
                    "name": "",
                    "url": ""
                },
                contentList: [
                  
                ]
            },
            fileList:[],
            address:"",
            mapPoint:{},
            oCreatData:{},
            businessLicense:"",
            licence:""
        };
    },
    created() {
      
    },
    mounted(){
        let _This=this;
        _This.contentMap = new BMap.Map("map-content");
        let map = _This.contentMap;
        map.centerAndZoom("北京", 12);
        map.enableScrollWheelZoom(true);
        let autoDrop = new BMap.Autocomplete( //建立一个自动完成的对象
            {
                "input": "suggestId",
                "location": map
            });
        autoDrop.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
            let currentSelect = e.item.value;
            let selectValue = currentSelect.province + currentSelect.city + currentSelect.district + currentSelect.street + currentSelect.business;
            console.log(currentSelect);
            _This.address=selectValue;
            _This.fSearchAddressByAddress(18);
        })

        //console.log('store.state.userInfo', store.state.userInfo.loginName);
    },
    methods: {      
        fsubmit () {

            /*验证判断必填项*/
            if(!/\S{1,}/.test(this.oClinic.name)){
                this.$message.error("诊所名称不能为空");
                return false;
            }
            if(!/\S{1,}/.test(this.checkUserhVal)){
                this.$message.error("诊所管理员用户名不能为空");
                return false;
            }
            if(!/\S{1,}/.test(this.oClinic.linkman)){
                this.$message.error("联系人姓名不能为空");
                return false;
            }
            let phone= this.oClinic.phone;
            if((!VAREGEX.isMobile(phone))&&!VAREGEX.isTel(phone)){ //VAREGEX
                this.$message.error("请输入正确的电话号码");
                return false;
            }
            if((!VAREGEX.isEmail(this.oClinic.email)) && (this.oClinic.email != "") ){ //VAREGEX
                this.$message.error("请输入正确的邮箱");
                return false;
            }
            if(!/\S{1,}/.test(this.oClinic.qualification)){
                this.$message.error("请选择诊所等级");
                return false;
            }
            if( this.caseDetail.products.length < 1){
                this.$message.error("请选择主营项目");
                return false;
            }
            if(!/\S{1,}/.test(this.oClinic.businessTime)){
                this.$message.error("请输入营业时间");
                return false;
            }
            if(!/\S{1,}/.test(this.address)){
                this.$message.error("请输入详细地址");
                return false;
            }
            

            let _This = this;
            _This.editShow = false;
            _This.viewShow = true;
            _This.address0 = _This.address;

            let mapview = new BMap.Map("map-content-view");  
            mapview.centerAndZoom(new BMap.Point(_This.mapPoint.point.lng - 8, _This.mapPoint.point.lat + 5), 18);
            mapview.enableScrollWheelZoom(true);
            mapview.clearOverlays();
            let marker = new BMap.Marker(new BMap.Point(_This.mapPoint.point.lng, _This.mapPoint.point.lat)); // 创建标注
            mapview.addOverlay(marker);
            let infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + _This.address + "</p>");
            marker.openInfoWindow(infoWindow);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        
        },
        fback () {
            let _This = this;
            _This.editShow = true;
            _This.viewShow = false;
            
        },
        fconfirm () {   
            let _This = this;
            let majorBusiness = "";
            _This.caseDetail.products.forEach(pro => {
                majorBusiness += pro.productName + "/" 
            });
            majorBusiness = majorBusiness.substr(0,majorBusiness.length-1 );
            console.log(majorBusiness)
            let parms = {
                "parentTenantId": store.state.userInfo.clinic[0].clinicId,
                "name": _This.oClinic.name,
                "phone": _This.oClinic.phone,
                "adminLoginName": _This.checkUserhVal,
                "under": _This.oClinic.group,
                "linkman": _This.oClinic.linkman,
                "qualification": _This.oClinic.qualification,
                "majorBusiness": majorBusiness,
                "businessTime": _This.oClinic.businessTime,
                "address": _This.address,
                "businessLicense": _This.businessLicense, // 营业执照
                "licence": _This.licence, // 许可证
                "logo": _This.defaultImg,
            }
            //console.log(parms);
            _.ajax({
                url: '/oms/api/clinic/create',
                type: 'POST',
                data: parms,
                success: function(result) {
                    console.log(result);
                    if(result.code == 0){
                        _This.$message({message: '添加成功',
                            type: 'success'
                        });
                    } 
                },
                error: function(result) {
                    _This.$message.error('添加失败');
                }
            })
        },

        fCheckUser () {
            let _This = this;
            if (_This.checkUserhVal != "") {
                let fdata = {
                    "checkType": 1,
                    "checkContent": _This.checkUserhVal
                }
                _.ajax({
                    url: '/oms/api/user/check',
                    type: 'POST',
                    data: fdata,
                    success: function(result) {
                        console.log(result);
                        if(result.code == 3010){
                            _This.usable = true;
                            _This.occupyUser = false;
                        } else if (result.code == 3011) {
                            _This.usable = false;
                            _This.occupyUser = true;
                        }
                    },
                    error: function(result) {
                        //console.log("error-- result------>", result)
                    }
                })
            } else {
                _This.usable = false;
                _This.occupyUser = false;
            }
            
        },
        //获取诊疗项目列表
        fAutoProduct(query) {
            if (query !== '') {
                this.loading = false;
                var _This = this;
                _.ajax({
                    url: '/api/product/searchList?loginName='+ store.state.userInfo.loginName +'&productName=' + query,
                    //url: '/api/product/searchList?productName=' + query,
                    method: 'GET',
                    success: function (result) {
                        if(result.code==0){
                            _This.searchData=result.data;
                        }
                    }
                },'',store.state.userInfo.token);
            } else {
                this.searchData = [];
            }
        },
        /**
         * 选中诊疗项目
         * @param item
         */
        fSelectProductItem(item){
            let _This=this;
             if(_This.oProductCode.indexOf(item.id))
             {
                 _This.oProductCode.push(item.id);
                 delete item.page;
                 if(item.productName){
                     _This.caseDetail.products.push(item);
                 }
             }
            this.productItem ="";
        },
         /**
         * 删除诊疗项目
         * @param item
         */
        fRemoveProduct(item){
            let _This=this;
            let index= _This.caseDetail.products.indexOf(item);
            if(index>=0){
                _This.oProductCode.splice(index,1);
                _This.caseDetail.products.splice(index,1);
            }
        },


        fChooseImg(){
            this.$refs.uploadImg.click();
        },
        fAjaxFileUpload(e, filenum){
            let _This = this;
            var imgFile = e.target.files[0];
            
            if(imgFile.size>5*1024*1024){
                this.$message.error('图片大小不能超过5M！');
                return false;
            }
            let aLogoType=[".jpg",".jpeg",".png",".bmp"];
            let imgName = imgFile.name.substr(imgFile.name.lastIndexOf(".")).toLocaleLowerCase();
            
            if(aLogoType.indexOf(imgName)<0){
                _This.$message.error("上传图片格式错误");
                return false;
            }

            var fdata = new FormData();
            fdata.append('imgFile', imgFile);
            fdata.append('user',"test");
            console.log(fdata);
            console.log(_This.imgUploadUrl);

            _.ajax({
                url: _This.imgUploadUrl,
                type: 'POST',
                data: fdata,
                urlType: 'full',
                contentType: false,
				processData: false,
                success: function(result) {
                    console.log(result)
                    if(result.code==0&&result.data.length>0){

                        if (filenum == 1){
                            _This.file1 = imgFile.name;
                            _This.businessLicense = result.data[0]
                        } else if (filenum == 2) {
                            _This.file2 = imgFile.name;
                            _This.licence = result.data[0]
                        } else {
                            _This.defaultImg = result.data[0];
                        }
                       
                    }
                },
                error: function(result) {
                    //console.log("error-- result------>", result)
                }
            },'',store.state.userInfo.token);
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
           
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },


        /**
         * 获取地址map
         */
        fSearchAddressByAddress(msize) {
            let _This=this;
            let addressText=_This.address;
            let map =_This.contentMap;
            map&&addressText&&_This.fLocationCity(addressText,function (addressText) {
                msize=msize||12;
                //var map =_This.contentMap;//***************
                var localSearch = new BMap.LocalSearch(map);
                localSearch.setSearchCompleteCallback(function(searchResult) {
                    if(!searchResult){
                        return false;
                    }
                    var poi = searchResult.getPoi(0);
                    _This.mapPoint = poi;
                    _This.fGetSpecificAddress(poi.point);
                    map.centerAndZoom(poi.point, msize);
                    map.clearOverlays();
                    var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地方对应的经纬度
                    console.log("lng",poi.point.lng);
                    console.log("lat",poi.point.lat);
                    map.addOverlay(marker);
                    var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + addressText + "</p>");
                    marker.openInfoWindow(infoWindow);
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    
                });
                localSearch.search(addressText);
            });

        },
        /**
         * 定位城市
         */
        fLocationCity(addText,callback){
            if(addText){
                callback(addText);
            }else {
                let map =this.contentMap;
                var myCity = new BMap.LocalCity();
                myCity.get(function(result){
                    callback(result.name);
                });
            }
        },
        /**
         * 根据坐标点进行地址解析
         */
        fGetSpecificAddress(cpoint){
            let _This=this;
            let geoc = new BMap.Geocoder();
            geoc.getLocation(new BMap.Point(cpoint.lng, cpoint.lat), function(res) {
                let addComp = res.addressComponents; 
                _This.oClinic.countryName="中国";
                _This.oClinic.provName=addComp.province;
                _This.oClinic.cityName=addComp.city;
                _This.oClinic.districtName =addComp.district;
                _This.oClinic.coordinate=cpoint.lng+","+cpoint.lat;
                _This.oClinic.street=addComp.street;
                _This.oClinic.streetNumber=addComp.streetNumber;
            });
        }
        
    }
}