import axios from 'axios';
export default {
    getSetting:function(resName){ //查询规系统设置-设置信息
        var params = {
            page:1,
            rows:10,
            pageNum:1,
            pageNumber:1,
            pageSize:10,
            column:'',
            condition:'',
            queryParams:JSON.stringify({
                resName: resName || '',
                alias:'',
                descp:'',
                parent_path:'/系统目录/配置设置/风控系统/'
            })
        };
        return axios.get('/dlapi/cms/sysDic/search',{params: params}).then(res => res.data);
    }

};