import { FaYoutube } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

const Banner = () => {
    const d= new Date()
    const date= d.toString()
    const day= date.substring(8,10),
    hr= date.substring(16,18),
    min= date.substring(19,21)
    const tot_time= parseInt(day)*1440+parseInt(hr)*60+parseInt(min),
    event_time= 44640
    let rem_time= event_time-tot_time
    
    const rem_day= parseInt(rem_time/1440 )
    rem_time= rem_time%1440
    const rem_hr= parseInt(rem_time/60), rem_min= rem_time%60

  const icon_style = {
    color: "red",
    backgroundColor: "#FFFFFF",
    fontSize: "2em",
    borderRadius: "0.125rem",
  };

  return (
    <div className="mt-2 mb-12 flex flex-col items-center">
      <div className='-mb-7 relative bg-secondary_clr flex flex-row items-center rounded-sm px-2 gap-1'> 
        <MdLocalOffer color= "" size="1.5rem"/>
        <p className='text-lg'>
          20% offer!! Only {rem_day} day {rem_hr} hour {rem_min} minute remaining
        </p>
      </div>
      <img
        className="mx-auto rounded-lg h-[80vh] w-full object-fill"
        src="https://i.ibb.co/Hxs9qkL/wallpapersden-com-oppenheimer-2023-movie-poster-1920x1080.jpg"
        alt=""
      />
      <a href="https://www.youtube.com/watch?v=uYPbbksJxIg&pp=ygUTT3BwZW5oZWltZXIgdHJhaWxlcg%3D%3D"
      className="bg-[#FFFFFF] rounded-sm w-max 
      -mt-14 relative">
        <button>
          <div
            className="flex flex-row items-center gap-2 px-2"
          >
            {/*bg-white not working*/}
            <h2 className="text-[#000000] text-xl">Click To See</h2>
            <FaYoutube style={icon_style} />
          </div>
        </button>
      </a>
    </div>
  );
};

export default Banner;