document.addEventListener("touchstart", function(e) {
  e.preventDefault();
});
/**
 * 背景音乐播放
 */
let audio = document.getElementById("bgMusic");
let musicCover = document.getElementById("musicCover");
let isPlayMusic = true;
let initRotate = 0;
let timer = null;

let tipmove = document.getElementById("tipmove");

// audio.play();
//微信必须加入Weixin JSAPI的WeixinJSBridgeReady才能生效
document.addEventListener(
  "WeixinJSBridgeReady",
  function() {
    audio.play();
  },
  false
);

function musicRotate() {
  timer = setInterval(function() {
    initRotate += 3;
    musicCover.style.transform = "rotate(" + initRotate + "deg)";
  }, 20);
}
musicRotate();
musicCover.addEventListener("touchstart", function(e) {
  if (isPlayMusic) {
    clearInterval(timer);
    timer = null;
    audio.pause();
    isPlayMusic = false;
  } else {
    musicRotate();
    audio.play();
    isPlayMusic = true;
  }
});

function loading() {
  let imgArr = [
    "loading.gif",
    "s1-bg.png",
    "s1-circle.png",
    "s1-t2.png",
    "s1-t3.png",
    "s1-t4.png",
    "s2-bg.png",
    "s2-border.png",
    "s3-bg.png",
    "s3-border.png",
    "s3-circle.png",
    "s3-p1.png",
    "s3-triangle.png",
    "s4-bg.png",
    "s4-border.png",
    "s4-p1.png",
    "s5-bg.png",
    "s5-border.png",
    "s5-t1.png",
    "s5-t2.png",
    "s5-t3.png",
    "s6-bg.png",
    "s6-t1.png",
    "s6-t22.png",
    "s6-t3.png",
    "s6-t4.png",
    "s6-t5.png"
  ];
  let loading = document.getElementById("loading");
  let loadingSpan = document.getElementById("loadingSpan");
  let imgIndex = 0;
  for (let i = 0, len = imgArr.length; i < len; i++) {
    var img = new Image();
    img.src = "./images/" + imgArr[i];
    img.onload = function() {
      imgIndex++;
      let percent = parseInt(imgIndex / imgArr.length * 100);
      loadingSpan.innerHTML = percent + "%";
      if (imgIndex == imgArr.length) {
        var mySwiper = new Swiper(".swiper-container", {
          direction: "vertical",
          // pagination: {
          //   el: ".swiper-pagination",
          //   type: 'fraction',
          // },

          mousewheel: true,
          on: {
            init: function() {
              swiperAnimateCache(this);
              swiperAnimate(this);
            },
            slideChangeTransitionEnd: function() {
              swiperAnimate(this);
              if (this.activeIndex == 5) {
                tipmove.style.display = "none";
              } else {
                tipmove.style.display = "block";
              }
            },
            onSlideChangeEnd: function(swiper) {}
          }
        });
        loading.style.display = "none";
        setTimeout(() => {
          // 百度地图API功能
          var map = new BMap.Map("allmap"); // 创建Map实例
          var point = new BMap.Point(114.064669, 22.539343);
          map.centerAndZoom(point, 18); // 初始化地图,设置中心点坐标和地图级别
          //添加地图类型控件
          map.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
            })
          );
          map.setCurrentCity("深圳"); // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
          var marker = new BMap.Marker(point); // 创建标注
          map.addOverlay(marker); // 将标注添加到地图中
          marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }, 5000);
      }
    };
  }

  setTimeout(() => {
    loading.style.display = "none";
  }, 0);
}

window.addEventListener("load", function() {
  loading();
});
