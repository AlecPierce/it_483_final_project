var news = [];
var idMap = new Map();
$( document ).ready(function() {
  $.ajax({
        url: "db_news.txt",
        success: function(result) {
          news = JSON.parse(result);
          createBottomHalfContent(news);
        },
        error: function() {
          console.log('An error occurred');
        }
  });
  $('.newsLink').on("click", function(event) {
    var newsId = $(event.target).attr('id');
    $.ajax({
        url: "db_news.txt",
        success: function(result) {
          news = JSON.parse(result);
        },
        error: function() {
          console.log('An error occurred');
        }
    });
    deleteTopHalfCourseDiv();
    createTopHalfCourseDiv(news, newsId);
  });
});

  function createBottomHalfContent(news) {
    var index = 0;
    news.forEach(function(newsArticle) {
      idMap.set(newsArticle.NEWS_ID.toString(), index.toString());
      createNewDiv(newsArticle);
      index++;
    });
  }

  function createNewDiv(newsArticle) {
    // Container div
    var div = document.createElement('div');
    div.setAttribute("id", newsArticle.NEWS_ID);


    // Setting the text of the button
    div.innerHTML += newsArticle.NEWS_TITLE;

    document.getElementById("newsLinks").appendChild(div);

    var newsLinkElement = document.createElement('a');  
    var newsLink = newsArticle.NEWS_LINK;
    newsLinkElement.setAttribute("href", newsLink);
    newsLinkElement.innerHTML += "<br/>Link to Article";
    document.getElementById(newsArticle.NEWS_ID).appendChild(newsLinkElement);
  }

  function createTopHalfCourseDiv(news, newsId) {
    // Container div
    newDiv = document.createElement('div');
    newDiv.setAttribute("id", "top-half-div");

    document.getElementById("top-half").appendChild(newDiv);
    createnewsHTML(news, newsId);
  }

  function createnewsHTML(news, newsId) {
    var newsArticle = news[idMap.get(newsId)];

    var newsTitle = newsArticle.NEWS_TITLE;
    var newsText = newsArticle.NEWS_TEXT;

    var newsInfo = [newsTitle, newsText];

    for (i in newsInfo) {
      var childDiv = document.createElement('div');
      childDiv.setAttribute("id", "topHalfDivChild" + i);
      childDiv.innerHTML += newsInfo[i];
      document.getElementById("top-half-div").appendChild(childDiv);
    }
  }

  function deleteTopHalfCourseDiv() {
    // Removes the current "top-half-div"
    var oldDiv = document.getElementById("top-half-div");
    document.getElementById("top-half").removeChild(oldDiv);
  }