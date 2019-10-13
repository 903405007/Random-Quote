// 预设颜色值
var colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857"
];

// 获取名言的数据
var curQuote = "",
  curAuthor = "";

function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V", //验证信息
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=",
    // 成功后
    // 隐藏待替换的数据
    // 将数据替换
    // 再进行显示
    success: function(r) {
      r =
        Object.prototype.toString.call(r).slice(8, -1) === "Object"
          ? JSON.parse(r)
          : r[0];
      curAuthor = r.author;
      curQuote = r.quote;
      // console.log(curQuote);

      // 变换名言
      $(".quote-text,.quote-author").animate(
        {
          opacity: 0
        },
        500,
        function() {
          $(this).animate(
            {
              opacity: 1
            },
            500
          );
          $("#text").html(curQuote);
          $("#quote-author").html(curAuthor);
        }
      );
      // 改变主题颜色
      var color = Math.floor(Math.random() * colors.length);
      $("body").animate({
        'color': colors[color],
        'background-color': colors[color]
      });
      $(".button").animate({
        'background-color': colors[color]
      });
    },
    error: function(err) {
      console.log(err);
    }
  });
}

$(document).ready(function () {
  // getQuote();
  var timer=null;
  $("#new-quote").on("click", function() {
    if (timer) { clearTimeout(timer);}
    timer=setTimeout(function () { 
      getQuote();
    },200);
  });
});

// 步骤：
// 1、初始化：加载时就获取数据；（防止加载时间较长可以在HTML先写入一个smaple）
// 2、添加事件；在点击的时候获取更新的数据
// 3、在获得数据后隐藏原来的，再更新，之后再展示更新的
// 4、同时也更新主题色；