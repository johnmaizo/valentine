import {useState} from "react";
import Gifs from "./Gifs";

const ValentineCard = () => {
  const [clickedNo, setClickedNo] = useState(false);
  const [numClicks, setnumClicks] = useState(1);

  const handleClickNo = () => {
    numClicks > 1 && setClickedNo(true);
  };

  const incrementClick = () => {
    numClicks !== 15 && setnumClicks((prev) => prev + 1);
  };

  const Messages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Sure na dyud?",
    "Final na?",
    "Huna-hunaa sa😔",
    "Yes na yan!!!",
    "Di dyud?🤧",
    "Dili dyud?😭",
    "Sad na oks😭",
    "Dili na dyud?",
    "Final answer na dyud?😭",
    "Last chance!",
    "You're breaking my heart na :'(",
    "You're breaking my heart na :'("
  ]


  return (
    <div>
      {
        clickedNo ? (
          <div>
            <img src={"love.gif"} alt="" aria-hidden className=" mx-auto" />
            <h1 className=" text-6xl font-semibold text-white mb-5">Ok yay!!!</h1>
          </div>
        ) : (
          <div>
            <h1 className=" text-3xl md:text-5xl font-semibold text-white">Will you be my Valentine?</h1>

            <Gifs Clicks={numClicks} />

            <div className=" mt-5 flex items-center justify-center gap-7 flex-wrap font-semibold text-white">
              <div>
                <button
                  className={`px-[10px] bg-green-500 rounded hover:bg-green-600 focus:bg-green-600`}
                  style={{
                    fontSize: numClicks * 1.2 + "rem",
                  }}
                  onClick={handleClickNo}
                  >
                  Yes
                </button>
              </div>
              <div>
                <button
                  className=" px-[10px] bg-red-500 rounded text-[1.2rem] hover:bg-red-600 focus:bg-red-600"
                  onClick={incrementClick}>
                  {Messages[numClicks-1]}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ValentineCard;
