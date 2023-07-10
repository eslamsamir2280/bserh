var VisitorAPI = function (t, e, a) {
  var s = new XMLHttpRequest();
  (s.onreadystatechange = function () {
    var t;
    s.readyState === XMLHttpRequest.DONE &&
      (200 === (t = JSON.parse(s.responseText)).status
        ? e(t.data)
        : a(t.status, t.result));
  }),
    s.open("GET", "https://api.visitorapi.com/api/?pid=" + t),
    s.send(null);
};

VisitorAPI(
  "vE7APIMDpG7WFGHqd0rh",
  function (data) {
    let country = data.countryCode;
    let city = data.city;
    axios
      .get("http://api.aladhan.com/v1/timingsByCity", {
        params: {
          country: country,
          city: city,
        },
      })

      .then(function (response) {
        const timings = response.data.data.timings;
        console.log(response);
        filltime("Fajr", timings.Fajr);
        filltime("Sunrise", timings.Sunrise);
        filltime("Dhuhr", timings.Dhuhr);
        filltime("Asr", timings.Asr);
        filltime("Maghrib", timings.Maghrib);
        filltime("Isha", timings.Isha);
        const readable = response.data.data.date.gregorian.date;
        const day = response.data.data.date.hijri.weekday.ar;
        const date = day + " " + readable;
        document.getElementById("date").innerHTML = date;
      });
    function filltime(id, time) {
      document.getElementById(id).innerHTML = time;
    }
  },
  function (errorCode, errorMessage) {
    console.log(errorCode, errorMessage);
  }
);

// axios
//   .get("http://api.aladhan.com/v1/timingsByCity", {
//     params: {
//       country: "EGY",
//       city: city,
//     },
//   })

//   .then(function (response) {
//     const timings = response.data.data.timings;
//     console.log(response);
//     filltime("Fajr", timings.Fajr);
//     filltime("Sunrise", timings.Sunrise);
//     filltime("Dhuhr", timings.Dhuhr);
//     filltime("Asr", timings.Asr);
//     filltime("Maghrib", timings.Maghrib);
//     filltime("Isha", timings.Isha);
//     const readable = response.data.data.date.gregorian.date;
//     const day = response.data.data.date.hijri.weekday.ar;
//     const date = day + " " + readable;
//     document.getElementById("date").innerHTML = date;
//   });
// function filltime(id, time) {
//   document.getElementById(id).innerHTML = time;
// }
