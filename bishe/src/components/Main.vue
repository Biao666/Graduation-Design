<template>
    <div id="body">
      <el-carousel indicator-position="outside" height="580px" type="card">
        <el-carousel-item v-for="(item,index) in pics" :key="index" >
          <img :src="item.idView" class="image">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pics:[
                    {id:0, idView: require('../assets/XM.jpg')},
                    {id:1, idView: require('../assets/HM.jpg')},
                    {id:2, idView: require('../assets/Pfactory.jpg')}
            ]   
        }
    }
}
</script>
<style>

.image{
  width: 100%;
  height: 100%;
  background-size: 100%;
}
</style>