import { useEffect, useState } from "react"

interface PropType {
    Clicks: number
}

const Gifs = ({Clicks}:PropType) => {
    const [gifArray, setGifArray] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    const preloadGifs = async () => {
        const urls = [
            "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ppeTI5Y3ZrdXdlcW9xd3Y1cGI2eHVpdDhheDhjdWtkZW10aXZhNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KztT2c4u8mYYUiMKdJ/giphy.gif",
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN21kMTI5aHFkM3k1cmRzZzVpazl6NnNoMDFreWJoN3R3Zjhyc2l4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif",
            "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2xsdmVsb3M2Y3N2c2hmc3h0ZTdwMTVjNXdjdW5naDNjd29tMTFydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6qFFgNgextP9u/giphy.gif",
            "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGkwbWZxeW44YnplbTl5aWxpbGNwbDIxbDk1ZGFxdnU1Z2RtNzJ3aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iJJ6E58EttmFqgLo96/giphy.gif",
            "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGI4Y3IzMzM0eGU4azN5Mm8xeHVqM2NpbGVtMGtkZWJlczkwOTl2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9Y5BbDSkSTiY8/giphy.gif",
            "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDV0MGl1dnJ1dzI5NjJjMGk5eHRqNHcxM3B5aDJndGdsZDF1ZGxqZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ISOckXUybVfQ4/giphy.gif",
            "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTlqejM4YnBlZm41YnFjNXYzODh2M2FvcGNtM3NzejB5ZjcwZHJsYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d2lcHJTG5Tscg/giphy.gif",
            "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExam42YWN1Ym16bTFoZHV1bHN6bjZ3ZXFvMHo4eHpoaDF2MXAwdTk1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yoJC2Olx0ekMy2nX7W/giphy.gif",
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHdpNXJyZTNpY2w2cjRzNTg3ZmtoZGlla25zbmY1eWc1djJ1cmhkMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xFnyJDPKOcqcH57m7e/giphy.gif",
            "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHlhMWFwbmZjMHJ2ejVtajJhMnB3em1hc3ZsZ3Y5ZW40bDdqY3psZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l22ysLe54hZP0wubek/giphy.gif",
            "https://64.media.tumblr.com/960515c55083912f5bcaef8493d5dc79/tumblr_mgc21rbVEZ1qlmd4co1_500.gifv",
            "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHM3ZDdob3NxeTZhc3VyeTRncHJkaTdtMXRlN2QwMjF5Z3QyZ2h4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jnQYWZ0T4mkhCmkzcn/giphy.gif",
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDl2anpwa3N0ZjUwamw2MmJ4ODk3amNwbG0xdTdtYWo1NGcwdzQ4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1AsyjZ8XLd1V7pUk/giphy.gif",
            "https://media.tenor.com/gNmnDtjoccIAAAAM/side-eye-dog.gif",
            "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmpqYTVueHc2dG9iYjc1cjR4Z2MyaWFkbXZwM3cyOGJsNmp4a3JydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mtpgD4KBHMgmchNlfm/giphy.gif",
            "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHdnMTFiajU3dmZpeDUxbmc5bWI0ODA2ZTF1dWswbDBhdm93Zjl3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zt1q7lREccTi4n9ohB/giphy.gif",
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDl2anpwa3N0ZjUwamw2MmJ4ODk3amNwbG0xdTdtYWo1NGcwdzQ4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1AsyjZ8XLd1V7pUk/giphy.gif",
            "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHM3ZDdob3NxeTZhc3VyeTRncHJkaTdtMXRlN2QwMjF5Z3QyZ2h4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jnQYWZ0T4mkhCmkzcn/giphy.gif"
        ]

        const promises = urls.map(url => {
            return new Promise(resolve => {
                const img = new Image()
                img.src = url
                img.onload = () => resolve(url)
            });
        });


        const loadedGIFs = await Promise.all(promises);
        setGifArray(loadedGIFs as string[]);
        setLoading(false)
    }


    useEffect(() => {
        preloadGifs();
    },[])


    if (loading) {
        return (
        <div className=" text-white left-0 top-0 fixed w-screen h-screen grid place-content-center bg-pink-500">
            <p className=" text-7xl font-semibold">Loading...</p>
            <div className="loader mx-auto mt-5">
                <img src="https://assets.codepen.io/605876/pizza-slices.svg" className="pizza_img" alt="" />
            </div>
            <p className=" font-semibold text-2xl mt-10">Made by: John Robert Maizo {"<"}3</p>
        </div>
        )
    }

     
  return (
    <img src={gifArray[Clicks - 1]} alt="" aria-hidden className=' mt-5 mx-auto aspect-square w-full max-w-[8em] object-cover md:max-w-[15em]' />
  )
}

export default Gifs