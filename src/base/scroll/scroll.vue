<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	export default{
		data(){
			return{
				
			}
		},
		props:{
			click:{
				type:Boolean,
				default:true
			},
			prodeType:{
				type:Number,
				default:3
			},
			listenScroll:{
				type:Boolean,
				default:false
			},
			data:{
				type:Array,
				default:null
			}
		},
		methods:{	
			_initscroll(){
				if(!this.$refs.wrapper){
				    return;
			    }
				this.scroll=new BScroll(this.$refs.wrapper,{
					click:this.click,
					prodeType:this.prodeType
				});
				if(this.listenScroll){
					this.scroll.on('scroll',(pos)=>{
						this.$emit('scroll',pos);
					})
				}
			},
			refresh(){
				this.scroll&&this.scroll.refresh();
			},
			scrollTo(){
				this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments);
			},
			scrollToElement(){
				this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments);
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this._initscroll();
			})
		},
		watch:{
			data(){			
                this.$nextTick(()=>{
                	this.refresh();
                })
			}
		}
	}
</script>

<style scoped>
</style>