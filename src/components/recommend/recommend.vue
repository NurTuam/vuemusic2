<template>
	<div class="recommend">
		<scroll class="recommend-content" :data="disslist">
		   <div>
		   	  <div class="slider-wrapper" v-if="recommends.length">
			 <slider :loop="true">
				<div v-for="item in recommends">
					<a :href="item.linkUrl">
						<img :src="item.picUrl"/>
					</a>
				</div>
			 </slider>
		    </div>
		   <div class="recommend-list">
			<h1 class="list-title">热门歌单推荐</h1>
			    <ul>
			    	<li class="item" v-for="item in disslist">
			    	<div class="icon">
			    		<img v-lazy="item.imgurl" width="60" height="60" alt=""/>
			    	</div>
			    	<div class="text">
			    		<h2 class="name" v-html="item.creator.name"></h2>
			    		<p class="desc" v-html="item.dissname"></p>
			    	</div>
			    	</li>
			    </ul>
		     </div>
		   </div>
		   <div class="loading-container" v-show="!disslist.length">
		   	  <loading></loading>
		   </div>
		</scroll>
	</div>
</template>

<script>
	import {url,params,ERR_OK,callback} from "../../api/getrecomment";
	import {url as listUrl} from "../../api/getList";
	import axios from "axios";
	import slider from "../../base/slider/slider";
	import scroll from "../../base/scroll/scroll";
	import loading from "../../base/loading/loading"
	export default{
		data(){
			return{
				recommends:[],
				disslist:[]
			}
		},
		methods:{
			getrecommends(){
//				获取轮播图的数据
			this.$http.jsonp(url,{
				params,
				'jsonp':callback
			}).then((res)=>{
//				console.log(res.body)
				if(res.body.code==ERR_OK){
//					console.log(res.body.data.slider);
					this.recommends=res.body.data.slider;
					this.getlist();
				}
			});
	     },
	     getlist(){
	     	//			获取歌单的数据
			axios.get(listUrl).then((res)=>{
//				console.log(res.data)
                if(res.data.code==ERR_OK){
//              	console.log(res.data.data.list)
                    this.disslist=res.data.data.list;
                }
			 })
	      }
		},
		components:{
			slider,
			scroll,
			loading
		},
		created:function(){			
            this.getrecommends();
            
		}
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>