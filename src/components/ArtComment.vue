<template>
  <div>
   <van-list
   offset="0"
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
 <ArtComList :list="comments"></ArtComList>
</van-list>
  </div>
</template>

<script>
import { getComment } from '@/Api'
import { mapState } from 'vuex'
import  ArtComList from './ArtComList.vue'
export default {
    components: { ArtComList },
  data() {
    return {
        loading:false,
        finished:false,
      comments: []
    }
  },
  methods: {
    async onLoad () {
      this.loading = true
      try {
        const {data} = await getComment({
          type: 'a',
          source: this.details.art_id
        })
        
        this.comments = data.data.results
        // this.comments.push(doneComment)
        console.log(this.comments);
        this.loading = false
        if(this.comments){
          this.finished = true
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
    computed: {
    ...mapState(['details'])
  }
}
</script>

<style></style>
