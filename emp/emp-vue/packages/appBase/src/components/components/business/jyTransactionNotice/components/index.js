/**
 * Created by jiachenpan on 16/11/18.
 */
 export function checkTradingUnitByName(name,tradingUnitAll) {
  //根据交易单元名称查询交易信息
 
   let res=tradingUnitAll.filter(item => item.tradingUnitName==name);
      if(res.length>0){
        return "false"
      }else{
        return "true"
      }
 }
  export function checkTradingUnitById(id,tradingUnitAll) {
  //根据交易单元名称查询交易信息
 
   let res=tradingUnitAll.filter(item => item.tradingUnitId==id);
      if(res.length>0){
        return "false"
      }else{
        return "true"
      }
 }
 export function getTradingUnitIdByName(name,tradingUnitAll) {
  //根据交易单元名称查询交易单元id
   let res=tradingUnitAll.filter(item => item.tradingUnitName==name);
      if(res.length>0){
        return res[0].tradingUnitId
      }else{
        return ""
      }
 }
 export function checkOrgByName(name,orgAll) {
 //根据发电公司名称查询发电公司信息
   let res=orgAll.filter(item => item.orgName==name);
      if(res.length>0){
        return "false"
      }else{
        return "true"
      }
 }
 export function checkOrgById(id,orgAll) {
 //根据发电公司名称查询发电公司信息
   let res=orgAll.filter(item => item.id==id);
      if(res.length>0){
        return "false"
      }else{
        return "true"
      }
 }
 export function getOrgIdByName(name,orgAll) {
  //根据发电公司名称查询发电公司id
   let res=orgAll.filter(item => item.orgName==name);
      if(res.length>0){
        return res[0].tradingUnitId
      }else{
        return ""
      }
 }
 export function checkCustomerByName(name,customertAll) {
 //根据客户名称名称查询客户名称id
   let res=customertAll.filter(item => item.customerName==name);
      if(res.length>0){
        return "false"
      }else{
        return "true"
      }
 }
  export function checkCustomerById(id,customertAll) {
 //根据客户名称名称查询客户名称id
   let res=customertAll.filter(item => item.customerId==id);
      if(res.length>0){
        return "false"
      }else{
        return "true"
      }
 }
 export function getCustomerIdByName(name,customertAll) {
  //根据客户名称名称查询客户名称id
   let res=customertAll.filter(item => item.customerName==name);
      if(res.length>0){
        return res[0].tradingUnitId
      }else{
        return ""
      }
 }
  export function excelToArr(reader,page,limit,tradingUnitAll,orgAll,customertAll) {
   let binary = "",
       isLoadBinary = false, //是否将文件读取为二进制字符串
       loadedData, //读取完成的数据
       outData,
       items=[];
        let bytes = new Uint8Array(reader.result);
                let byteLength = bytes.byteLength;
                for(let i = 0; i < byteLength; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                let XLSX = require('xlsx');
                if(isLoadBinary) {
                    loadedData = XLSX.read(btoa(fixdata(binary)), { //手动转化
                    type: 'base64'
                });    
                } else {
                    loadedData = XLSX.read(binary, {
                        type: 'binary'
                    });
                }
                outData = XLSX.utils.sheet_to_json(loadedData.Sheets[loadedData.SheetNames[0]]);//outData就是你想要的东西
                //console.log(outData);
                let resultObj={};
                let isFdExcel=true;
                let excelKeys="";
                let tableHeadInfo="交易单元,发电公司,客户名称,成交电价（元/mwh）,成交电量（mwh）"
                for(let key in outData[0]){
                    excelKeys+=','+key;
                }
                outData.forEach((element,index)=> {
                    resultObj={};
                    resultObj.index = (index+1)+(page-1)*limit ; 
                   // resultObj.tradingUnitId = getTradingUnitIdByName(element["交易单元"],tradingUnitAll);
                    resultObj.tradingUnitId = element["交易单元"];
                    resultObj.tradingUnitName = element["交易单元"];
                    resultObj.tradingUnitState =checkTradingUnitByName(element["交易单元"],tradingUnitAll);
                    //resultObj.fdOrgId =getOrgIdByName(element["发电公司"],orgAll);
                    resultObj.fdOrgId =element["发电公司"];
                    resultObj.fdOrgName = element["发电公司"];
                    resultObj.fdOrgState =checkOrgByName(element["发电公司"],orgAll);
                   // resultObj.customerId = getCustomerIdByName(element["客户名称"],customertAll);
                    resultObj.customerId = element["客户名称"];
                    resultObj.customerName = element["客户名称"];
                    resultObj.customerState =checkCustomerByName(element["客户名称"],customertAll);
                    resultObj.dealPrice = element["成交电价（元/mwh）"];
                    resultObj.dealElectricity = element["成交电量（mwh）"];
                    items.push(resultObj);  
                    });    
   return items;
 }
