<style>
    .contract-modal {
        position: absolute;
        right: 15%;
        width: 1000px;
        height: 500px;
        overflow: scroll;
        background: rgba(139, 148, 171, 0.7);
        padding: 20px 0 0;
        z-index: 900;
    }
    .contract-modal .contract-detail {
        margin: 0 auto;
        max-width: 96%;
        height: auto;
    }
    .contract-btns{
        height: 50px;
        background-color:  #fff;
        text-align: center;
        padding-bottom:44px;
        padding-top:10px;
    }
    #mycanvas {
        min-height: 50vh;
        background: #fff;
    }
    canvas{
        margin: 0 auto;
        display: block;
        border-bottom:2px solid #aaa;
    }
    .close-btn{
        position: absolute;
        right: 15%;
        width: 26px;
        height: 26px;
        z-index: 999;
        background-color: #666;
        border-radius: 50%;
        cursor: pointer;
    }
</style>

<template>
<div>
   <!--  <iframe v-if="showPdf" id='previewPdf' :src="'/static/pdf/web/viewer.html?file=' + fileUrl" height="560" width="100%"></iframe> -->
      <iframe v-if="showPdf" id='previewPdf' :src="fileUrl" :height="scrollbarHeight" width="100%" frameborder="0"></iframe>
      <p v-else>非pdf文件不可预览</p>
  </div>
</template>

<script>
    import { initLayout } from "@common/utils/init";
    export default {
        name: 'md-contract',
        props: {
            pdfUrl:{type:String},
            type:{type:String},
        },
        data () {
            return  {
                   ff:false,
                   scrollbarHeight: "",
                    counter: this.pdfUrl,
                    showPdf: false,
                     fileUrl: this.pdfUrl}
        },
/*        watch: {
            visible (val) {
                if (val) {
                    this.contractError = false
                    this.$nextTick(()=>{
                        this.getPdf()
                    })
                }
            }
        },*/
        mounted() {
            if(typeof this.type!="undefined"){
                    this.showFile("init");
            }else{
                    this.getPdf("init");
            }

      this.init();
  },
        methods: {
     init() {
      this.scrollbarHeight = initLayout() - 220; //document.body.clientWidth;
      window.onresize = function temp() {
        this.scrollbarHeight = initLayout() -220;
      };
    },
            getPage (pdf,pageNumber,container,numPages) { //获取pdf
                let _this = this
                pdf.getPage(pageNumber).then((page) => {
                    let scale = (container.offsetWidth/page.view[2])
                    let viewport = page.getViewport(scale)
                    let canvas = document.createElement("canvas")
                    canvas.width= viewport.width
                    canvas.height= viewport.height
                    container.appendChild(canvas)
                    let ctx = canvas.getContext('2d');
                    var renderContext = {
                        canvasContext: ctx,
                        transform: [1, 0, 0, 1, 0, 0],
                        viewport: viewport,
                        intent: 'print'
                    };
                    page.render(renderContext).then(() => {
                        pageNumber +=1
                        if(pageNumber<=numPages) {
                            _this.getPage(pdf,pageNumber,container,numPages)
                        }
                    })
                })
            },
            getPdf (type,url) {
                // 此中方式接受流形式返回
              //  this.$refs.mycanvas.scrollTop =0
               // let url = 'http://image.cache.timepack.cn/nodejs.pdf'
               // this.fileUrl="http://127.0.0.1/gdWeb/国家发展改革委_国家能源局关于有序放开发用电计划的通知.pdf";
              if(type=="init"){
    
                 let fileUrl=this.pdfUrl;
                 if(fileUrl.slice(fileUrl.length-3,fileUrl.length) == "pdf"){
                     this.showPdf=true;
                          this.fileUrl=this.pdfUrl;
                  }else{
                      this.showPdf = false
                  }
               }else{                   
                  if(url.slice(url.length-3,url.length) == "pdf"){
                     this.showPdf=true;
                     this.fileUrl=url;
                  }else{
                      this.showPdf = false
                  }
                }
             /*   let pdfjsLib = pdf
                pdfjsLib.PDFJS.workerSrc = '/static/pdf/build/pdf.worker.js'
                let loadingTask = pdfjsLib.getDocument(url)
                loadingTask.promise.then((pdf) =>{
                    let numPages = pdf.numPages
                    let container = document.getElementById('mycanvas')
                    let pageNumber = 1
                    this.getPage(pdf,pageNumber,container,numPages)
                }, function (reason) {
                    alert(reason)
                });*/
            },
             showFile(type,url) {
                  this.showPdf=true;
              if(type=="init"){
                     this.fileUrl=this.pdfUrl;
               }else{                   
                     this.fileUrl=url;
                }
            }
        },
    }
</script>
