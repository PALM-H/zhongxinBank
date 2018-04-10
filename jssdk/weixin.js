var weixin = {
    config: function() {
        var url = window.location.href.split("#")[0];
        	// alert(url);
        // $.get("http://test.palm-h.com/demo/2018/zhongxinBank/jssdk/jssdk.php", { "url": url }, function(s) {
        $.get("http://test.palm-h.com/main/2018/meiji/jssdk/jssdk.php", { "url": url }, function(s) {
            var s = eval("(" + s + ")");
            console.log(s);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: s.appId, // 必填，公众号的唯一标识
                timestamp: s.timestamp, // 必填，生成签名的时间戳
                nonceStr: s.nonceStr, // 必填，生成签名的随机串
                signature: s.signature, // 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline', 
                    'onMenuShareAppMessage'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
    },
    share: function(title,desc,link,logourl,share_str,isshare) {
        // alert(link);
        var data = {
            title:  title ? title : "中信银行深圳分行2018二季度投资策略报告会", // 分享标题
            link:  link ? link : 'http://test.palm-h.com/demo/2018/zhongxinBank/index.html', // 分享链接
            imgUrl: logourl ? logourl : "http://test.palm-h.com/demo/2018/zhongxinBank/jssdk/logo.jpg", // 分享图标
            desc: desc ? desc : '乘势而起，共享投资机遇———中信银行深圳分行诚邀你拨冗出席', // 分享描述,
            success: function() {
                // console.log('分享成功');
                // TDAPP.onEvent(share_str);
            },
            cancel: function() {
                // console.log('分享放弃');
                // TDAPP.onEvent(share_str);
            }
        };
        wx.onMenuShareTimeline({ ////分享到朋友圈
            title: data.title, // 分享标题
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            success: data.success,
            cancel: data.cansel
        });
        wx.onMenuShareAppMessage({ ////分享给好友
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: data.success,
            cancel: data.cansel
        });

    }
}
window.addEventListener("load", function(){
    weixin.config();
    wx.ready(function() {
        weixin.share();
    });
})