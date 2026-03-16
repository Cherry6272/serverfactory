/**
 * Webkul Software.
 *
 * @category  Webkul
 * @package   Webkul_YouTubeChannelFeed
 * @author    Webkul Software Private Limited
 * @copyright Webkul Software Private Limited (https://webkul.com)
 * @license   https://store.webkul.com/license.html
 */

define([
    "jquery",
    "mage/template",
], function ($, template) {
        $(function () {
            var i=0;
            $('.wk_youtube_data').each(function () {
                var self= $(this);
                var subscribeBtn = "#___ytsubscribe_"+i;
                $(subscribeBtn).addClass('subscribe-btn');
                i++
                var maxfeeds = self.data('feeds');
                feeds = 50;
                token = "";
                channelAndBannerDetails(self);
                getvideos(maxfeeds, token, self);
            });
            $(document).on('click', '.wk_divimage', function() {
                var self = $(this);
                var url = $(self).children('a').attr('url');
                var exploded = url.replace('watch?v=','embed/');
                var videoPlayer = $('body .play-video').first(); 
                videoPlayer.show();
                videoPlayer.find('iframe').attr('src',exploded);
            });
            $(document).on('click', '.wk_divspan', function() {
                var self = $(this);
                var url = $(self).children('a').attr('url');
                var exploded = url.replace('watch?v=','embed/');
                var videoPlayer = $('body .play-video').first();
                videoPlayer.show();
                videoPlayer.find('iframe').attr('src',exploded);
            })
            $(document).on('click', '.wk-close', function (){ 
                var self = $(this); 
                self.closest('.play-video').hide();
                var video = self.parent().find('iframe');
                var src= $(video).attr('src');
                $(video).attr('src',src); 
                
            })
            $('.grid-btn').on('click', function() {
                var self = $(this);
                var item = self.parent().parent().find('.wk_result_container');
                $(item).removeClass('wk-list');
                $(item).addClass('wk-grid');
            })
            $('.list-btn').on('click', function() {
                var self = $(this);
                var item = self.parent().parent().find('.wk_result_container');
                $(item).removeClass('wk-grid');
                $(item).addClass('wk-list');
            })
            function getvideos(maxfeeds,token, self)
            {
                var selfdiv = self;
                var feeds = 50
                if (maxfeeds) {
                    if (maxfeeds > 50) {
                        feeds = maxfeeds-50;
                        maxfeeds = maxfeeds - feeds;
                        ajaxCall(feeds, maxfeeds, token, selfdiv);
                        getvideos(feeds, token, selfdiv);
                    } else {
                        ajaxCall(0, maxfeeds, token, selfdiv);
                    }
                }
            }

            function ajaxCall(maxfeeds, feeds, token, self)
            {
                feeds=feeds+1;
                var color = self.data('color');
                var channelId = self.data('channelid');
                var apiKey = self.data('api');
                var apicheck = apiKey.length;
                if(apicheck <= 38 ){
                    $('.youtube-channel-feed').css({"display":"none"});
                }
               var images = self.data('images');
                var view = self.data('view'); 
                var hover = self.data('hover');
                var classimage = self.data('classimage');
                var videoIds =[];
                $.ajax({
                    url : "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId="+channelId+"&maxResults="+feeds+"&key="+apiKey+"&pageToken="+token,
                    type : "GET",
                    dataType : "json",
                    success: function (data) {
                        var flag=0; 
                        $.each(data.items, function (index, value) {
                            videoIds.push(value.id.videoId);
                            if(value.id.playlistId!=null){
                                flag=1;
                            }
                        })
                        if(flag==0){
                            videoIds.pop();
                        }
                        var idString = videoIds.toString();
                        $.ajax({
                            url : "https://www.googleapis.com/youtube/v3/videos?id="+idString+"&part=snippet,contentDetails,statistics&key="+apiKey,
                            type : "GET",
                            dataType : "json",
                            success: function (data) { 
                                $.each(data.items, function (index, value) {
                                    var feedTemplate = template('#wk_youtubechannelfeed_template');
                                    var videoId = "https://www.youtube.com/watch?v="+value.id;
                                    var info = value.snippet;
                                    var videoViews = value.statistics.viewCount;
                                    var likes = value.statistics.likeCount;
                                    var time = value.contentDetails.duration;
                                    time = getTimeofVideo(time);
                                    if (typeof info.thumbnails.standard !== 'undefined') {
                                        var url = info.thumbnails.standard.url;
                                    }
                                    
                                    var feed = feedTemplate({
                                            data: {
                                                classimage: classimage,
                                                images: images,
                                                color: color,
                                                title: info.title,
                                                url: videoId,
                                                img: url,
                                                viewscount: videoViews,
                                                likes: likes,
                                                view: view,
                                                hover: hover,
                                                time: time,
                                            }
                                        });
                                    self.append(feed);
                                })
                             
                                var idString = videoIds.toString();
                                if (data.nextPageToken) {
                                    token = data.nextPageToken;
                                } else {
                                    return false;
                                }
                            }
                        })
                        if (data.nextPageToken) {
                            token = data.nextPageToken;
                        } else {
                            return false;
                        }
                    }
                })
            }
           
            function getTimeofVideo(time)
            {
                var hour = minute = second =0;
                time = time.replace('PT',''); 
                var array = time.split("H");
                if (array[1]) {
                    hour = array[0];
                    time = array[1];
                } else {
                    
                    time = array[0];
                }
                var array = time.split("M");
                if (array[1]) {
                    minute = array[0];
                    time = array[1];
                } else {
                    time = array[0];
                }
                var array = time.split("S");
                second = array[0];
                
                if (hour) {
                    time = hour+":"+minute+":"+second;
                } else{
                    time = minute+":"+second;
                }
                return time;
            }
            function channelAndBannerDetails(self)
            {
                var channelId = self.data('channelid');
                var apiKey = self.data('api');
                var username = self.data('user');
                var banner = self.data('banner');
                var titlecolor = self.data('titlecolor');
                var titlehover = self.data('titlehover');
                var url = '';
                if(banner) {
                    url = "https://www.googleapis.com/youtube/v3/channels?part=brandingSettings,statistics,snippet&id="+channelId+"&key="+apiKey;
                } else {
                    url = "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id="+channelId+"&key="+apiKey;
                }
                var parent = self.parent().parent()

                $.ajax({
                   url: url ,
                    type : "GET",
                    dataType : "json",
                    success: function (data) { 
                        $.each(data.items, function (index, value) { 
                            var title = value.snippet.title;
                            var channelImage = value.snippet.thumbnails.default.url;
                            var totalviews = value.statistics.viewCount;
                            var totalvideos = value.statistics.videoCount;
                            var channelUrl = "https://www.youtube.com/channel/"+username;
                            var description = "";
                            if (value.brandingSettings){
                                bannerImage = value.brandingSettings.image.bannerExternalUrl;
                                description = value.brandingSettings.channel.description ?? "";

                                var bannerTemplate = template('#wk_youtubechannelfeed_banner');
                                var banner = bannerTemplate({
                                        data: {
                                            url: channelUrl,
                                            img: bannerImage,
                                            id: username
                                        }
                                    });
                                self.parent().parent().prepend(banner);
                            }
                            var channelDetailTemplate = template('#wk_youtubechannelfeed_channelDetail');
                            
                            var channelDetail = channelDetailTemplate({
                                    data: {
                                        url: channelUrl,
                                        title: title,
                                        channelImage: channelImage,
                                        description:description,
                                        views: totalviews,
                                        videos: totalvideos,
                                        titlecolor: titlecolor,
                                        titlehover: titlehover,
                                    }
                                });
                            var target = self.parent().parent().find('.layout-control-botton');
                            $(target).before(channelDetail);
                        })
                    }
                })
            }
            require(['jquery', 'jquery/ui'], function($){
                $('.play-video').draggable();
                $(".play-video").data({
                    'originalLeft': $(".play-video").css('left'),
                    'origionalTop': $(".play-video").css('top')
                });
                
                $(".wk-close").click(function() {
                    $(".play-video").css({
                        'left': $(".play-video").data('originalLeft'),
                        'top': $(".play-video").data('origionalTop')
                    });
                });

            });
    })
});
