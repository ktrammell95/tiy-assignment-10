$(function(){

  var getData = function(keywords, callback) {
    var params = {
      api_key: "niqoyrl7dver15xzb6mp2c7e",
      includes: "Images,Shop"
    };

    if (!callback && typeof keywords === "function") {
      callback = keywords;
      keywords = null;
    }

    if (keywords && keywords.length) {
      params.keywords = keywords;
    }

    $.ajax("https://openapi.etsy.com/v2/listings/active.js", {
      data: params,
      dataType: "jsonp",
      success: callback
    });
  };//Info from JD github

  //Keyword search
  $(".search-form").on("submit", function(event) {
    event.preventDefault();
    
    var keywords = $(".search-field").val();
        // alert(keywords);
      
   getData(keywords, function(data) {
    var items = data.results;
    console.log(items);
      $(".products").empty();
      items.forEach(function(item) {
        $(".products").append(prodTemplate(item));
      }); 
    });
  });

// product template
  var prodTemplate = _.template(
    "<div class='products'>" +
      "<div class='prod-image'>" +
          "<img src='<%= Images[0].url_170x135 %>'>" + 
          "</div>" +
      "<div class='product-title'>" +
         "<%= title %></div>" +
      "<div class='shop'>" + 
        "<%= Shop.shop_name %></div>" +
      "<div class='price'>" + 
        "<%= price %></div>" +
      "<div class='curr-code'>" + 
        "<%= currency_code %></div>" +
    "</div>"  
  );
});

 


