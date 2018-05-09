import tree from '../tree/index.vue';
import store from '../../../vuex';
export default {
    components: {
        tree},
    data () {
        return {
            addImg:require("../../../common/img/add-img-icon.png"),
            defaultImg:require("../../../common/img/add-img-icon.png"),
            fileList:[],
            grade:[
                {
                    value: '选项2',
                    label: '双皮奶'
                },
            ],
            gradeVal:"",
            projects:[
                {
                    value: '选项3',
                    label: '双皮奶'
                },
            ],
            projectsVal:"",
            address:"",
            oCreatData:{}
        };
    },
    created() {
       // this.getRolelist(1);
    },
    mounted(){
        let _This=this;
        _This.contentMap=new BMap.Map("map-content");
        let map =_This.contentMap;
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
        });
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            //this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            //return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleChange(file, fileList) {
            //this.fileList3 = fileList.slice(-3);
        },


        fAjaxFileUpload(){},
        chooseImage(){},



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
                    _This.fGetSpecificAddress(poi.point);
                    map.centerAndZoom(poi.point, msize);
                    map.clearOverlays();
                    var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地方对应的经纬度
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
                //console.log("res22-------->", res);
                let addComp = res.addressComponents;
                //console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                //_This.oClinicData.address=res.address;
                _This.countryName="中国";
                _This.provName=addComp.province;
                _This.cityName=addComp.city;
                _This.districtName =addComp.district;
                _This.coordinate=cpoint.lng+","+cpoint.lat;
                _This.street=addComp.street;
                _This.streetNumber=addComp.streetNumber;
                //console.log("_This.oClinicData222-------->", _This.oClinicData);

            });
        },
        
    }
}