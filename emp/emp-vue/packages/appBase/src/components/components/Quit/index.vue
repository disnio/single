<!--
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2020-06-24 22:00:38
 * @最新修改内容: 
 * @LastEditTime: 2020-06-28 11:30:47
-->
<template>
	<svg
		@click="logout"
		class="icon cursor-pointer"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		t="1497503607356"
		viewBox="0 0 1024 1024"
		version="1.1"
		p-id="4109"
		:width="width"
		:height="height"
	>
		<path
			d="M562.972444 554.666667c0 28.103111-22.869333 50.972444-51.029333 50.972444-28.216889 0-50.972444-22.755556-50.972444-50.972444L460.970667 112.526222c0-28.103111 22.869333-50.972444 50.972444-50.972444s51.029333 22.869333 51.029333 50.972444L562.972444 554.666667 562.972444 554.666667zM84.593778 535.438222c0-152.576 80.554667-286.663111 201.102222-361.813333 23.608889-15.018667 55.125333-7.850667 69.973333 16.042667C370.631111 213.617778 363.463111 244.963556 339.626667 259.868444 247.694222 317.610667 186.652444 419.043556 186.652444 535.324444c0.398222 179.598222 145.635556 324.892444 325.290667 325.233778 179.598222-0.455111 324.778667-145.692444 325.12-325.233778 0-119.011556-64.227556-222.663111-159.800889-279.552-24.291556-14.392889-32.256-45.738667-17.92-69.973333 14.449778-24.177778 45.795556-32.142222 70.030222-17.806222 125.326222 74.012444 209.976889 210.830222 209.976889 367.274667 0 235.918222-191.260444 427.235556-427.292444 427.235556C275.911111 962.787556 84.593778 771.584 84.593778 535.438222"
			p-id="1520"
			fill="#b8d9fc"
		></path>
	</svg>
</template>

<script>
import { logOutCms } from "@common/api/login";
import Cookies from "js-cookie";

export default {
	name: "hamburger",
	props: {
		width: {
			type: Number,
			default: 24,
		},
		height: {
			type: Number,
			default: 24,
		},
		fill: {
			type: String,
			default: "#48576a",
		},
	},
	data() {
		return {
			isFullscreen: false,
		};
	},
	computed: {
		tokenStatus() {
			return Cookies.get("4aToken");
		},
	},
	methods: {
		logout() {
			this.$confirm("请确定是否退出系统?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					let url = window.location.href;
					if (this.tokenStatus) {
						this.$store.dispatch("FedLogOut").then(() => {
							if (url.search("-dev.") != -1) {
								window.location.href =
									"http://spic-sso-dev.test.developer.spic.com.cn/logout";
							} else if (url.search("-rel.") != -1) {
								window.location.href =
									"http://spic-sso-rel.test.developer.spic.com.cn/logout";
							} else if (url.search("-uat.") != -1) {
								window.location.href =
									"http://spic-sso-uat.test.developer.spic/logout";
							} else if (url.search("-pro.") != -1) {
								window.location.href = "http://10.80.52.235/logout";
							} else {
								window.location.href = "http://10.80.52.235/logout";
							}
						});
					} else {
						this.$store.dispatch("FedLogOut").then(() => {
							//2019-10-17 注释原内容管理单点登录退出功能 #2322
							location.reload(); // 为了重新实例化vue-router对象 避免bug
						});
					}
				})
				.catch(() => {});
		},
	},
};
</script>

<style scoped>
.cursor-pointer {
	display: inline-block;
	cursor: pointer;
	vertical-align: -0.15em;
}
svg {
	fill: #b8d9fc;
	width: 22;
	height: 22;
}
</style>
