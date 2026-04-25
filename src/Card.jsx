import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar"; // Import Arabic locale for Moment.js
import { useTranslation } from "react-i18next";

function Card() {
  const { t, i18n } = useTranslation();

  const [temp, setTemp] = useState({
    temperature: 0,
    desc: "",
    icon: "",
    temp_min: 0,
    temp_max: 0
  });

  const [lang, setLang] = useState("en");
  const [date, setDate] = useState(moment().format("LLLL"));

  useEffect(() => {
    // Switch i18n + Moment language
    i18n.changeLanguage(lang);
    moment.locale(
  lang === "ar"
    ? "ar-sa"
    : "en"
);

    // Set date immediately
    setDate(moment().format("LLLL"));

    // Update clock every second
    const timer = setInterval(() => {
      setDate(moment().format("LLLL"));
    }, 1000);

    // Axios cancel support
    let cancel;

    axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=Zahle&units=metric&appid=1fe3056d9c9b66fb38e1cee534436a81",
      {
        cancelToken: new axios.CancelToken(c => {
          cancel = c;
        })
      }
    )
    .then((res) => {
      setTemp({
        temperature: res.data.main.temp,
        desc: res.data.weather[0].main, // Important: use "main", not "description"
        icon: res.data.weather[0].icon,
        temp_min: res.data.main.temp_min,
        temp_max: res.data.main.temp_max
      });
    })
    .catch((err) => {
      console.log(err);
    });

    return () => {
      clearInterval(timer);
      cancel?.();
    };

  }, [lang, i18n]);


  function changeLang() {
    setLang((prev) => (
      prev === "en" ? "ar" : "en"
    ));
  }


  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>

      <div
        style={{
          background: "rgb(28 52 91 /36%)",
          color: "white",
          boxShadow: "1px 7px 1px rgba(0,0,0,0.07)",
          width: "450px",
          height: "fit-content"
        }}
        className="rounded-lg flex items-center justify-center px-4"
      >

        <div style={{ width: "100%" }}>

          {/* Header */}
          <div className="flex justify-around py-2 px-3">

            <h1 style={{ fontSize: "40px" }}>
              {t("Zahle")}
            </h1>

            <div className="flex items-end">
              <h5>{date}</h5>
            </div>

          </div>

          <hr />

          {/* Weather */}
          <div className="flex justify-around items-center">

            <div className="flex items-center gap-2">
              <h1 style={{ fontSize: "40px" }}>
                {Math.round(temp.temperature)}°
              </h1>

              <img
                src={`http://openweathermap.org/img/wn/${temp.icon}.png`}
                alt={temp.desc}
              />
            </div>


            <div className="m-1 px-3">
              <img
                src={`http://openweathermap.org/img/wn/${temp.icon}.png`}
                alt={temp.desc}
                style={{
                  width: "100px",
                  height: "100px"
                }}
              />
            </div>

          </div>


          {/* Description */}
          <div className="flex my-1 mx-1">
            {t(temp.desc)}
          </div>


          {/* Min / Max */}
          <div className="flex mx-1 mb-2">

            <div>
              {t("Max")} :
              {Math.ceil(temp.temp_max)}
            </div>

            <div style={{ margin: "0 5px" }}>
              |
            </div>

            <div>
              {t("Min")} :
              {Math.floor(temp.temp_min)}
            </div>

          </div>

        </div>

      </div>


      {/* Language Button */}
      <button
        onClick={changeLang}
        style={{
          margin: "20px 10px",
          color: "white",
          cursor: "pointer"
        }}
        className="hover:bg-gray-900/10 rounded px-3 py-2"
      >
        {lang === "en"
          ? "العربية"
          : "English"}
      </button>

    </div>
  );
}

export default Card;