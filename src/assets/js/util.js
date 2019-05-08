// pre process the recieving data from /rec/getRec?user_id
export function pre_process(res_data, con_str) {
  for (let i = 0; i < res_data.length; i++) {
    var element = res_data[i];
    switch (element.recAlgo) {
      // 0-随机，1-热点，2-协同过滤, 3-内容相似，
      // 0-random，1-hot，，2-collaborative-filtering, 3-content-similarity
      case 0:
        element.recAlgo = "random";
        element.recAlgo_va = "primary";
        break;
      case 1:
        element.recAlgo = "hot";
        element.recAlgo_va = "secondary";
        break;
      case 3:
        element.recAlgo = "cb";
        element.recAlgo_va = "success";
        break;
      case 2:
        element.recAlgo = "cf";
        element.recAlgo_va = "danger";
        break;

      default:
        break;
    }
    // set news background img
    switch (element.source) {
      case "New York Times":
        element.img_href = con_str + "the-new-york-times-logo-featured.jpg";
        break;
      case "Breitbart":
        element.img_href = con_str + "1200px-Breitbart_News.svg.png";
        break;
      case "CNN":
        element.img_href = con_str + "CNN_logo_400x400.png";
        break;
      case "Business Insider":
        element.img_href = con_str + "og-image-logo-social.png";
        break;
      case "Atlantic":
        element.img_href = con_str + "default-thumbnail.png";
        break;
      default:
        break;
    }
    element.isLike = false;
    element.isDislike = false;
    element.isCollect = false;
    res_data[i] = element;
  }
  return res_data;
}

export function shuffle(arr) {
  var result = [], random;
  console.log(arr);
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
  return result;
}
