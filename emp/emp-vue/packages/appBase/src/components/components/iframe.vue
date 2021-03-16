<template >
  <!-- <div id="iframeDom" v-loading="isloading"> -->
  <div >
    <!-- <iframe :src="iframeUrl" id='show' width='100%' :height="innerHeight" frameborder=0 name='showHere' style="padding:0px;"></iframe> -->
  </div>
</template>

<script>
export default {
  // import url from ""
  data() {
    return { 
      iframeUrl: "" ,
      isloading:true,
      innerHeight:window.innerHeight - 130 + 'px'
    };
  },
  watch:{
    $route(to,from){
      this.init();
      this.isloading=true;//添加loading
    }
  },
  created() {
    this.init();
  },
  destroyed(){
    document.getElementById('iframeDom').style.display = 'none';
  },
  methods: {
    init() {
      // setTimeout(()=>{
      //   var oFrm = document.getElementById('show');
      //   oFrm.onload = ()=> {
      //     this.isloading=false;
      //   }
      // },100);
      if(this.$route.query.iframeUrl && this.$route.fullPath!=''){
        document.getElementById('iframeDom').style.display = 'block';
        let parameter=this.$route.fullPath;
        let iframeUrl=parameter.split("?iframeUrl=");
        let parameterArr=iframeUrl[1].split("&name=");
        this.iframeUrl =decodeURIComponent(parameterArr[0]);

        let creatDom=()=>{//创建iframedom
            let divItem=document.createElement("div");
            divItem.setAttribute('iframeUrl',iframeUrl[0]);
            divItem.innerHTML=`<iframe width='100%' height="${this.innerHeight}" frameborder=0 name='showHere' style="padding:0px;"
              src="${this.iframeUrl}"></iframe>`;
            setTimeout(()=>{
                document.getElementById("iframeDom").appendChild(divItem)
            },0)
        }
          let iframeDom = document.getElementById('iframeDom');
          if(iframeDom==null){//避免首次加载iframeDom没有children导致报错
            creatDom();
          }else{
            let iframeDomChildren = iframeDom.children; 
            let isCreat=true;
            for(let i=0;i<iframeDomChildren.length;i++){
              if(iframeDomChildren[i].getAttribute("iframeUrl")==iframeUrl[0]){
                iframeDomChildren[i].style.display = 'block';
                isCreat=false;
              }else{
                iframeDomChildren[i].style.display = 'none';
              }
            }
            if(isCreat){
              creatDom()
            }
          }
          
          
      }
    
    }
  }
};
</script>

<style scoped>
</style>