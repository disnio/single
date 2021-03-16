/*
 * @功能描述: 
 * @版本: 
 * @作者: 阿彪
 * @Date: 2019-12-16 20:18:44
 * @最新修改内容: 
 * @LastEditTime : 2019-12-27 10:41:34
 */
import fetch from '@common/utils/fetch';
import axios from "axios";
import { getToken } from "@common/utils/auth";
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export function showImg(id) {
    let timestamp = Date.parse(new Date());
    let token = getToken()
    let url = "/api/customer/tMdataCustomerContacts/downloadFile?token=" + token + "&contactId=" + id + "&timestamp=" + timestamp;
    return url
}
/**
 * @方法名称: savePdf
 * @功能描述: 将dom元素保存为PDF
 * @参数: ref是要保存的dom，name是保存PDF的名字
 * @返回值: 
 * @样式作用范围: 
 * @作者: 阿彪
 * @Date: 2019-12-27 10:27:19
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function savePDF(pdf, name) {
    let pdfW = pdf.offsetWidth;
    let pdfH = pdf.offsetHeight;
    html2Canvas(pdf, {
        useCORS: true, // 当图片是链接地址时，需加该属性，否组无法显示图片
        "imageTimeout": 0,
        'scale': 5,
        "width": pdfW,
        "height": pdfH,
    }).then(canvas => {
            let pageData = canvas.toDataURL('image/jpeg', 1.0);
            // 第一个方向,第二个单位,第三个尺寸格式
            // landscape横向
            //  let pdf = new JsPDF('landscape', 'pt', 'a4');
            let pdf = new JsPDF({ orientation: 'l', unit: 'pt', format: [(pdfH + 20), (pdfW + 20)] });
            pdf.addImage(pageData, 'JPEG', 10, 10, pdfW, pdfH)
            let n=name || Date.parse(new Date());
            let names = n+'.pdf'; // 定义生成的pdf的文件名字
            pdf.save(names);
        });

}