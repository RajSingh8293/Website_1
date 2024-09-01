

const Hero = () => {
    return (
        <section className="">
            <div className="w-[100%] relative ">
                <img className='opacity-70 hero_image w-[100%] lg:h-[600px]' src="https://images.pexels.com/photos/27308359/pexels-photo-27308359/free-photo-of-pigeons-on-a-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=600&dpr=1" alt='' />
                <div className="lg:px-10 w-[100%] h-[100%] absolute top-0 left-0 flex flex-col justify-center items-center">
                    <div>
                        <h1 className="py-4 text-center lg:text-6xl md:text-5xl sm:text-4xl text-2xl font-bold text-black">There Are <br /><span className="text-blue-600">93,178</span> Postings Here For you!</h1>

                    </div>
                    <p className="py-2  font-semibold text-sm">Find Jobs, Employment & Career Opportunities</p>


                    <div className="flex rounded overflow-hidden bg-white lg:w-[50%] md:w-[50%] sm:w-[70%] w-[80%] lg:h-[40px] h-[40px]">
                        <input type="search" className=" w-[100%] h-[100%] outline-none px-4 " />
                        <button className="bg-black text-white rounded-r px-4 h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                    <p className="py-4 px-5 text-left text-sm opacity-80"><strong>Popular searches : </strong>Designer, Developer, Web, IOS, PHP, Senior, Engineer,</p>


                </div>

            </div>
        </section>
    )
}

export default Hero